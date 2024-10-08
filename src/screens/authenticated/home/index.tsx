import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  createProductsTable,
  insertProducts,
  createInventory,
} from '../../../database/products';
import {
  addToCart,
  clearCart,
  createCartTable,
  fetchCartItems,
  fetchProducts,
  getTotalCartItems,
  removeFromCart,
} from '../../../database/ListingAndCart';
import styles from './styles';
import { AppProducts } from '../../../assets';
import BaseScreen from '../../../components/BaseScreen';
import { RootState } from '../../../redux/store';
import { myAlertBox } from '../../../utils/alert';
import { createOrderTables, fetchOrderHistory } from '../../../database/orders';
import OrderList from '../orderList';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Using an object to map product ID to quantity
  const userReducer = useSelector((state: RootState) => state.UserReducer);

  // Initialize database tables
  useFocusEffect(
    useCallback(() => {
      createProductsTable();
      insertProducts();
      createCartTable();
      createOrderTables();
      createInventory;
    }, []),
  );

  // Fetch products when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchProducts().then(product => setProducts(product));
    }, []),
  );

  // Fetch order history when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userReducer.data.id) {
        fetchOrderHistory(userReducer.data.id).then(orders =>
          console.log(JSON.stringify(orders, null, 4)),
        );
      }
    }, [userReducer.data.id]),
  );

  // Fetch cart items when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        const updatedCartItems = await fetchCartItems(userReducer.data.id);
        setCart(updatedCartItems);
      };

      if (userReducer.data.id) {
        fetchCart();
      }
    }, [userReducer.data.id]),
  );

  const handleClearCart = async () => {
    myAlertBox({
      title: 'Clear cart',
      description: 'Are you sure you want to clear your cart?',
      onPress: async () => {
        try {
          await clearCart(userReducer.data.id); // Clear the cart for the current user
          setCart([]); // Reset local cart state
          console.log('Cart cleared successfully');
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },
    });
  };

  const handleAddToCart = async item => {
    await addToCart(userReducer.data.id, item.id);
    const updatedCartItems = await fetchCartItems(userReducer.data.id);
    setCart(updatedCartItems); // Update the cart state with fresh data
  };

  const handleRemoveFromCart = async item => {
    await removeFromCart(userReducer.data.id, item.id);
    const updatedCartItems = await fetchCartItems(userReducer.data.id);
    setCart(updatedCartItems); // Update the cart state with fresh data
  };

  const renderItem = ({ item }) => {
    const img = AppProducts[item.image_path];

    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0; // Default to 0 if not found

    return (
      <View style={styles.cardContainer}>
        <View style={styles.productContainer}>
          <Image source={img} style={styles.image} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₹ {item.price}</Text>
          <View style={styles.cartContainer}>
            <TouchableOpacity
              onPress={() => handleRemoveFromCart(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            {/* Use the updated quantity */}
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <BaseScreen
      scrollEnabled={false}
      header
      title={'\tWelcome, ' + userReducer.data.fullName}
      noBackButton
      cartCount={getTotalCartItems(cart)}>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          ListHeaderComponent={
            // <HeaderComponent onClearCart={handleClearCart} />
            <OrderList userId={userReducer.data.id} />
          }
        />
      </View>
    </BaseScreen>
  );
};

export default Home;
