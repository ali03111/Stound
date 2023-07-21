// import useNotificationScreen from '.';
import {msgs} from '../../Utils/localDB';
import useReduxStore from '../../Hooks/UseReduxStore';

const useMessagesScreen = () => {
  const {getState} = useReduxStore();
  const {userData} = getState('Auth');
  console.log(userData, '1j1j1j1j');
  return {msgs, userData};
};
export default useMessagesScreen;
