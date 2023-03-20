import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import useHomeScreen from './useHomeScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import HomeCard from '../../Components/HomeCard';
import {homeCard, profile} from '../../Assests';

const OnboardScreen = ({navigation}) => {
  const {onBoardinData, currentIndex, onSnapToItem, getStart} =
    useHomeScreen(navigation);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View style={styles.centerMainView}>
          <TextComponent text={item?.heading} styles={styles.centerHeading} />
          <TextComponent text={item?.description} styles={styles.centerDes} />
        </View>
      );
    },
    [currentIndex],
  );
  const renderItemDots = useCallback(
    ({item, index}) => {
      return <View style={styles.dot(currentIndex, index)} />;
    },
    [currentIndex],
  );
  return (
    <View style={{alignItems: 'center'}}>
      <HomeCard
        userName={'test'}
        image={homeCard}
        profile={profile}
        bath={'3 Baths'}
        Beds={'4 Beds'}
        locationText={'1050 Old Nichols Rd Islandia, NY 11749'}
        forRent={'For Rent'}
        price={'$1500'}
        duration={'month'}
      />
    </View>
  );
};

export default memo(OnboardScreen);
