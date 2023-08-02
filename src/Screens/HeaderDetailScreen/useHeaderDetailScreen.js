import {Alert, Linking} from 'react-native';
import {PackageDetailData} from '../../Utils/localDB';
import {useEffect} from 'react';
import API from '../../Utils/helperFunc';
import {useCoinUrl} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {updateUser} from '../../Redux/Action/AuthAction';
import {errorMessage} from '../../Config/NotificationMessage';

const useHeaderDetailScreen = ({navigate}) => {
  const {dispatch} = useReduxStore();
  const onPressEMail = email => {
    console.log(email);
    Linking.openURL('mailto:' + email);
  };
  const onPressCall = phone => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
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

  const navigationChatScreen = item => {
    navigate('MessagesScreen', {
      id: item.userDetail.agoraId,
      userDetail: item.userDetail,
    });
    // navigate('MessagesScreen', {id: users[0]?.userId, userDetail: users[0]});
  };

  //USE COIN API HIT
  const getCoinFunction = async () => {
    const {ok, data} = await API.post(useCoinUrl);
    if (ok) {
      dispatch(updateUser(data.data));
    } else {
      errorMessage(originalError);
    }
  };
  useEffect(() => {
    getCoinFunction();
  }, []);

  return {PackageDetailData, onPressEMail, onPressCall, navigationChatScreen};
};

export default useHeaderDetailScreen;
