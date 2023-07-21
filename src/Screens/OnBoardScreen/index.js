import React, {memo, useCallback} from 'react';
import {View, FlatList, Dimensions, Image, ScrollView} from 'react-native';
import useOnboardScreen from './useOnboardScreen';
import {styles} from './styles';
import {keyExtractor} from '../../Utils';
// import Lottie from 'lottie-react-native';
import {hp} from '../../Config/responsive';
import {TextComponent} from '../../Components/TextComponent';
import * as Animatable from 'react-native-animatable';
import ShareButton from '../../Components/ShareButton';

const OnboardScreen = ({navigation}) => {
  const {onBoardinData, currentIndex, onSnapToItem, getStart, goNext} =
    useOnboardScreen(navigation);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        currentIndex == index && (
          <View style={styles.centerMainView}>
            <Image
              style={styles.bannerImg}
              // resizeMode="contain"
              source={item?.image}
            />
            <TextComponent
              numberOfLines={2}
              text={item?.heading}
              styles={styles.centerHeading}
            />
          </View>
        )
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white', flex: 1, paddingBottom: hp('10')}}>
      <FlatList
        refreshing={false}
        data={onBoardinData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        onMomentumScrollEnd={onSnapToItem}
        keyExtractor={keyExtractor}
        pagingEnabled={true}
        contentContainerStyle={{
          flexDirection: 'row',
          paddingBottom: 0,
        }}
        style={{paddingBottom: 0}}
      />
      <FlatList
        refreshing={false}
        data={[0, 1, 2]}
        renderItem={renderItemDots}
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.dotList}
        style={{alignSelf: 'center'}}
      />
      {currentIndex == 2 ? (
        // <Animatable.View animation={'bounceIn'}>
        <ShareButton
          title={'Get Start'}
          style={styles.getStart}
          onPress={getStart}
        />
      ) : (
        // </Animatable.View>
        <ShareButton title={'Next'} style={styles.getStart} onPress={goNext} />
      )}
    </ScrollView>
  );
};

export default memo(OnboardScreen);
