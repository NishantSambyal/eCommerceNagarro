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

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        const fetchedOrders = await fetchOrderHistory(userId);
        setOrders(fetchedOrders);
        setLatestOrder(fetchedOrders[0]);
      };

      fetchOrders();
    }, [userId]),
  );
  const getNextStatus = currentStatus => {
    const currentIndex = STATUS_DATA.findIndex(s => s.status === currentStatus);
    if (currentIndex < STATUS_DATA.length - 1) {
      return STATUS_DATA[currentIndex + 1].status;
    }
    return null;
  };

  const handleNextStatus = async () => {
    if (latestOrder) {
      const nextStatus = getNextStatus(latestOrder.status);
      if (nextStatus) {
        // Update the order status and refresh the list
        await updateOrderStatus(latestOrder.order_id, nextStatus);
        const updatedOrders = await fetchOrderHistory(userId);
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
    <View testID="order-list">
      {orders.length > 1 && (
        <TouchableOpacity onPress={handleSeeMore} testID="see-more">
          <Text style={styles.seeAllText}>{`See more (${orders.length})`}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.container} testID="latest-order">
        {/* Show latest order */}
        {latestOrder && (
          <View
            style={styles.orderCard}
            testID={`order-${latestOrder.order_id}`}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title} testID="latest-order-title">
                Latest Order
              </Text>
              <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity
                  onPress={handleNextStatus}
                  testID="next-status">
                  <Image source={AppIcons.arrow} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.statusText} testID="order-status">
              Status: {latestOrder.status}
            </Text>
            <Text style={styles.statusText} testID="order-total">
              Total: ₹ {latestOrder.total_amount.toFixed(2)}
            </Text>
            <Text style={styles.statusText} testID="order-date">
              Date: {new Date(latestOrder.order_date).toLocaleString()}
            </Text>
            <OrderTracking
              currentStatus={latestOrder.status}
              testID="order-tracking"
            />
          </View>
        )}
      </View>
    </View>
  ) : null;
};

export default OrderList;
