import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BaseScreen from '../../../components/BaseScreen';
import {
  addToCart,
  fetchCartItems,
  getTotalCartItems,
  removeFromCart,
} from '../../../database/ListingAndCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './styles';
import { AppIcons, AppProducts } from '../../../assets';
import colors from '../../../utils/colors';
import { AppButton } from '../../../components';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const userReducer = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    const fetchCart = async () => {
      const updatedCartItems = await fetchCartItems(userReducer.data.id);
      setCart(updatedCartItems);
    };

    if (userReducer.data.id) {
      fetchCart();
    }
  }, [userReducer.data.id]);

  const handleAddToCart = async item => {
    await addToCart(userReducer.data.id, item.id);
    console.log(userReducer.data.id, item.id);
    const updatedCartItems = await fetchCartItems(userReducer.data.id);
    console.log('updatedCartItems', updatedCartItems);
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
      <View style={styles.listWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={img} style={styles.image} />
          <Text style={styles.itemTitle}>{item?.name}</Text>
        </View>
        <View style={styles.listItemWrapper}>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
            <Text style={styles.minus}>-</Text>
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <BaseScreen
      scrollEnabled={false}
      header
      title={'My Cart'}
      cartCount={getTotalCartItems(cart)}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.section}>
            <View style={styles.deliveryContainer}>
              <Image source={AppIcons.stopwatch} />
              <Text style={styles.deliveryTitle}>Delivery in 30 minutes</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cart}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View style={styles.section}>
            <View style={styles.deliveryContainer}>
              <Image source={AppIcons.coupon} />
              <Text style={styles.couponTitle}>View Coupons and Offers</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.deliveryContainer}>
              <Image source={AppIcons.bill} />
              <Text style={styles.couponTitle}>Bill Summary</Text>
            </View>
            <View style={styles.billWrapper}>
              <Text style={styles.billLabel}>Item Total & GST</Text>
              <Text style={styles.billAmount}>₹ 200</Text>
            </View>
            <View style={styles.billWrapper}>
              <Text style={styles.billLabel}>Handling Charges</Text>
              <Text style={styles.billAmount}>₹ 9.99</Text>
            </View>
            <View style={styles.billWrapper}>
              <Text style={styles.billLabel}>Delivery Charges</Text>
              <Text style={styles.billAmount}>₹ 27</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billWrapper}>
              <Text style={styles.toPayLabel}>To Pay</Text>
              <Text style={styles.toPay}>₹ 480</Text>
            </View>
            <Text style={styles.included}>Included all taxes and charges</Text>
          </View>
        </View>
      </ScrollView>
      <AppButton style={styles.button} title="Place Order" onPress={() => {}} />
    </BaseScreen>
  );
};

export default Cart;
