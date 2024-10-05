import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AppImages } from '../../../assets';
import styles from './styles';
import { AppButton, AppTextInput } from '../../../components';
import BaseScreen from '../../../components/BaseScreen';
import { useMyNavigation } from '../../../navigation/useMyNavigation';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useMyNavigation();
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
          style={styles.buttonWrapper}
          title={'Login'}
          onPress={() => {}}
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
