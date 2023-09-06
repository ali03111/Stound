import { useRef, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { types } from '../../Redux/types';
import { onBoardinData } from '../../Utils/localDB';
import { Dimensions, Platform } from 'react-native';

const useOnboardingScreen = () => {
  const { dispatch } = useReduxStore();
  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onSnapToItem = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
    console.log(    newIndex,'aaaaaaaaaaaaa',contentOffsetX      )
    setCurrentIndex(newIndex);
  };



  const handleNext = () => {
    if(Platform.OS == 'android'){
      setCurrentIndex(prev=>prev+1);
      flatListRef.current.scrollToIndex({ index: currentIndex+1});
    }
    else{
      flatListRef.current.scrollToIndex({ index: currentIndex+1});
    }
  };
  const getStart = () => {
    dispatch({
      type: types.onBoardFinished,
    });
  };

  return {
    onBoardinData,
    currentIndex,
    onSnapToItem,
    getStart,
    flatListRef,
    handleNext
  };
};

export default useOnboardingScreen;