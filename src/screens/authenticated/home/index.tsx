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
import { Dropdown } from 'react-native-element-dropdown';
import { availableStates, transformStates } from '../../../utils/constants';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Using an object to map product ID to quantity
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
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
  const filterProductsByLocation = (products, location) => {
    const filteredProducts = products.filter(product =>
      product.available_in.includes(location),
    );
    setProducts(filteredProducts);
  };

  // const handleLocationChange = item => {
  //   setSelectedLocation(item);
  //   fetchProducts().then(product => filterProductsByLocation(product, item));
  // };
  const handleLocationChange = item => {
    // If the selected location is the same as the current location, do nothing
    if (item === selectedLocation) {
      return;
    }

    // Check if there are items in the cart
    if (cart.length > 0) {
      // Warn the user that the cart will be cleared
      myAlertBox({
        title: 'Change Location',
        description:
          'Changing location will clear all items from your cart. Do you want to proceed?',
        onPress: () => {
          // If the user confirms, clear the cart and change the location
          clearCart(userReducer.data.id); // Clear the cart in the database
          setCart([]); // Reset local cart state
          setSelectedLocation(item); // Update the selected location
          // Fetch and filter products based on the new location
          fetchProducts().then(product =>
            filterProductsByLocation(product, item),
          );
        },
      });
    } else {
      // If no items in cart, change the location directly
      setSelectedLocation(item);
      fetchProducts().then(product => filterProductsByLocation(product, item));
    }
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
            <View>
              <OrderList userId={userReducer.data.id} />
              <Dropdown
                style={styles.dropdown}
                data={transformStates()}
                labelField="label"
                valueField="value"
                placeholder="Select address"
                value={selectedLocation}
                onChange={item => handleLocationChange(item.value)}
                itemTextStyle={{ color: 'black' }}
                selectedTextStyle={{ color: 'black' }}
              />
            </View>
          }
        />
      </View>
    </BaseScreen>
  );
};

export default Home;
