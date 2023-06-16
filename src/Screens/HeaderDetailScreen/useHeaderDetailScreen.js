import { Alert, Linking } from 'react-native';
import { PackageDetailData } from '../../Utils/localDB';

const useHeaderDetailScreen = () => {
  const onPressEMail = (email) => {
    console.log(email)
    Linking.openURL('mailto:' + email)
  }
  const onPressCall = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  return { PackageDetailData, onPressEMail, onPressCall };
};

export default useHeaderDetailScreen;
