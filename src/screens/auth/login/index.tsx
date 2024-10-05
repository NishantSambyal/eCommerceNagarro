import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { AppImages } from '../../../assets';
import styles from './styles';
import { AppButton, AppTextInput } from '../../../components';
import BaseScreen from '../../../components/BaseScreen';
import { useMyNavigation } from '../../../navigation/useMyNavigation';
import { loginUser } from '../../../database/authentication';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useMyNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const isValid = await loginUser(email, password);
      if (isValid) {
        Alert.alert('Login successful');
        // navigation.navigate('Home'); // Navigate to authenticated home screen
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error logging in', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen>
      <View style={styles.bottomContainer}>
        <Image source={AppImages.registration} />
        <Text style={styles.titleText}>Login</Text>
        <AppTextInput
          title="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AppTextInput
          title="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppButton
          loading={loading}
          style={styles.buttonWrapper}
          title={'Login'}
          onPress={handleLogin}
        />
        <TouchableOpacity
          style={styles.newUserView}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.newUserText}>New User? Register Here</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

export default Login;
