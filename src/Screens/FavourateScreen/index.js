import React, {memo, useCallback} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {keyExtractor} from '../../Utils';
import {TextComponent} from '../../Components/TextComponent';
import * as Animatable from 'react-native-animatable';
import ShareButton from '../../Components/ShareButton';

const OnboardScreen = ({navigation}) => {
  const {onBoardinData, currentIndex, onSnapToItem, getStart} =
    useFavourateScreen(navigation);
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
      {/* <Lottie
        source={cookingWomen}
        autoPlay
        loop
        style={styles.womenLottie}
        resizeMode="contain"
      />
      <View style={styles.appHeadingView}>
        <TextComponent text={'VegaFast'} styles={styles.redColorText} />
        <TextComponent
          text={'Food'}
          styles={{fontSize: hp('4'), fontWeight: 'bold'}}
        />
      </View>
      <TextComponent
        text={'+92 3432375525 Call Now'}
        styles={{fontWeight: 'bold'}}
      /> */}

      <FlatList
        refreshing={false}
        data={onBoardinData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
        onMomentumScrollEnd={onSnapToItem}
        keyExtractor={keyExtractor}
        pagingEnabled={true}
        contentContainerStyle={{flexDirection: 'row'}}
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
      />
      {currentIndex == 2 && (
        <Animatable.View animation={'bounceIn'}>
          <ShareButton
            title={'Get Start'}
            style={styles.getStart}
            // onPress={getStart}
          />
        </Animatable.View>
      )}
    </View>
  );
};

export default memo(OnboardScreen);
