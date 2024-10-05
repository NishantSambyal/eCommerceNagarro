import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    padding: 16,
  },
  backImage: {
    height: 17,
    width: 9,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue.v2,
  },
});

export default styles;
