// FooterComponent.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUserR } from '../../../redux/reducers/slices/userSlice';

const FooterComponent = () => {
  const dispatch = useDispatch();

  return (
    <View style={{ paddingBottom: 200 }}>
      <TouchableOpacity onPress={() => dispatch(logoutUserR())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterComponent;
