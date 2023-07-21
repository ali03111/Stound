import {useEffect, useState} from 'react';

const useLottieScreen = ({navigate}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [swipeRight, setSwipeRight] = useState(true);
  const [swipeleft, setSwipeLeft] = useState(true);
  const [swipeUp, setSwipeUp] = useState(true);
  const [swipeDown, setSwipeDown] = useState(true);

  const swipeCard = (swipeRight, swipeLeft, swipeUp, swipeDown) => {
    setSwipeRight(swipeRight);
    setSwipeLeft(swipeLeft);
    setSwipeUp(swipeUp);
    setSwipeDown(swipeDown);
  };

  const goNext = () => {
    setCurrentIndex(pre => pre + 1);
  };

  return {
    swipeCard,
    swipeRight,
    swipeleft,
    swipeUp,
    swipeDown,
    goNext,
  };
};

export default useLottieScreen;
