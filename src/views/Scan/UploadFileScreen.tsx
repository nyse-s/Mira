import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImageResizer from 'react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';
import { useScanViewModel } from '../../viewmodels/ScanViewModel';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import GradientButton from '../../components/GradientButton';
import BackHeader from '../../components/BackHeader';
import styles from './UploadFileStyles';


const UploadScreen = () => {
  const { handleScanUpload, uploading, error, modelUrl } = useScanViewModel();
  const [frontImageUri, setFrontImageUri] = useState<string | null>(null);
  const [rightImageUri, setRightImageUri] = useState<string | null>(null);
  const [age, setAge] = useState<string>('25');
  const [weight, setWeight] = useState<string>('70000');
  const [height, setHeight] = useState<string>('1750');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const pickFrontImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      const originalUri = result.assets[0].uri || null;
      if (originalUri) {
        // Redimensionner à 1080x1920 (max qualité demandée par Bodygram)
        const resized = await ImageResizer.createResizedImage(
          originalUri,
          1080,    // width
          1920,    // height
          'JPEG',
          95       // quality
        );
        setFrontImageUri(resized.uri);
      }
    }
  };

  const pickRightImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      const originalUri = result.assets[0].uri || null;
      if (originalUri) {
        // Redimensionner à 1080x1920
        const resized = await ImageResizer.createResizedImage(
          originalUri,
          1080,
          1920,
          'JPEG',
          95
        );
        setRightImageUri(resized.uri);
      }
    }
  };

  const handleUpload = async () => {
    if (!frontImageUri || !rightImageUri) {
      Alert.alert('Error', 'Please select both the front and right profile photos.');
      return;
    }
    try {
      await handleScanUpload(frontImageUri, rightImageUri, {
        age: parseInt(age, 10),
        weight: parseInt(weight, 10),
        height: parseInt(height, 10),
        gender,
      });
      Alert.alert('Success', '3D scan generated and saved!');
    } catch (e) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <GradientScreenWrapper>
      <View style={{ marginTop: 70, marginLeft: 40 }}>
        <BackHeader />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Upload Scan</Text>
        <View style={styles.buttonRow}>
          <GradientButton title="Select Front Photo" onPress={pickFrontImage} style={styles.actionButton} />
          <GradientButton title="Select Right Photo" onPress={pickRightImage} style={styles.actionButton} />
        </View>
        <View style={styles.imagesRow}>
          {frontImageUri && (
            <Image source={{ uri: frontImageUri }} style={styles.image} resizeMode="cover" />
          )}
          {rightImageUri && (
            <Image source={{ uri: rightImageUri }} style={styles.image} resizeMode="cover" />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (g)</Text>
          <TextInput value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (mm)</Text>
          <TextInput value={height} onChangeText={setHeight} keyboardType="numeric" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={val => setGender(val)}
              style={styles.picker}
              dropdownIconColor="#00c2a8"
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>

        <GradientButton
          title="Upload & Scan"
          onPress={handleUpload}
          disabled={uploading}
          style={styles.uploadButton}
        />
        {uploading && <ActivityIndicator size="large" color="#00C2A8" style={{ marginTop: 16 }} />}
        {error && <Text style={styles.error}>{error}</Text>}
        {modelUrl && <Text style={styles.success}>Model generated and saved!</Text>}
      </ScrollView>
    </GradientScreenWrapper>
  );
};

export default UploadScreen;
