import React, {memo, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import useTutorialScreen from './useTutorialScreen';
import {keyExtractor} from '../../Utils';
import {hp, wp} from '../../Config/responsive';
import {TextComponent} from '../../Components/TextComponent';
import ShareButton from '../../Components/ShareButton';
import {styles} from './styles';
import {Colors} from '../../Theme/Variables';

const TutorialScreen = ({navigation}) => {
  const {
    onBoardinData,
    currentIndex,
    onSnapToItem,
    getStart,
    flatListRef,
    handleNext,
  } = useTutorialScreen(navigation);

  console.log(currentIndex, 'sdfkjaslkdfjlaksdj');
  const renderItem = useCallback(
    ({item, index}) => {
      {
        console.log('alsdkjfkladsjflkadjs', item);
      }
      return (
        <View
          key={index}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            // flexDirection: 'row',
            paddingBottom: 0,
          }}>
          <View style={styles.centerMainView}>
            <Image
              style={styles.bannerImg}
              // resizeMode="contain"
              source={item?.image}
            />
            <Text style={{color: 'rgba(41, 45, 50, 0.5)'}}>
              {item?.heading}
            </Text>
            <Image
              style={styles.gestureImg}
              resizeMode="contain"
              source={item?.handgesture}
            />
            {/* <TextComponent
              numberOfLines={2}
              text={item?.heading}
              styles={styles.centerHeading}
            /> */}
          </View>
        </View>
      );
    },
    [currentIndex],
  );

  const renderItemDots = useCallback(
    ({index}) => <View style={styles.dot(currentIndex, index)} />,
    [currentIndex],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: hp('3'),
          paddingHorizontal: wp('2'),
        }}>
        <ShareButton
          title={'Skip'}
          style={{
            ...styles.getStart,
            backgroundColor: Colors.borderWidth,
          }}
          textStyle={{
            color: 'black',
            marginLeft: wp('-0.5'),
          }}
          onPress={getStart}
        />
        {currentIndex === 2 ? (
          <ShareButton
            title={'Done'}
            style={styles.getStart}
            onPress={getStart}
            textStyle={{
              marginLeft: wp('-0.1'),
            }}
          />
        ) : (
          <ShareButton
            title={'Next'}
            style={styles.getStart}
            onPress={handleNext}
            textStyle={{
              marginLeft: wp('-0.1'),
            }}
          />
        )}
      </View>
      <FlatList
        ref={flatListRef}
        data={onBoardinData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        onMomentumScrollEnd={onSnapToItem}
      />

      {/* <FlatList
        data={onBoardinData} // Use the same data for the dots
        renderItem={renderItemDots}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dotList}
        style={{alignSelf: 'center', marginTop: 10}}
      /> */}

      {}
    </View>
  );
};

export default memo(TutorialScreen);
