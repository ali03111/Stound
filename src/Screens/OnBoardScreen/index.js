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
  const {onBoardinData, currentIndex, onSnapToItem, getStart} =
    useOnboardScreen(navigation);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View style={styles.centerMainView}>
          <Image
            style={styles.bannerImg}
            resizeMode="contain"
            source={item?.image}
          />
          <TextComponent text={item?.heading} styles={styles.centerHeading} />
          {/* <TextComponent text={item?.description} styles={styles.centerDes} /> */}
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
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View>
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
            // height: 'auto',
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
          <ShareButton
            title={'Next'}
            style={styles.getStart}
            // onPress={Continue}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default memo(OnboardScreen);
