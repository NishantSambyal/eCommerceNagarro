import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import { AppButton, AppTextInput } from '../../../components';
import styles from './styles';
import { AppImages } from '../../../assets';
import { useMyNavigation } from '../../../navigation/useMyNavigation';
import { registerUser } from '../../../database/authentication';
import { myAlertBox } from '../../../utils/alert';

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
        myAlertBox({
          title: 'Registration Successful',
          description: 'Registration successful. Please login',
          onPress: () => {
            navigation.navigate('Login');
          },
        });
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
          testID="email-input"
          title="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AppTextInput
          testID="password-input"
          title="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppTextInput
          testID="confirm-password-input"
          title="Confirm Password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <AppTextInput
          testID="fullname-input"
          title="Fullname"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <AppButton
          testID="register-button"
          loading={loading}
          style={styles.buttonWrapper}
          title={'Register'}
          onPress={handleRegistration}
        />
        <TouchableOpacity
          testID="new-user-button"
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
