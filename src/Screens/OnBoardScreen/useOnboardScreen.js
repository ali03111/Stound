// import {useState} from 'react';
// import {Dimensions} from 'react-native';
// import useReduxStore from '../../Hooks/UseReduxStore';
// import {types} from '../../Redux/types';
// import {onBoardinData} from '../../Utils/localDB';

// const useOnboardingScreen = ({navigate, params}) => {
//   const {dispatch} = useReduxStore();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const width = Dimensions.get('window').width;

//   const onSnapToItem = e => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentIndex(currentIndex);
//     console.log(e,currentIndex, 'alkfjklasjdfkl');
//   };

//   const goNext = () => {
//     setCurrentIndex(prevIndex => prevIndex + 1);
//   };

//   const getStart = () => {
//     dispatch({
//       type: types.onBoardFinished,
//     });
//   };
//   return {
//     onBoardinData,
//     onSnapToItem,
//     currentIndex,
//     getStart,
//     goNext,
//   };
// };

// export default useOnboardingScreen;


import { useRef, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { types } from '../../Redux/types';
import { onBoardinData } from '../../Utils/localDB';
import { Dimensions } from 'react-native';

const useOnboardingScreen = () => {
  const { dispatch } = useReduxStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSnapToItem = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
    setCurrentIndex(newIndex);
  };



  const flatListRef = useRef(null);
  const handleNext = () => {
 
      flatListRef.current.scrollToIndex({ index: currentIndex+1});
    
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
