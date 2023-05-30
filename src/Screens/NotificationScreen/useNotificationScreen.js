// import useNotificationScreen from '.';
import { useState } from 'react';
import { notificationData } from '../../Utils/localDB';

const useNotificationScreen = ({ navigate }) => {

  const [alerState, setAlertState] = useState({
    logOut: false,
    coinAlert: false,
  });

  const { coinAlert, logOut } = alerState;

  const updateState = data => setAlertState(() => ({ ...alerState, ...data }));

  const onConfirm = () => {
    updateState({ coinAlert: false });
    navigate('BuyCoinScreen')
  };

  const onCancel = (state, stateName) => {
    updateState({ [stateName]: !state });
  };
  return { notificationData, onConfirm, onCancel, coinAlert, logOut };
};
export default useNotificationScreen;
