import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#f4f4f4', // Light background color for better contrast
  },
  orderCard: {
    backgroundColor: '#fff', // White background for each order card
    padding: 16,
    marginBottom: 16,
    borderRadius: 8, // Rounded corners
    elevation: 3, // Slight shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600', // Medium bold for the title
    marginBottom: 8,
    color: '#333', // Darker text for contrast
  },
  orderText: {
    fontSize: 16,
    color: '#666', // Gray color for less emphasis
    marginBottom: 4,
  },
  seeMoreButton: {
    backgroundColor: '#007bff', // Primary color (blue) for button
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center', // Center the button text
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  seeMoreText: {
    color: '#fff', // White text for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    textAlign: 'right',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: colors.red.v4,
    margin: 10,
  },
});

export default styles;
