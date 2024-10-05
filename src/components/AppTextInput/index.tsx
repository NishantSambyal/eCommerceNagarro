import { View, TextInput, Text } from 'react-native';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './type';

const AppTextInput: FC<IProps> = ({
  title,
  onChangeText,
  value,
  placeholder,
  ...props
}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};

export default AppTextInput;
