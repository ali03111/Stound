import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
// import useReduxStore from '../../Hooks/useReduxStore';
// import {types} from '../../Redux/types';
import {onBoardinData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';

const useHomeScreen = ({navigate, params}) => {
  //   const {dispatch} = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = Dimensions.get('window').width;

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goToDetails = () => navigate('PackageDetailsScreen');

  const getStart = () => {
    console.log('check');
    // dispatch({
    //   type: types.onBoardFinished,
    // });
  };

  useEffect(async () => {
    const {ok, data} = await API.get('https://dummyjson.com/products/1');
    console.log('ok');
  }, []);

  return {
    onBoardinData,
    onSnapToItem,
    currentIndex,
    getStart,
    goToDetails,
  };
};

export default useHomeScreen;
