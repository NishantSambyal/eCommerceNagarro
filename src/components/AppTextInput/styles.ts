import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: 11,
    color: colors.black.v1,
    marginBottom: 4,
  },
  input: {
    height: 55,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.black.v2,
    borderRadius: 8,
    color: colors.black.v1,
  },
});

export default styles;
