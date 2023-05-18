import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
// import useReduxStore from '../../Hooks/useReduxStore';
// import {types} from '../../Redux/types';
import API from '../../Utils/helperFunc';
import {getAdsUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Config/NotificationMessage';
import {onBoardinData} from '../../Utils/localDB';

const useHomeScreen = ({navigate, params}) => {
  //   const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const [homeData, setHomeData] = useState([]);

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goToDetails = (index) => navigate('PackageDetailsScreen',{items:homeData[index]});

  const getHomeData = async () => {
    const {ok, data, originalError} = await API.get(getAdsUrl);
    if (ok) setHomeData(data?.data);
    else errorMessage(originalError);
  };

  const useEffectFun = () => {
    getHomeData();
  };
  useEffect(useEffectFun, []);

  return {
    onBoardinData:homeData,
    onSnapToItem,
    currentIndex,
    getStart: () => {},
    goToDetails,
    homeData,
  };
};

export default useHomeScreen;
