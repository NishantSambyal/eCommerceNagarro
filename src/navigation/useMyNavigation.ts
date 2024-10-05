import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './type';

export type MyNavigationProps = StackNavigationProp<RootStackParamList>;

export const useMyNavigation = () => {
  return useNavigation<MyNavigationProps>();
};
