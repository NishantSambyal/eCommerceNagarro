import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue.v1,
    borderRadius: 8,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white.v1,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default styles;
