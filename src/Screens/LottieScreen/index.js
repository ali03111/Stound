import React, {memo, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import Lottie from 'lottie-react-native';
import {InitialScreen1, up} from '../../Assests';
import {styles} from '../LottieScreen/styles';
import {TextComponent} from '../../Components/TextComponent';
import Swiper from 'react-native-deck-swiper';
import {InitialData} from '../../Utils/localDB';
import useLottieScreen from './useLottieScreen';

const LottieScreen = ({navigation}) => {
  const {swipeCard, index, goNext, goEnd} = useLottieScreen(navigation);

  const renderItem = useCallback((item, index) => {
    swipeCard(index);
    return (
      <View style={styles.lottieContainer}>
        <Image source={item.image} />
        <TextComponent text={item.text} styles={styles.textStyle} />
        <Lottie source={item.lottie} autoPlay loop style={styles.upLottie} />
      </View>
    );
  }, []);

  return (
    <View>
      <Swiper
        cards={InitialData}
        useViewOverflow={true}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        marginBottom={0}
        infinite={true}
        renderCard={renderItem}
        disableRightSwipe={InitialData[index].swipeRight}
        disableLeftSwipe={InitialData[index].swipeLeft}
        disableBottomSwipe={InitialData[index].swipeDown}
        disableTopSwipe={InitialData[index].swipeUp}
        cardIndex={0}
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        stackSize={1}
        onSwipedTop={goEnd}
      />
    </View>
  );
};

export default memo(LottieScreen);
