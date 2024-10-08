import {
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import { useRoute } from '@react-navigation/native';
import { fetchOrderItems } from '../../../database/orders';
import { AppProducts } from '../../../assets';
import styles from './styles';

const MyOrders = () => {
  const route = useRoute();
  const orders = route.params?.orders || [];
  const [orderItems, setOrderItems] = useState({}); // State to store fetched order items
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchItems = async () => {
      const items = {};
      for (const order of orders) {
        const fetchedItems = await fetchOrderItems(order.order_id);
        items[order.order_id] = fetchedItems; // Store items by order_id
      }
      setOrderItems(items); // Update state with fetched items
      setLoading(false); // Set loading to false after fetching
    };

    fetchItems();
  }, [orders]);

  const renderOrderItem = ({ item }) => {
    const currentItems = orderItems[item.order_id] || []; // Get items for the current order
    console.log(item);
    return (
      <View style={styles.section}>
        <FlatList
          data={currentItems}
          showsHorizontalScrollIndicator={false}
          horizontal={true} // Set to horizontal if you want it to scroll horizontally
          keyExtractor={innerItem => innerItem.order_item_id.toString()} // Use order_item_id for inner items
          renderItem={({ item: innerItem }) => {
            console.log(innerItem.item_name);
            console.log(innerItem);
            const image = AppProducts[innerItem.item_name + '.png'];
            return (
              <View style={{ flex: 1, padding: 10 }}>
                <Image source={image} style={styles.image} />
                {/* <Image
                  source={image}
                  style={{ width: 100, height: 100, borderWidth: 1 }}
                /> */}
                {/* Assuming the item has an item_name and you have image logic here */}
              </View>
            );
          }}
        />
        <View style={styles.descriptionWrapper}>
          <View>
            <Text style={styles.orderStatus}>Status: {item.status}</Text>
            <Text style={styles.placedText}>
              Placed at: {new Date(item.order_date).toLocaleString()}
            </Text>
          </View>
          <Text style={styles.orderStatus}>₹ {item.total_amount}</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity>
          <Text style={styles.orderAgain}>Order Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BaseScreen title="My Orders" header>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
      ) : (
        <View style={{ padding: 16 }}>
          <FlatList
            data={orders}
            keyExtractor={item => item.order_id.toString()}
            renderItem={renderOrderItem}
          />
        </View>
      )}
    </BaseScreen>
  );
};

export default MyOrders;
