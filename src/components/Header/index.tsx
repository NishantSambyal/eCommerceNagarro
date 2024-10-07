import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { AppIcons } from '../../assets';
import styles from './styles';
import { IProps } from './type';
import { useMyNavigation } from '../../navigation/useMyNavigation';
import { myAlertBox } from '../../utils/alert';
import { useDispatch } from 'react-redux';
import { logoutUserR } from '../../redux/reducers/slices/userSlice';

const Header: FC<IProps> = ({
  title,
  onBackPress,
  noBackButton,
  cartCount,
}) => {
  const navigation = useMyNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      {!noBackButton && (
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={onBackPress ? onBackPress : () => navigation.goBack()}>
          <Image source={AppIcons.back} style={styles.backImage} />
        </TouchableOpacity>
      )}

      <Text style={styles.titleText}>{title}</Text>

      {cartCount && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.cartIcon}
            onPress={() => navigation.navigate('Cart')}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={AppIcons.cart} />
              <View style={styles.cartWrapper}>
                <Text style={styles.cartItems}>{cartCount}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutIcon}
            onPress={() =>
              myAlertBox({
                title: 'Logout',
                description: 'Are you sure want to logout?',
                onPress: () => dispatch(logoutUserR()),
              })
            }>
            <View style={{ flexDirection: 'row' }}>
              <Image source={AppIcons.logout} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
