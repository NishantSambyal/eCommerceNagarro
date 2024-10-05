import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    padding: 16,
  },
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black.v1,
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  newUserView: {
    padding: 16,
  },
  newUserText: {
    color: colors.blue.v1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
