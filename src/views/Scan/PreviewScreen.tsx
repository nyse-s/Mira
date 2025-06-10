import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Video } from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScanStackParamList } from '../../navigation/ScanStackParamList';
import styles from './PreviewStyles';
import BackHeader from '../../components/BackHeader';


type NavigationType = NativeStackNavigationProp<ScanStackParamList, 'LiveCapture'>;
type PreviewRouteProp = RouteProp<ScanStackParamList, 'Preview'>;


const PreviewScreen = () => {
  const route = useRoute<PreviewRouteProp>();
  const navigation = useNavigation<NavigationType>();
  const { mode, uri } = route.params;

  const [photos, setPhotos] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (mode === 'photo') {
      (async () => {
        const front = await AsyncStorage.getItem('photo-front');
        const profile = await AsyncStorage.getItem('photo-profile');
        const back = await AsyncStorage.getItem('photo-back');

        setPhotos({ front: front || '', profile: profile || '', back: back || '' });
      })();
    }
  }, [mode]);

  const handleRestart = async () => {
    await AsyncStorage.multiRemove(['photo-front', 'photo-profile', 'photo-back']);
    navigation.navigate('LiveCapture', { step: 'front' });
  };

  return (
    <View style={styles.container}>
        {/* Header */}
      <LinearGradient
        colors={['#007666', '#4CD4C2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.topSection}
      >
        <BackHeader/>
      </LinearGradient>
      <View style={styles.mainSection}>
        <View style={styles.previewContainer}>
            {mode === 'photo' ? (
            <>
                <Image source={{ uri: photos.front }} style={styles.photoPreview} />
                <Image source={{ uri: photos.profile }} style={styles.photoPreview} />
                <Image source={{ uri: photos.back }} style={styles.photoPreview} />
            </>
            ) : (
            <Video
                source={{ uri }}
                rate={1.0}
                volume={1.0}
                resizeMode="contain"
                controls
                style={styles.video}
            />
            )}
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviewScreen;

