import React, { useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import styles from './AuthStyles';
import { handleSignUp } from '../../viewmodels/AuthViewModel';
import GradientScreenWrapper from '../../components/GradientScreenWrapper';
import GradientButton from '../../components/GradientButton';
import UnderlineInput from '../../components/UnderlineInput';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
      if (!username || !email || !password) {
        Alert.alert('Error', 'Please fill in both email and password');
        return;
      }

      setLoading(true);
      const result = await handleSignUp(username, email, password);
      setLoading(false);

      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login'}],
        });
      } else {
        const errorMessage = result.error instanceof Error ? result.error.message : 'An error occurred';
        Alert.alert('Sign Up Failed', errorMessage);
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
          placeholder="Username"
          icon="person"
          value={username}
          onChangeText={setUsername}
        />
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
        <GradientButton title="Sign Up" onPress={signUp} style={{ width: 175, height: 46, alignSelf: 'center',  marginBottom: 29}} disabled={loading}/>

        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Text>
      </View>
    </GradientScreenWrapper>
  );
};

export default SignUpScreen;
