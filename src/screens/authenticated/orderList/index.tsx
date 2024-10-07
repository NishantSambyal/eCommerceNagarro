import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchOrderHistory } from '../../../database/orders';
import styles from './styles';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await fetchOrderHistory(userId);
      setOrders(fetchedOrders);
      setLatestOrder(fetchedOrders[0]); // Set the latest order (assuming orders are sorted by order_date)
    };

    fetchOrders();
  }, [userId]);

  const handleSeeMore = () => {
    navigation.navigate('AllOrders', { orders });
  };

  return (
    <View style={styles.container}>
      {/* Show latest order */}
      {latestOrder && (
        <View style={styles.orderCard}>
          <Text style={styles.title}>Latest Order</Text>
          <Text>Status: {latestOrder.status}</Text>
          <Text>Total: ₹ {latestOrder.total_amount.toFixed(2)}</Text>
          <Text>Date: {new Date(latestOrder.order_date).toLocaleString()}</Text>
        </View>
      )}

      {/* Show See More Button if there are more than one order */}
      {orders.length > 1 && (
        <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderList;
