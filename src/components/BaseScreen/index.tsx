import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { IProps } from './type';

const BaseScreen: FC<IProps> = ({ children }) => {
  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={[styles.container, styles.mainContainer]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.viewContainer}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BaseScreen;
