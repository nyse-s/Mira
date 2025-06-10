import { supabaseClient } from './supabase';
import RNFetchBlob  from 'react-native-blob-util';

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const uploadToSupabase = async (bucket: string, path: string, fileInput: string, fileType: string) => {
  const base64Data = await RNFetchBlob.fs.readFile(fileInput, 'base64');
  const arrayBuffer = base64ToArrayBuffer(base64Data);

  const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .upload(path, arrayBuffer, {
      contentType: fileType,
      upsert: true,
    });
  if (error) {throw error;}
  return data;
};

export const getSignedUrl = async (bucket: string, path: string, expiresInSeconds = 26298000): Promise<string> => {
  const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds);
  if (error) { throw error;}
  return data.signedUrl;
};
