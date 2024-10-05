import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './type';
import colors from '../../utils/colors';

const AppButton: FC<IProps> = ({ style, title, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {!loading && <Text style={styles.buttonText}>{title}</Text>}
      {loading && <ActivityIndicator color={colors.white.v1} />}
    </TouchableOpacity>
  );
};

export default AppButton;
