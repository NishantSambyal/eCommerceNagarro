import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { AppImages } from '../../../assets';
import styles from './styles';
import { AppButton, AppTextInput } from '../../../components';
import BaseScreen from '../../../components/BaseScreen';
import { useMyNavigation } from '../../../navigation/useMyNavigation';
import { loginUser } from '../../../database/authentication';
import { useDispatch } from 'react-redux';
import { loginUserR } from '../../../redux/reducers/slices/userSlice';

const Login = () => {
  const [email, setEmail] = useState<string>('nishant@gmail.com');
  const [password, setPassword] = useState<string>('password');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useMyNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const userDetails = await loginUser(email, password);
      if (userDetails) {
        dispatch(loginUserR(userDetails));
        console.log(JSON.stringify(userDetails));
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
