import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import * as Components from '../screens';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const userReducer = useSelector((state: RootState) => state.UserReducer);
  const isLogin = userReducer.data ? true : false;

  const renderHomeStack = () => {
    return (
      <>
        <Stack.Screen name="Login" component={Components.Login} />
        <Stack.Screen name="Registration" component={Components.Registration} />
      </>
    );
  };
  const renderAuthStack = () => {
    return (
      <>
        <Stack.Screen name="Home" component={Components.Home} />
        <Stack.Screen name="Cart" component={Components.Cart} />
        <Stack.Screen name="MyOrders" component={Components.MyOrders} />
      </>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: '#00ff00',
      }}>
      {isLogin ? renderAuthStack() : renderHomeStack()}
    </Stack.Navigator>
  );
};

export default Route;
