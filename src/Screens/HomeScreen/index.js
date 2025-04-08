import React, {memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import useHomeScreen from './useHomeScreen';
import {styles} from './styles';
import {keyExtractor} from '../../Utils';
import {TextComponent} from '../../Components/TextComponent';
import HomeCard from '../../Components/HomeCard';
import {
  homeCard,
  notification,
  showNotification,
  profile,
  radioEmtpy,
  radioFill,
  search,
  setting,
  setting1,
  trendingOutline,
  trending as notTrending,
  filterFilled,
} from '../../Assets';

import * as Animatable from 'react-native-animatable';
import {Touchable} from '../../Components/Touchable';
import Swiper from 'react-native-deck-swiper';
import {hp, wp} from '../../Config/responsive';
import {successMessage} from '../../Config/NotificationMessage';
import {Colors} from '../../Theme/Variables';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const HomeScreen = ({navigation}) => {
  const {
    onBoardinData,
    currentIndex,
    onSnapToItem,
    getStart,
    goToDetails,
    homeData,
    onRefresh,
    updateFav,
    setShowAlert,
    showAlert,
    selectedId,
    setSelectedId,
    onConfirmPressed,
    selectedIdRef,
    setCurrentIndex,
    s,
    askQuestion,
    isloading,
    navigateToNotificationScreen,
    searchPropertyFunction,
    notificationLength,
    text,
    onChangeText,
    getHomeData,
    trending,
    toggleTrending,
    setTrending,
    updateAccordingToFilter,
    setIsFilter,
    isFilter,
    setShowEndMessage,
    showEndMessage,
  } = useHomeScreen(navigation);

  const handleSwipedAll = useCallback(() => {
    setShowEndMessage(true);
    // onRefresh();
    // // Hide the message after 3 seconds
    // setTimeout(() => setShowEndMessage(false), 3000);
  }, []);

  // console.log('cccc',onBoardinData);
  const renderItem = useCallback(item => {
    const formattedPrice = item?.price?.toLocaleString();
    console.log(item, 'AdType');
    return (
      <HomeCard
        userName={`${item?.userDetail?.name}`}
        image={imageUrl(item?.photos[0])}
        profile={imageUrl(item?.userDetail?.profilePicture)}
        bath={`${item?.bathrooms} Baths`}
        Beds={`${item?.rooms} Rooms`}
        locationText={`${item?.location}`}
        forRent={`${item?.category} For ${item?.adType}`}
        price={`$${formattedPrice}`}
        duration={item?.adType?.toLowerCase() == 'rent' && 'month'}
      />
    );
  }, []);

  return (
    <>
      <View style={{paddingTop: Platform.OS == 'ios' ? hp('3') : hp('0')}}>
        <View style={styles.searchBarMain}>
          <View style={styles.searchIcons}>
            <Touchable onPress={toggleTrending}>
              <Image
                source={!trending ? trendingOutline : notTrending}
                style={{...styles.rightIcon, left: wp('-3')}}
                // resizeMode="contain"
              />
            </Touchable>
          </View>
          <TextComponent
            numberOfLines={1}
            text={'Stound'}
            styles={styles.HeaderTitle}
          />
          <View style={styles.searchIcons}>
            <Touchable
              onPress={() => {
                navigation.navigate('FilterScreen', {
                  updateFuntion: updateAccordingToFilter,
                });
                setIsFilter(true);
              }}
              // style={styles.rightIcon}
            >
              {/* <Image source={setting} style={styles.setting} /> */}
              <Image
                source={isFilter ? filterFilled : setting1}
                style={{...styles.rightIcon, right: wp('-3')}}
                resizeMode="contain"
              />
            </Touchable>
            {/* {notificationLength.length > 0 ? (
              <Touchable
                onPress={() => navigateToNotificationScreen()}
                style={styles.rightIcon}>
                <View
                  style={{
                    position: 'absolute',
                    top: 1,
                    right: 10,
                    backgroundColor: 'red',
                    borderRadius: 50,
                  }}></View>
                <Image source={showNotification} style={styles.setting} />
              </Touchable>
            ) : (
              <Touchable
                onPress={() => navigateToNotificationScreen()}
                style={styles.rightIcon}>
                <View
                  style={{
                    position: 'absolute',
                    top: 1,
                    right: 10,
                    backgroundColor: 'red',
                    borderRadius: 50,
                  }}></View>
                <Image source={notification} style={styles.setting} />
              </Touchable>
            )} */}
          </View>
        </View>
        <View style={styles.cardMainView}>
          {onBoardinData?.length > 0 ? (
            <>
              {!showEndMessage && (
                <Swiper
                  cards={onBoardinData}
                  useViewOverflow={true}
                  cardVerticalMargin={0}
                  cardHorizontalMargin={0}
                  marginBottom={0}
                  // infinite={true}
                  onSwipedAll={handleSwipedAll}
                  renderCard={renderItem}
                  onSwipedLeft={ca => {
                    // successMessage('You cancel this property');
                  }}
                  onSwipedRight={ca => {
                    askQuestion(ca);
                  }}
                  onSwipedTop={ca => {
                    setCurrentIndex(ca);
                    goToDetails(ca);
                  }}
                  onSwipedBottom={ca => {
                    updateFav(ca);
                  }}
                  cardIndex={0}
                  containerStyle={{
                    backgroundColor: 'transparent',
                  }}
                  stackSize={2}
                />
              )}
              {showEndMessage && (
                <TextComponent
                  text={
                    'No more cards to swipe! Pull to refresh or check back later.'
                  }
                  adjustsFontSizeToFit={false}
                  styles={styles.endMessageText}
                  numberOfLines={3}
                />
              )}
            </>
          ) : (
            !isloading &&
            onBoardinData?.length == 0 && (
              <View
                style={{
                  marginTop: hp('40'),
                }}>
                <EmptyViewComp onRefresh={getHomeData} />
              </View>
            )
          )}
        </View>
      </View>
    </>
  );
};

export default memo(HomeScreen);
