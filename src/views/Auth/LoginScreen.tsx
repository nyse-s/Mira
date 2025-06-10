import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import styles from './AuthStyles';
import { handleSignIn } from '../../viewmodels/AuthViewModel';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import GradientButton from '../../components/GradientButton';
import UnderlineInput from '../../components/UnderlineInput';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }

    setLoading(true);
    const result = await handleSignIn(email, password);
    setLoading(false);

    if (result.success) {

    } else {
      const errorMessage = result.error instanceof Error ? result.error.message : 'An error occurred';
      Alert.alert('Login Failed', errorMessage);
    }
  };


  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>MIRA</Text>
        <Text style={styles.subtitle}>
          Know your shape. Own your progress.
        </Text>
        <UnderlineInput
          placeholder="Email"
          icon="email"
          value={email}
          onChangeText={setEmail}
        />

        <UnderlineInput
          placeholder="Password"
          icon="lock"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {loading && <ActivityIndicator size="large" color="#00C2A8" style={{ marginVertical: 16 }}/>}
        <GradientButton title="Login" onPress={login} gradientColors={['#FFFFFF', '#FFFFFF']} style={{ width: 175, height: 46, alignSelf: 'center',  marginBottom: 29}} textStyle={{ color: '#ff6b6b' }}/>
        </View>
    </GradientScreenWrapper>
  );
};

export default LoginScreen;
