import { Alert } from 'react-native';

export interface IAlertProps {
  title: string;
  description: string;
  negativeTitle?: string;
  positiveTitle?: string;
  onPress?: () => void;
}
const myAlertBox = ({
  title,
  description,
  negativeTitle,
  positiveTitle,
  onPress,
}: IAlertProps) =>
  Alert.alert(
    title,
    description,
    [
      {
        text: negativeTitle ?? 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: positiveTitle ?? 'OK',
        onPress: () => {
          onPress && onPress();
        },
      },
    ],
    {
      cancelable: false,
    },
  );

export { myAlertBox };
