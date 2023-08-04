import {Alert, Linking} from 'react-native';
import {PackageDetailData} from '../../Utils/localDB';
import {useEffect, useCallback} from 'react';
import API from '../../Utils/helperFunc';
import {iosAppUrl, useCoinUrl} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {updateUser} from '../../Redux/Action/AuthAction';
import {errorMessage} from '../../Config/NotificationMessage';
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

  // //USE COIN API HIT
  // const getCoinFunction = async () => {
  //   const {ok, data, originalError} = await API.get(useCoinUrl);
  //   console.log({ahsdksfjdklsjfl: data?.data});
  //   if (ok) {
  //     // dispatch(UpdateProfile(data?.data));
  //     dispatch({type: types.UpdateProfile, payload: data.data});
  //   } else {
  //     errorMessage(originalError);
  //   }
  // };
  // const purchaseCoin = useCallback(async () => {
  //   const {ok, data} = await API.post(iosAppUrl, {
  //     token: receipt,
  //   });
  // }, [receipt]);
  // purchaseCoin();
  // useEffect(() => {
  //   const getCoinFunction = async () => {
  //     console.log({ahsdksfjdklsasdasdjfl: data?.data});
  //     if (ok) {
  //       // dispatch(UpdateProfile(data?.data));
  //       dispatch({type: types.UpdateProfile, payload: data.data});
  //     } else {
  //       errorMessage(originalError);
  //     }
  //   };
  //   getCoinFunction();
  //   return () => {
  //     console.log('backHeader');
  //     // getCoinFunction();
  //   };
  // }, []);

  useEffect(() => {
    const useCoin = async () => {
      const {ok, data, originalError} = await API.get(useCoinUrl);
      console.log({data, adfklajflj});
      if (ok) {
        dispatch({type: types.UpdateProfile, payload: data.data});
      }
    };
    useCoin();
  }, []);

  return {PackageDetailData, onPressEMail, onPressCall, navigationChatScreen};
};

export default useHeaderDetailScreen;
