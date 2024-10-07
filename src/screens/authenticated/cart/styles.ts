import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flex: 1,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black.v1,
    marginLeft: 15,
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
});

export default styles;
