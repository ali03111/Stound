// import useNotificationScreen from '.';
import {ChatData} from '../../Utils/localDB';

const useChatScreen = ({navigate, goBack}) => {
  const navigateToMsg = () => navigate('MessagesScreen');
  return {ChatData, navigateToMsg};
};
export default useChatScreen;
