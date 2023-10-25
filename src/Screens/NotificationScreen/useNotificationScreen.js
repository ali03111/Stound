// import useNotificationScreen from '.';
import {useEffect, useRef, useState} from 'react';
import {notificationData} from '../../Utils/localDB';
import {getAllNotificationUrl} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import {setNotificationLength} from '../../Redux/Action/recentNotification';
import {types} from '../../Redux/types';

const useNotificationScreen = ({navigate, addListener}) => {
  const isSub = useRef(true);
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
    console.log('onConfirmalsdfjlaksdjfkl');

    updateState({coinAlert: false});
    // navigate('HeaderDetailScreen', notificationDataState[currentIndex]);
    navigate('HeaderDetailScreen', notificationDataState[currentIndex]);

    isSub.current = false;
  };

  const onCancel = (state, stateName, index, item) => {
    console.log(isSub.current, 'onCancelalsdfjlaksdjfkl');

    if (item?.coinUsed) {
      // If coin is used, navigate directly to the detail screen.
      navigate('HeaderDetailScreen', notificationDataState[index]);
    } else if (userData?.isSubscribed) {
      // If the user is subscribed, set the state and navigate to the detail screen.
      updateState({[stateName]: !state, currentIndex: index});
      navigate('HeaderDetailScreen', notificationDataState[index]);
    } else {
      // If the user is not subscribed, navigate to the BuyCoinScreen and pass isSub.
      navigate('BuyCoinScreen', {
        items: notificationDataState[index],
        isSub,
      });
    }
    console.log(isSub, 'onCancelalsdfjlaksaadjfkl');
  };

  // console.log(notificationDataState[0].userDetail, 'Data');
  const getAllNotificationFunc = async () => {
    const {ok, data} = await API.get(getAllNotificationUrl);
    if (ok) {
      updateState({notificationDataState: data.data.notifications?.reverse()});
      console.log('asdfkljaklsdfjlaksjdflkajsdfklj', data.data.notifications);
    }
    setTimeout(() => {
      setIsNotification(true);
    }, 1000 / 2.2);
  };

  const useEffectFun = () => {
    console.log('ArraksjklArrow');

    const event = addListener('focus', getAllNotificationFunc);
    return event;
  };
  useEffect(
    useEffectFun,
    () => {
      console.log('backArrow');
    },
    [],
  );

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
