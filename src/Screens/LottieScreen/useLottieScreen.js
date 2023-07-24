import {useEffect, useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {types} from '../../Redux/types';

const useLottieScreen = ({navigate}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const {dispatch} = useReduxStore();
  const [index, setIndex] = useState(0);

  const swipeCard = i => {
    setIndex(i);
  };

  const goNext = () => {
    setCurrentIndex(pre => pre + 1);
  };

  const goEnd = () => {
    console.log('zSdas');
    dispatch({type: types.lottieTutorialFinished});
  };

  return {
    swipeCard,
    goNext,
    index,
    goEnd,
  };
};

export default useLottieScreen;
