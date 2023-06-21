import {useEffect} from 'react';
import {PackageDetailData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {notifyUserUrl} from '../../Utils/Urls';
import {questionTrue} from '../../Redux/Action/isQuestionAction copy';
import useReduxStore from '../../Hooks/UseReduxStore';
import {successMessage} from '../../Config/NotificationMessage';

const usePackageDetailsScreen = ({params}, {navigate}) => {
  const {
    Index,
    items: {
      userDetail,
      outsidePref,
      price,
      insidePref,
      generalPref,
      title,
      photos,
      location,
      adType,
      adId,
      userDetail: {agoraId},
    },
  } = params;
  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');
  const useEffectFun = async () => {
    const {ok, data} = await API.put(notifyUserUrl + params.items.adId);
  };
  console.log(userDetail, Index, 'aaa');

  // useEffect(useEffectFun, []);

  const navigationChatScreen = () => {
    navigate('MessagesScreen', {id: agoraId, userDetail});
    // navigate('MessagesScreen', {id: users[0]?.userId, userDetail: users[0]});
  };

  const askQuestion = async index => {
    if (!userData.isAnswered) {
      dispatch(questionTrue());
      // await API.put(notifyUserUrl + homeData[index].adId);
    } else {
      successMessage('You like this property');
      await API.put(notifyUserUrl + adId);
    }
  };
  return {
    PackageDetailData,
    userDetail,
    outsidePref,
    price,
    insidePref,
    generalPref,
    title,
    photos,
    location,
    adType,
    navigationChatScreen,
    askQuestion,
  };
};

export default usePackageDetailsScreen;
