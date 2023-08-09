import {Alert, Linking} from 'react-native';
import {PackageDetailData} from '../../Utils/localDB';
import {useEffect, useCallback} from 'react';
import API from '../../Utils/helperFunc';
import {baseURL, iosAppUrl, useCoinUrl} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {types} from '../../Redux/types';

const useHeaderDetailScreen = ({navigate}, {params}) => {
  const {dispatch, getState} = useReduxStore();
  const {receipt} = params;
  console.log('asdidfijakldsfjkldsj', params);
  const userData = getState('Auth');
  console.log('HEaderDetailScreen', userData);
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

  const useCoin = async () => {
    try {
      const response = await fetch(baseURL + useCoinUrl, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          // Other headers if needed...
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data454654q56w4e65q456', data);
        dispatch({type: types.UpdateProfile, payload: data.data});
      } else {
        // Handle the case where the response status is not okay (e.g., handle errors)
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      // Handle any network errors or exceptions that occur during the fetch
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    useCoin();
  }, []);

  return {PackageDetailData, onPressEMail, onPressCall, navigationChatScreen};
};

export default useHeaderDetailScreen;
