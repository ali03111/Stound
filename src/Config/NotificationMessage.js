import {showMessage} from 'react-native-flash-message';
import {Colors} from '../Theme/Variables';

export const errorMessage = description => {
  showMessage({
    type: 'danger',
    icon: 'auto',
    message: 'Warning',
    description: description,
    floating: true,
    backgroundColor: Colors.red,
    style: {alignItems: 'center'},
    duration: 1000, // Set the duration in milliseconds (5 seconds in this example)

  });
};

export const successMessage = description => {
  showMessage({
    type: 'success',
    icon: 'auto',
    message: 'Success',
    description: description,
    floating: true,
    backgroundColor: Colors.primaryColor,
    style: {alignItems: 'center'},
    duration: 1000, // Set the duration in milliseconds (5 seconds in this example)

  });
};
