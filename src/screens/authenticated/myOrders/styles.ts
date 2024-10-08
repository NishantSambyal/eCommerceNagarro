import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black.v4,
  },
  section: {
    backgroundColor: colors.white.v1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderStatus: {
    fontWeight: 'bold',
    color: colors.black.v1,
    marginTop: 6,
  },
  placedText: {
    fontSize: 12,
    color: colors.black.v3,
    marginTop: 2,
  },
  divider: {
    marginTop: 30,
    marginBottom: 10,
    height: 1,
    width: '100%',
    backgroundColor: colors.black.v4,
  },
  orderAgain: {
    color: colors.red.v4,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
  },
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default styles;
