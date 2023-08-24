import { Alert, Linking } from 'react-native';
import Schemas from '../../Utils/Validation';
import { useCallback } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');


const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

const useRatingScreen = ({navigate, goBack}) => {
  const {getState}=useReduxStore();
  const {userData}=getState('Auth')

  const openStore = useCallback(() => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `market://details?id=${GOOGLE_PACKAGE_NAME}`,
      ).catch(
          (err) =>Alert.alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => Alert.alert('Please check for the App Store'));
    }
  },[]);
  return {
    goBack,
    openStore,
    userData
  };
};

export default useRatingScreen;
