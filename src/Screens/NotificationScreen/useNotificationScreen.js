// import useNotificationScreen from '.';
import {useEffect, useState} from 'react';
import {notificationData} from '../../Utils/localDB';
import {getAllNotificationUrl} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useNotificationScreen = ({navigate, addListener}) => {
  const [alerState, setAlertState] = useState({
    logOut: false,
    coinAlert: false,
    notificationDataState: [],
    currentIndex: 0,
  });
  const [isNotification, setIsNotification] = useState(false);

  const {coinAlert, logOut, notificationDataState, currentIndex} = alerState;

  const updateState = data => setAlertState(() => ({...alerState, ...data}));

  const onConfirm = () => {
    updateState({coinAlert: false});
    navigate('BuyCoinScreen', {items: notificationDataState[currentIndex]});
  };

  const onCancel = (state, stateName, index) => {
    updateState({[stateName]: !state, currentIndex: index});
  };

  // console.log(notificationDataState[0].userDetail, 'Data');
  const getAllNotificationFunc = async () => {
    const {ok, data} = await API.get(getAllNotificationUrl);
    console.log(data, 'akjsdlkajsdlkajsdkl');
    if (ok) {
      updateState({notificationDataState: data.data.notifications});
    }
    setTimeout(() => {
      setIsNotification(true);
    }, 1000 / 2.2);
  };

  const useEffectFun = () => {
    const event = addListener('focus', getAllNotificationFunc);
    return event;
  };
  useEffect(useEffectFun, []);

  // Navigate to Message Screen

  // const navigationChatScreen = () => {
  //   navigate('MessagesScreen', {id: agoraId, userDetail});
  //   // navigate('MessagesScreen', {id: users[0]?.userId, userDetail: users[0]});
  // };

  return {
    notificationData,
    onConfirm,
    onCancel,
    coinAlert,
    logOut,
    notificationDataState,
    getAllNotificationFunc,
    isNotification,
  };
};
export default useNotificationScreen;
