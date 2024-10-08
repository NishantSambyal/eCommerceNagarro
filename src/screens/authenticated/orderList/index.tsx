import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchOrderHistory, updateOrderStatus } from '../../../database/orders';
import styles from './styles';
import OrderTracking from '../../../components/orderTracking';
import { AppIcons } from '../../../assets';
import { STATUS_DATA } from '../../../utils/constants';

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);
  const navigation = useNavigation();

  // Use useFocusEffect to refresh the data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        const fetchedOrders = await fetchOrderHistory(userId);
        setOrders(fetchedOrders);
        setLatestOrder(fetchedOrders[0]); // Set the latest order (assuming orders are sorted by order_date)
      };

      fetchOrders();
    }, [userId]),
  );
  const getNextStatus = currentStatus => {
    const currentIndex = STATUS_DATA.findIndex(s => s.status === currentStatus);
    if (currentIndex < STATUS_DATA.length - 1) {
      return STATUS_DATA[currentIndex + 1].status; // Return the next status
    }
    return null; // No next status available (i.e., status is "Delivered")
  };

  const handleNextStatus = async () => {
    if (latestOrder) {
      const nextStatus = getNextStatus(latestOrder.status);
      if (nextStatus) {
        // Update the order status and refresh the list
        await updateOrderStatus(latestOrder.order_id, nextStatus);
        const updatedOrders = await fetchOrderHistory(userId); // Refetch the orders to get the updated status
        setOrders(updatedOrders);
        setLatestOrder(updatedOrders[0]);
      } else {
        console.log('Order is already delivered.');
      }
    }
  };

  const handleSeeMore = () => {
    navigation.navigate('MyOrders', { orders });
  };

  return orders.length > 0 ? (
    <View>
      {orders.length > 1 && (
        <TouchableOpacity onPress={handleSeeMore}>
          <Text style={styles.seeAllText}>{`See more (${orders.length})`}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        {/* Show latest order */}
        {latestOrder && (
          <View style={styles.orderCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>Latest Order</Text>
              <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity onPress={handleNextStatus}>
                  <Image source={AppIcons.arrow} />
                </TouchableOpacity>
              </View>
            </View>
            <Text>Status: {latestOrder.status}</Text>
            <Text>Total: ₹ {latestOrder.total_amount.toFixed(2)}</Text>
            <Text>
              Date: {new Date(latestOrder.order_date).toLocaleString()}
            </Text>
            <OrderTracking currentStatus={latestOrder.status} />
          </View>
        )}
      </View>
    </View>
  ) : null;
};

export default OrderList;
