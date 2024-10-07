import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flex: 1,
  },
  section: {
    backgroundColor: colors.white.v1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black.v1,
    marginLeft: 15,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black.v1,
    marginLeft: 15,
  },
  billWrapper: {
    marginTop: 20,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  billLabel: {
    color: colors.black.v3,
    fontSize: 12,
  },
  included: {
    marginHorizontal: 10,
    color: colors.black.v3,
    fontSize: 12,
    marginTop: 6,
    paddingBottom: 20,
  },
  billAmount: {
    color: colors.black.v1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  toPayLabel: {
    color: colors.black.v1,
    fontSize: 15,
    fontWeight: 'bold',
  },
  toPay: {
    color: colors.black.v1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.5,
    alignSelf: 'stretch',
    shadowOffset: { x: 10, y: 10 },
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 10,
  },
  listWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black.v1,
    marginLeft: 10,
  },
  plus: {
    fontSize: 20,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  minus: {
    fontSize: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  divider: {
    marginTop: 30,
    marginBottom: 20,
    height: 1,
    width: '100%',
    backgroundColor: colors.black.v4,
  },
});

export default styles;
