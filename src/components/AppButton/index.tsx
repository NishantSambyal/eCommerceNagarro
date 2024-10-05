import { Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './type';

const AppButton: FC<IProps> = ({ style, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
