import { Text } from 'react-native';
import React, { useEffect } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import { useRoute } from '@react-navigation/native';
import { fetchOrderItems } from '../../../database/orders';

const MyOrders = () => {
  const route = useRoute();
  const orders = route.params?.orders || [];

  useEffect(() => {
    for (const order of orders) {
      fetchOrderItems(order?.order_id).then(items => console.log(items));
    }
  });
  return (
    <BaseScreen title="My Orders" header>
      <Text>MyOrders</Text>
    </BaseScreen>
  );
};

export default MyOrders;
