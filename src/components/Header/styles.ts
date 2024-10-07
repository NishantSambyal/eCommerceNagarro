import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    padding: 16,
  },
  backImage: {
    height: 17,
    width: 9,
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.blue.v2,
    flex: 0.9,
  },
  cartWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    backgroundColor: 'orange',
    borderRadius: 10,
    minWidth: 22,
    minHeight: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItems: {
    color: 'white',
    fontSize: 12,
  },
  cartIcon: {
    padding: 10,
    marginRight: 10,
  },
  logoutIcon: {
    padding: 10,
  },
});

export default styles;
