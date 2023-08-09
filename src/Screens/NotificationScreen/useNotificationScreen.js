// import useNotificationScreen from '.';
import {useEffect, useRef, useState} from 'react';
import {notificationData} from '../../Utils/localDB';
import {getAllNotificationUrl} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import {setNotificationLength} from '../../Redux/Action/recentNotification';
import {types} from '../../Redux/types';

const useNotificationScreen = ({navigate, addListener}) => {
  const isSub = useRef(null);
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');
  console.log({Usersatasad: userData?.isSubscribed});
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
    // navigate('Subscriptions', {items: notificationDataState[currentIndex]});
    userData?.isSubscribed &&
      navigate('HeaderDetailScreen', notificationDataState[currentIndex]);
    isSub.current = false;
  };

  const onCancel = (state, stateName, index) => {
    isSub.current = true;
    userData?.isSubscribed
      ? updateState({[stateName]: !state, currentIndex: index})
      : navigate('BuyCoinScreen', {
          items: notificationDataState[currentIndex],
          isSub,
        });
  };

  // console.log(notificationDataState[0].userDetail, 'Data');
  const getAllNotificationFunc = async () => {
    const {ok, data} = await API.get(getAllNotificationUrl);
    if (ok) {
      updateState({notificationDataState: data.data.notifications?.reverse()});
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

  //State Clear in length in Redux
  useEffect(() => {
    return () => dispatch({type: types.cleanNotification});
  }, []);

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
