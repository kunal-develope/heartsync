/* eslint-disable prettier/prettier */
import {ToastAndroid} from 'react-native';

const alertHelper = message => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};
export default alertHelper;
