import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import { AppButton, AppTextInput } from '../../../components';
import styles from './styles';
import { AppImages } from '../../../assets';
import { useMyNavigation } from '../../../navigation/useMyNavigation';
import { registerUser } from '../../../database/authentication';

const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useMyNavigation();

  const handleRegistration = async () => {
    setLoading(true);

    const strPassword = password.trim();
    const strConfirmPassword = confirmPassword.trim();
    if (strPassword !== strConfirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setTimeout(async () => {
      try {
        await registerUser(email, strConfirmPassword, fullName);
        Alert.alert('Registration successful');
        navigation.navigate('Login'); // Navigate back to login
      } catch (error) {
        Alert.alert('Registration Error:', error);
      } finally {
        setLoading(false);
      }
    }, 10);
  };

  return (
    <BaseScreen header title="Registration">
      <View style={styles.bottomContainer}>
        <Image source={AppImages.registration} />
        <Text style={styles.titleText}>Registration</Text>
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
        <AppTextInput
          title="Confirm Password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <AppTextInput
          title="Fullname"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <AppButton
          loading={loading}
          style={styles.buttonWrapper}
          title={'Register'}
          onPress={handleRegistration}
        />
        <TouchableOpacity
          style={styles.newUserView}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.newUserText}>
            Already Registered? Click here to login
          </Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
};

export default Registration;
