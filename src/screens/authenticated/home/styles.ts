import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  productContainer: {
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  cardContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.5,
    alignSelf: 'stretch',
    shadowOffset: { x: 10, y: 10 },
    marginTop: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    width: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    color: colors.black.v1,
  },
  dropdown: {
    height: 50,
    width: '90%', // Adjust width to fit your layout
    borderColor: '#ccc', // Light grey border color
    borderWidth: 1, // Thin border
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 16, // Padding inside the dropdown
    marginBottom: 20, // Space below the dropdown
    alignSelf: 'center', // Center the dropdown horizontally
    backgroundColor: 'white', // Background color
  },
});

export default styles;
