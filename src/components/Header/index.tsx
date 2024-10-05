import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { AppIcons } from '../../assets';
import styles from './styles';
import { IProps } from './type';
import { useMyNavigation } from '../../navigation/useMyNavigation';

const Header: FC<IProps> = ({ title, onBackPress }) => {
  const navigation = useMyNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.imageWrapper}
        onPress={onBackPress ? onBackPress : () => navigation.goBack()}>
        <Image source={AppIcons.back} style={styles.backImage} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Header;
