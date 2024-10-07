// HeaderComponent.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const HeaderComponent = ({ onClearCart }) => {
  return (
    <TouchableOpacity onPress={onClearCart}>
      <Text>Clear Cart</Text>
    </TouchableOpacity>
  );
};

export default HeaderComponent;
