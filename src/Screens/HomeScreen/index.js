import React, {memo, useCallback} from 'react';
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
} from '../../Assests';

import * as Animatable from 'react-native-animatable';
import {Touchable} from '../../Components/Touchable';
import Swiper from 'react-native-deck-swiper';
import {hp, wp} from '../../Config/responsive';
import {successMessage} from '../../Config/NotificationMessage';
import {Colors} from '../../Theme/Variables';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const HomeScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');

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
  } = useHomeScreen(navigation);

  // console.log('cccc',onBoardinData);
  const renderItem = useCallback(item => {
    return (
      <HomeCard
        userName={`${item?.userDetail?.name}`}
        image={imageUrl(item.photos[0])}
        profile={imageUrl(item.userDetail.profilePicture)}
        bath={`${item?.bathrooms} Baths`}
        Beds={`${item?.rooms} Rooms`}
        locationText={`${item?.location}`}
        forRent={`For ${item?.adType}`}
        price={`$ ${item?.price}`}
        duration={'month'}
      />
    );
  }, []);

  return (
    <>
      <View style={{paddingTop: Platform.OS == 'ios' ? hp('3') : hp('0')}}>
        <View style={styles.searchBarMain}>
          <View style={styles.searchMain}>
            <Image style={styles.search} source={search} />
            <TextInput
              onSubmitEditing={() => searchPropertyFunction(text)}
              style={styles.searchinput}
              onChangeText={onChangeText}
              value={text}
              placeholder={'Search property here...'}
              placeholderTextColor={Colors.gray}
            />
          </View>
          <View style={styles.searchIcons}>
            <Touchable
              onPress={() => navigation.navigate('FilterScreen')}
              style={styles.rightIcon}>
              <Image source={setting} style={styles.setting} />
            </Touchable>
            {notificationLength.length > 0 ? (
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
                <Image source={showNotification} style={styles.notification} />
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
                <Image source={notification} style={styles.notification} />
              </Touchable>
            )}
          </View>
        </View>
        <View style={styles.cardMainView}>
          {onBoardinData?.length > 0 ? (
            <Swiper
              cards={onBoardinData}
              useViewOverflow={true}
              cardVerticalMargin={0}
              cardHorizontalMargin={0}
              marginBottom={0}
              infinite={true}
              onSwipedAll={e => onRefresh()}
              renderCard={renderItem}
              onSwipedLeft={ca => {
                successMessage('You cancel this property');
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
          ) : (
            !isloading &&
            onBoardinData?.length == 0 && (
              <View
                style={{
                  marginTop: hp('40'),
                }}>
                <EmptyViewComp onRefresh={onRefresh} />
              </View>
            )
          )}
        </View>
      </View>
    </>
  );
};

export default memo(HomeScreen);
