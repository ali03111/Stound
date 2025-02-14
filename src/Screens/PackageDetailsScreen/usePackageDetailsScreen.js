import {useCallback, useEffect, useState} from 'react';
import {PackageDetailData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {clickAdsUrl, notifyUserUrl, updateFavUrl} from '../../Utils/Urls';
import {questionTrue} from '../../Redux/Action/isQuestionAction copy';
import useReduxStore from '../../Hooks/UseReduxStore';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';

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
      bathrooms,
      areaSize,
      rooms,
      photos,
      location,
      adType,
      adId,
      userDetail: {agoraId},
      description,
      preferences,
    },
  } = params;
  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');
  const useEffectFun = async () => {
    const {ok, data} = await API.put(notifyUserUrl + params.items.adId);
  };
  console.log(userDetail, Index, 'aaa');

  console.log(generalPref, preferences, 'aklsdfjklajsdlfkajsdfl');
  // useEffect(useEffectFun, []);

  const navigationChatScreen = () => {
    navigate('MessagesScreen', {id: agoraId, userDetail});
  };

  const askQuestion = async index => {
    try {
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
    } catch (error) {
      console.log('rkjekjekErrror ', error?.message);
      errorMessage(error?.message);
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

  const clickAddData = async () => {
    try {
      const {ok, data} = await API.get(clickAdsUrl + params?.items?.adId);
      console.log('data success', data);
      if (ok) {
        // dispatch({type: types.UpdateProfile, payload: data.user});
      } else errorMessage(data.message || 'request failed');
    } catch (error) {
      console.log('erro2123r1111', error);
    }
  };

  useEffect(() => {
    clickAddData();
  }, [params]);

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
    preferences,
    bathrooms,
    areaSize,
    rooms,
  };
};

export default usePackageDetailsScreen;
