import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScanStackParamList } from '../../navigation/ScanStackParamList';
import BackHeader from '../../components/BackHeader';
import styles from './LiveCaptureStyles';

type StepType = 'front' | 'profile' | 'back';
type ModeType = 'photo' | 'video';

type NavigationType = NativeStackNavigationProp<ScanStackParamList, 'LiveCapture'>;
type RouteType = RouteProp<ScanStackParamList, 'LiveCapture'>;

const steps: StepType[] = ['front', 'profile', 'back'];

const LiveCaptureScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();
  const { step } = route.params;

  const { hasPermission, requestPermission } = useCameraPermission();
  const [mode, setMode] = useState<ModeType>('photo');
  const [currentStep, setCurrentStep] = useState<StepType>(step);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const [countdown, setCountdown] = useState<number | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const camera = useCameraDevice(cameraPosition);
  const cameraRef = useRef<Camera>(null);

  const stepIndex = steps.indexOf(currentStep);

  const instructions = {
    front: {
      photo: {
        title: 'FRONT VIEW',
        description: 'Take a photo from the front',
      },
      video: {
        title: ' ',
        description: ['"Stand up straight"', '"Turn slowly 360°"', '"Stay in the frame"'],
      },
    },
    profile: {
      photo: {
        title: 'PROFILE VIEW',
        description: 'Turn 90° then take a picture',
      },
      video: {
        title: '',
        description: [],
      },
    },
    back: {
      photo: {
        title: 'BACK VIEW',
        description: 'Turn with your back to the camera',
      },
      video: {
        title: '',
        description: [],
      },
    },
  };

  const startProgress = useCallback(() => {
    Animated.timing(progressAnim, {
      toValue: ((stepIndex + 1) / steps.length) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progressAnim, stepIndex]);

  const startCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    requestPermission();
    startProgress();
  }, [requestPermission, startProgress]);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      if (mode === 'photo') {
        const photo = await cameraRef.current.takePhoto({ flash: 'off' });
        const photoUri = `file://${photo.path}`;

        const previous = await AsyncStorage.getItem('captures');
        const previousList = previous ? JSON.parse(previous) : [];
        const updatedList = [...previousList, photoUri];
        await AsyncStorage.setItem('captures', JSON.stringify(updatedList));

        if (stepIndex < steps.length - 1) {
          setCurrentStep(steps[stepIndex + 1]);
        } else {
          navigation.navigate('Preview', {
            mode: 'photo'});
        }

      } else {
        cameraRef.current.startRecording({
          flash: 'off',
          onRecordingFinished: (video) => {
            const videoUri = `file://${video.path}`;
            navigation.navigate('Preview', {
              mode: 'video',
              uri: videoUri,
            });
          },
          onRecordingError: (err) => console.error('Recording error:', err),
        });

        setTimeout(() => {
          cameraRef.current?.stopRecording();
        }, 5000);
      }
    } catch (err) {
      console.error('Capture failed', err);
    }
  }, [mode, navigation, stepIndex]);


  useEffect(() => {
    if (countdown === null) {
      return;
    }
    if (countdown === 0) {
      setCountdown(null);
      handleCapture();
    } else {
      const timerId = setTimeout(() => {
        setCountdown(prev => (prev ?? 1) - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown, handleCapture]);

  const toggleCamera = () => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'photo' ? 'video' : 'photo'));
  };

  if (!camera || !hasPermission) {
    return <View style={styles.loading}><Text>Loading camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} device={camera} isActive={true} photo={true} video={true} audio={true} />

      {/* Header avec ProgressBar */}
      <LinearGradient
        colors={['#007666', '#4CD4C2']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <BackHeader/>
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progress, { width: `${(stepIndex + 1) * 33.3}%` }]}
          />
        </View>
      </LinearGradient>

      {/* Instructions */}
      <View style={styles.instructions}>
        {mode === 'photo' ? (
          <>
            <Text style={styles.title}>{instructions[currentStep][mode].title}</Text>
            <Text style={styles.subtitle}>{instructions[currentStep][mode].description}</Text>
          </>
        ) : (
          <View style={styles.videoInstructionBlock}>
            {instructions[currentStep].video.description.map((line, idx) => (
              <Text key={idx} style={styles.videoInstructionText}>{line}</Text>
            ))}
          </View>
        )}
      </View>

      {countdown !== null && (
        <View style={styles.timerOverlay}>
          <Text style={styles.timerText}>{countdown}</Text>
        </View>
      )}

      {/* Boutons */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleMode}>
          <Text style={[styles.modeText, mode === 'video' ? styles.videoActive : styles.inactive]}>
            VIDEO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={startCountdown}
          style={[
            styles.captureButton,
            mode === 'video' ? styles.videoCapture : styles.photoCapture,
          ]}
          disabled={countdown !== null}
        >
          <View
            style={
              mode === 'video'
                ? styles.videoDot
                : styles.photoInnerCircle
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMode}>
          <Text style={[styles.modeText, mode === 'photo' ? styles.photoActive : styles.inactive]}>
            PHOTO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleCamera}>
          <Icon name="camera-switch" size={30} color="#00C2A8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveCaptureScreen;

