import {useCallback, useEffect, useState} from 'react';
import {PackageDetailData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {notifyUserUrl, updateFavUrl} from '../../Utils/Urls';
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
      description,
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
      // successMessage('You like this property');
      const response = await API.put(notifyUserUrl + adId);
      console.log(response, 'asfkljaklsdfjl');
      if (response.ok) {
        successMessage(response?.data.message);
      }
    }
  };

  const [isFav, setIsFav] = useState(!params.items?.isFavourite ?? false);
  const onFavouriteFunction = useCallback(async () => {
    const url = updateFavUrl + adId;
    const {ok, data} = await API.put(url);

    if (ok) {
      setIsFav(!isFav);
      successMessage(data?.message);
    } else errorMessage(originalError.message.split(' ').slice(1).join(' '));
  }, [isFav]);

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
    description,
    onFavouriteFunction,
    isFav,
  };
};

export default usePackageDetailsScreen;
