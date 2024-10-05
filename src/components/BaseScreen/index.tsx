import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { IProps, IPropsWithoutHeader } from './type';
import Header from '../Header';

const BaseScreen: FC<IProps | IPropsWithoutHeader> = ({
  children,
  title,
  header = false,
}) => {
  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={[styles.container, styles.mainContainer]}>
      {header && <Header title={title!} />}
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
