import { ViewStyle } from 'react-native';

export interface IProps {
  title: string;
  style?: ViewStyle;
  onPress: () => void;
  loading?: boolean;
  testID?: string;
}
