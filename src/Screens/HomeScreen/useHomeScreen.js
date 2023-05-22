import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import API from '../../Utils/helperFunc';
import {getAdsUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Config/NotificationMessage';

const useHomeScreen = ({navigate, params, addListener}) => {
  //   const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const [homeData, setHomeData] = useState([]);

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goToDetails = index =>
    navigate('PackageDetailsScreen', {items: homeData[index]});

  const getHomeData = async () => {
    const {ok, originalError, data} = await API.get(getAdsUrl);
    // console.log('sasd', ok, originalError, data);
    if (ok) setHomeData(data?.data);
    else errorMessage(originalError.message.split(' ').slice(1).join(' '));
  };

  const useEffectFun = () => {
    const event = addListener('focus', getHomeData);
    return event;
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
  };
};

export default useHomeScreen;
