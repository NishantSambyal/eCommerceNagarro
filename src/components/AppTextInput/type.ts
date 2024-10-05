import { TextInputProps } from 'react-native';

export interface IProps extends TextInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}
