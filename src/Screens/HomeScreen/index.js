import React, { memo, useCallback } from 'react';
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
import { styles } from './styles';
import { keyExtractor } from '../../Utils';
import { TextComponent } from '../../Components/TextComponent';
import HomeCard from '../../Components/HomeCard';
import {
  homeCard,
  notification,
  profile,
  radioEmtpy,
  radioFill,
  search,
  setting,
} from '../../Assests';

import * as Animatable from 'react-native-animatable';
import { InputComponent } from '../../Components/InputComponent';
// import {TextInput} from 'react-native-paper';
import { Touchable } from '../../Components/Touchable';
import Notification from '../../Components/Notification';
import Swiper from 'react-native-deck-swiper';
import { hp, wp } from '../../Config/responsive';
import SomeComponent from '../GestureScreenTest';
import { successMessage } from '../../Config/NotificationMessage';
import { homeCardData } from '../../Utils/localDB';
import { Colors } from '../../Theme/Variables';
import { imageUrl } from '../../Utils/Urls';
import AwesomeAlert from 'react-native-awesome-alerts';
import RadioGroup from 'react-native-radio-buttons-group';
import Overlay from '../../Components/Overlay';

const HomeScreen = ({ navigation }) => {
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
    navigateToNotificationScreen
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

  // const RadioButtonMap = useCallback(() => {
  //   return radioButtons.map(res => {
  //     return (
  //       <Touchable style={styles.radioView} onPress={() => (s = res)}>
  //         <TextComponent styles={styles.radioLabel} text={res.label} />
  //         <Image
  //           source={selectedIdRef.current.id == res.id ? radioFill : radioEmtpy}
  //         />
  //       </Touchable>
  //     );
  //   });
  // }, [s]);

  // const AlertView = useCallback(() => {
  //   return (
  //     <AwesomeAlert
  //       show={showAlert}
  //       showProgress={false}
  //       useNativeDriver={true}
  //       title="Are You!"
  //       closeOnTouchOutside={false}
  //       closeOnHardwareBackPress={false}
  //       showCancelButton={false}
  //       showConfirmButton={true}
  //       confirmText="Confirm"
  //       titleStyle={styles.alertTitle}
  //       actionContainerStyle={styles.actionViewStyle}
  //       customView={
  //         <View
  //           style={{
  //             width: wp('75'),
  //           }}>
  //           <RadioButtonMap />
  //         </View>
  //       }
  //       confirmButtonStyle={styles.confirmButtonStyle}
  //       confirmButtonTextStyle={{
  //         fontWeight: 'bold',
  //       }}
  //       onConfirmPressed={onConfirmPressed}
  //     />
  //   );
  // }, [showAlert]);

  return (
    <>
      <View style={{ paddingTop: Platform.OS == 'ios' ? hp('3') : hp('0') }}>
        <View style={styles.searchBarMain}>
          <View style={styles.searchMain}>
            <Image style={styles.search} source={search} />
            <TextInput
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
            <Touchable onPress={() => navigateToNotificationScreen()} style={styles.rightIcon}>
              <Image source={notification} style={styles.notification} />
            </Touchable>
          </View>
        </View>
        <View style={styles.cardMainView}>
          {onBoardinData.length > 0 && (
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
                successMessage('You like this property');
              }}
              onSwipedTop={ca => {
                console.log('callllllll', ca);
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
        </View>
        {/* {showAlert && <AlertView />} */}
      </View>
      {/* <AlertView /> */}
    </>
  );
};

export default memo(HomeScreen);
