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
  clearCart,
  fetchCartItems,
  getTotalCartItems,
  removeFromCart,
} from '../../../database/ListingAndCart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './styles';
import { AppIcons, AppProducts } from '../../../assets';
import { AppButton } from '../../../components';
import { placeOrder } from '../../../database/orders';
import { myAlertBox } from '../../../utils/alert';
import { useMyNavigation } from '../../../navigation/useMyNavigation';

const HANDLING_CHARGES = 9.99;
const DELIVERY_CHARGES = 27;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigation = useMyNavigation();
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
    const updatedCartItems = await fetchCartItems(userReducer.data.id);
    setCart(updatedCartItems); // Update the cart state with fresh data
  };

  const handleRemoveFromCart = async item => {
    await removeFromCart(userReducer.data.id, item.id);
    const updatedCartItems = await fetchCartItems(userReducer.data.id);
    setCart(updatedCartItems); // Update the cart state with fresh data
  };

  // Function to calculate total cart price
  const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total;
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(userReducer.data.id, cart, totalAmountToPay.toFixed(2));
      myAlertBox({
        title: 'Order Placed',
        description: 'Order placed successfully',
        onPress: async () => {
          await clearCart(userReducer.data.id);
          setCart([]);
          navigation.goBack();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const img = AppProducts[item.image_path];
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0; // Default to 0 if not found

    return (
      <View style={styles.listWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={img} style={styles.image} />
          <View>
            <Text style={styles.itemTitle}>{item?.name}</Text>
            <Text style={styles.itemPrice}>₹ {item?.price}</Text>
          </View>
        </View>
        <View style={styles.listItemWrapper}>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
            <View style={styles.minusWrapper}>
              <Text style={styles.minus}>-</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)}>
            <View style={styles.plusWrapper}>
              <Text style={styles.plus}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Calculate total cost including charges
  const totalCartPrice = calculateTotal();
  const totalAmountToPay = totalCartPrice + HANDLING_CHARGES + DELIVERY_CHARGES;

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
              <Text style={styles.billAmount}>
                ₹ {totalCartPrice.toFixed(2)}
              </Text>
            </View>
            <View style={styles.billWrapper}>
              <Text style={styles.billLabel}>Handling Charges</Text>
              <Text style={styles.billAmount}>₹ {HANDLING_CHARGES}</Text>
            </View>
            <View style={styles.billWrapper}>
              <Text style={styles.billLabel}>Delivery Charges</Text>
              <Text style={styles.billAmount}>₹ {DELIVERY_CHARGES}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billWrapper}>
              <Text style={styles.toPayLabel}>To Pay</Text>
              <Text style={styles.toPay}>₹ {totalAmountToPay.toFixed(2)}</Text>
            </View>
            <Text style={styles.included}>Included all taxes and charges</Text>
          </View>
        </View>
      </ScrollView>
      <AppButton
        style={styles.button}
        title="Place Order"
        onPress={handlePlaceOrder}
      />
    </BaseScreen>
  );
};

export default Cart;
