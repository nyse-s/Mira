import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from './ScanChoiceStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScanStackParamList } from '../../navigation/ScanStackParamList';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';

type ScanNavigationType = NativeStackNavigationProp<ScanStackParamList, 'ScanChoice'>;

const ScanChoiceScreen = () => {
    const navigation = useNavigation<ScanNavigationType>();

    return (
        <GradientScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Scan</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraSetup')}>
                        <Text style={styles.buttonText}>LIVE SCAN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UploadFile')}>
                        <Text style={styles.buttonText}>UPLOAD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GradientScreenWrapper>
    );
};

export default ScanChoiceScreen;
