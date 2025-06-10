import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScanStackParamList } from '../../navigation/ScanStackParamList';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import GradientButton from '../../components/GradientButton';
import BackHeader from '../../components/BackHeader';
import styles from './CameraSetupStyles';

type ScanNavigationType = NativeStackNavigationProp<ScanStackParamList>;

const CameraSetupScreen = () => {
  const navigation = useNavigation<ScanNavigationType>();

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <BackHeader/>
        <Text style={styles.title}>Setup Scan</Text>

        <View style={styles.checklist}>
          <Text style={styles.check}>✔ Do you have enough clearance (2 meters)?</Text>
          <Text style={styles.check}>✔ Do you have good lighting?</Text>
          <Text style={styles.check}>✔ Are you alone in the frame?</Text>
        </View>

        <GradientButton title="I am ready" onPress={() => navigation.navigate('LiveCapture', { step: 'front' })} style={{ width: 205, height: 46, alignSelf: 'center', marginTop: 120}}/>
      </View>
    </GradientScreenWrapper>
  );
};

export default CameraSetupScreen;
