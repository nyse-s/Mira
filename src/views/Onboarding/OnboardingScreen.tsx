import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import styles from './OnboardingStyles';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import GradientButton from '../../components/GradientButton';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationType>();

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>
          MIRA
        </Text>
        <Text style={styles.subtitle}>
          Know your shape. Own your progress.
        </Text>

        <GradientButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} style={{ width: 175, height: 46, alignSelf: 'center',  marginBottom: 29}}/>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.help}>Need help?</Text>
      </View>
    </GradientScreenWrapper>
  );
};

export default OnboardingScreen;
