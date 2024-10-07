import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../utils/colors';

const STATUS_DATA = [
  { id: 1, status: 'Ordered' },
  { id: 2, status: 'Shipped' },
  { id: 3, status: 'Out for Delivery' },
  { id: 4, status: 'Delivered' },
];

const OrderTracking = ({ currentStatus }) => {
  const getStatusIndex = status =>
    STATUS_DATA.findIndex(s => s.status === status);

  const currentStatusIndex = getStatusIndex(currentStatus);

  return (
    <View style={styles.container}>
      <View style={styles.trackerContainer}>
        {STATUS_DATA.map((item, index) => {
          const isActive = index <= currentStatusIndex;
          return (
            <View key={item.id} style={styles.statusContainer}>
              <View
                style={[
                  styles.circle,
                  isActive ? styles.activeCircle : styles.inactiveCircle,
                ]}
              />
              {index < STATUS_DATA.length - 1 && (
                <View
                  style={[
                    styles.line,
                    isActive ? styles.activeLine : styles.inactiveLine,
                  ]}
                />
              )}
              <Text
                style={[
                  styles.statusText,
                  isActive ? styles.activeText : styles.inactiveText,
                ]}>
                {item.status}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  trackerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.8, // Set a width for the tracker
  },
  statusContainer: {
    alignItems: 'center',
    position: 'relative', // Allow absolute positioning for the line
    marginHorizontal: 18, // Increase horizontal spacing between circles
  },
  circle: {
    width: 24, // Increase circle size for better visibility
    height: 24,
    borderRadius: 12,
  },
  activeCircle: {
    backgroundColor: colors.green.v1,
  },
  inactiveCircle: {
    backgroundColor: '#ccc',
  },
  line: {
    height: 2,
    width: 150, // Fixed width for the connecting line
    position: 'absolute',
    top: 12, // Adjusted to center the line vertically with the circles
    left: 12, // Center the line between the circles
  },
  activeLine: {
    backgroundColor: colors.green.v1, // Color of the line when active
  },
  inactiveLine: {
    backgroundColor: '#ccc',
  },
  statusText: {
    marginTop: 5,
    fontSize: 12,
  },
  activeText: {
    color: colors.green.v2,
  },
  inactiveText: {
    color: '#aaa',
  },
});

export default OrderTracking;
