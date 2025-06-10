import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanStackParamList } from './ScanStackParamList';

import ScanChoiceScreen from '../views/Scan/ScanChoiceScreen';
import CameraSetupScreen from '../views/Scan/CameraSetupScreen';
import LiveCaptureScreen from '../views/Scan/LiveCaptureScreen';
import PreviewScreen from '../views/Scan/PreviewScreen';
import UploadFileScreen from '../views/Scan/UploadFileScreen';
// import ProcessingScreen from '../views/Scan/ProcessingScreen';



const Stack = createNativeStackNavigator<ScanStackParamList>();

const ScanNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScanChoice" component={ScanChoiceScreen} />
      <Stack.Screen name="UploadFile" component={UploadFileScreen} />
      <Stack.Screen name="CameraSetup" component={CameraSetupScreen} />
      <Stack.Screen name="LiveCapture" component={LiveCaptureScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      {/* <Stack.Screen name="Processing" component={ProcessingScreen} />  */}
    </Stack.Navigator>
  );
};

export default ScanNavigator;
