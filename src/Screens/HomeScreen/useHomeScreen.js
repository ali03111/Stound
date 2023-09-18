import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
// import useReduxStore from '../../Hooks/useReduxStore';
// import {types} from '../../Redux/types';
import API from '../../Utils/helperFunc';
import {
  addQuesUrl,
  getAdsUrl,
  notifyUserUrl,
  searchAdsUrl,
  updateFavUrl,
} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import {types} from '../../Redux/types';
import {questionTrue, setAdId} from '../../Redux/Action/isQuestionAction copy';
import {store} from '../../Redux/Reducers';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';

const useHomeScreen = ({navigate, params, addListener}) => {
  //   const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const [showAlert, setShowAlert] = useState(false);
  const [homeData, setHomeData] = useState([]);
  const [text, onChangeText] = useState('');

  const [selectedId, setSelectedId] = useState({
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Just looking',
    value: 'Just looking',
  });

  const selectedIdRef = useRef({
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Just looking',
    value: 'Just looking',
  });

  var s = {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Just looking',
    value: 'Just looking',
  };

  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');
  const {isQuestion} = getState('isQuestion');
  const {isloading} = getState('isloading');
  const {notificationLength} = getState('notification');
  // const {notification} = store.getState('notification');

  console.log('notificasad1aasdtion', notificationLength);

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const askQuestion = async index => {
    console.log(homeData[index].adId, 'alkdjljrujvjvjvjvj');

    if (!userData.isAnswered) {
      dispatch(setAdId(homeData[index].adId));
      dispatch(questionTrue());
      // await API.put(notifyUserUrl + homeData[index].adId);
    } else {
      const response = await API.put(notifyUserUrl + homeData[index].adId);
      console.log(response, 'asfkljaklsdfjl');
      if (response.ok) {
        successMessage(response?.data.message);
      }
    }
  };

  const onConfirmPressed = async () => {
    setShowAlert(false);
    const {ok, data} = await API.post(addQuesUrl, {
      answer: selectedId.label,
    });
    if (ok) {
      dispatch({type: types.UpdateProfile, payload: data.data});
      navigate('PackageDetailsScreen', {items: homeData[currentIndex]});
    } else errorMessage(data.message);
  };

  const goToDetails = index => {
    navigate('PackageDetailsScreen', {items: homeData[index]});
  };

  const getHomeData = async () => {
    const {ok, data} = await API.get(getAdsUrl);
    if (ok) {
      dispatch({type: types.UpdateProfile, payload: data.user});
      setHomeData(data?.data);
    } else errorMessage(data.message || 'request failed');
  };

  const useEffectFun = () => {
    const event = addListener('focus', getHomeData);
    return event;
  };

  const updateFav = async index => {
    const url = updateFavUrl + homeData[index].adId;
    const {ok, originalError, data} = await API.put(url);
    if (ok) successMessage(data?.message);
    else {
      errorMessage(data.message || 'request failed');
    }
  };

  //Search Property Lists With Api
  const searchPropertyFunction = async text => {
    dispatch(loadingTrue());

    console.log(text, 'asldkfjklsdjfkl');
    const body = {
      text,
    };

    const {ok, data, originalError, status} = await API.post(
      searchAdsUrl,
      body,
    );
    console.log(data, status, 'Ads data History');
    onChangeText('');

    try {
      if (ok) {
        dispatch(loadingFalse());
        navigate('FilterPackageScreen', {items: data});
      }
    } catch (e) {
      dispatch(loadingFalse());

      console.log('dfdfa', originalError, data);
      errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
    }
  };

  const navigateToNotificationScreen = () => {
    navigate('NotificationScreen');
  };
  useEffect(useEffectFun, []);

  return {
    onBoardinData: homeData,
    onSnapToItem,
    currentIndex,
    getStart: () => {},
    goToDetails,
    homeData,
    onRefresh: getHomeData,
    updateFav,
    showAlert,
    setShowAlert,
    selectedId,
    setSelectedId,
    onConfirmPressed,
    selectedIdRef,
    s,
    setCurrentIndex,
    askQuestion,
    navigateToNotificationScreen,
    navigateToNotificationScreen,
    isloading,
    searchPropertyFunction,
    notificationLength,
    text,
    onChangeText,
    getHomeData,
  };
};

export default useHomeScreen;
