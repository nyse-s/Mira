import RNFS from 'react-native-fs';
import { useState } from 'react';
import { uploadToSupabase, getSignedUrl } from '../services/storageService';
import { runBodygramScan } from '../services/BodygramService';
import { saveFullScanWorkflow } from '../services/FullScanService';
import { useAuth } from '../contexts/AuthContext';

export const useScanViewModel = () => {
  const { supabaseUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  // Helper: save base64 as temp file and upload
  const uploadBase64ToSupabase = async (
    bucket: string,
    filename: string,
    base64: string,
    mimeType: string
  ) => {
    const tempPath = `${RNFS.TemporaryDirectoryPath}/${filename}`;
    await RNFS.writeFile(tempPath, base64, 'base64');
    await uploadToSupabase(bucket, filename, tempPath, mimeType);
    await RNFS.unlink(tempPath);
  };

  /**
   * Full scan workflow:
   * - Upload images (front/right) to Supabase
   * - Call Bodygram API with base64 images
   * - Save avatar (base64 .obj) as temp file and upload
   * - Save workflow/results to database
   */

  const handleScanUpload = async (
    frontImageUri: string,
    rightImageUri: string,
    demographicData: {
      age: number;
      weight: number;
      height: number;
      gender: 'male' | 'female'
    }
  ) => {
    setUploading(true);
    setError(null);
    try {
      if (!supabaseUser?.id) {
        setError('User not authenticated');
        setUploading(false);
        return;
      }

      const timestamp = Date.now();
      console.log(frontImageUri);
      console.log(rightImageUri);
      const frontExt = frontImageUri.split('.').pop() || 'jpg';
      const rightExt = rightImageUri.split('.').pop() || 'jpg';
      const frontFilename = `${supabaseUser?.id}_front_${timestamp}.${frontExt}`;
      const rightFilename = `${supabaseUser?.id}_right_${timestamp}.${rightExt}`;
      await uploadToSupabase('scans', frontFilename, frontImageUri, 'image/jpeg');
      await uploadToSupabase('scans', rightFilename, rightImageUri, 'image/jpeg');
      const signedFrontUrl = await getSignedUrl('scans', frontFilename);
      const signedRightUrl = await getSignedUrl('scans', rightFilename);

      const bodygramResult = await runBodygramScan(
        frontImageUri,
        rightImageUri,
        demographicData
      );

      const measurements = bodygramResult.measurements;
      const avatarBase64 = bodygramResult.avatar?.data || null;
      let modelUrl: string = '';

      if (avatarBase64) {
        const modelFilename = `${supabaseUser.id}_${timestamp}.obj`;
        await uploadBase64ToSupabase('models', modelFilename, avatarBase64, 'text/plain');
        modelUrl = await getSignedUrl('models', modelFilename);
      }

      await saveFullScanWorkflow({
        userId: supabaseUser.id,
        scanType: 'photo',
        scanOrigin: 'upload',
        modelUrl: modelUrl, // signed URL .obj
        status: 'completed',
        age: demographicData.age,
        weight: demographicData.weight,
        height: demographicData.height,
        gender: demographicData.gender,
        frontPhotoUrl: signedFrontUrl,
        rightPhotoUrl: signedRightUrl,
        measurements: measurements, // {..., metrics: fullJson }
      });

      setModelUrl(modelUrl);

    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    modelUrl,
    handleScanUpload,
  };
};
