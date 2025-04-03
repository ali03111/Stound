// import useNotificationScreen from '.';
import {msgs} from '../../Utils/localDB';
import useReduxStore from '../../Hooks/UseReduxStore';
import {getSingleAdUrl} from '../../Utils/Urls';
import {useEffect, useState} from 'react';
import {errorMessage} from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';
import {Platform} from 'react-native';

const useMessagesScreen = ({params}) => {
  const isIOS = Boolean(Platform.OS == 'ios');

  console.log('paramsparamsparamsparamsparamsparamsparams', params);

  const {getState} = useReduxStore();
  const {userData} = getState('Auth');

  return {msgs, userData, isIOS};
};
export default useMessagesScreen;
