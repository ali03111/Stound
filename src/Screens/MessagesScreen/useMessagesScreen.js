// import useNotificationScreen from '.';
import {msgs} from '../../Utils/localDB';
import useReduxStore from '../../Hooks/UseReduxStore';

const useMessagesScreen = () => {
  const isIOS = Boolean(Platform.OS == 'ios');

  const {getState} = useReduxStore();
  const {userData} = getState('Auth');
  console.log(userData, '1j1j1j1j');
  return {msgs, userData, isIOS};
};
export default useMessagesScreen;
