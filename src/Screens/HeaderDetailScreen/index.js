import React, {memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {hp} from '../../Config/responsive';
import {goBack, keyExtractor} from '../../Utils';
import {styles} from './styles';
import {detailsImages} from '../../Utils/localDB';
import {TextComponent} from '../../Components/TextComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Touchable} from '../../Components/Touchable';
import Header from '../../Components/Header';
import {
  accountprofile,
  arrowback,
  arrowbackwhite,
  chat,
  favEmpty,
  locationBlueIcon,
} from '../../Assests';
import FilterAddButton from '../../Components/FilterAddButton';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MsgSendButton from '../../Components/MsgSendButton';
import useHeaderDetailScreen from './useHeaderDetailScreen';
import HeaderDetailComponent from '../../Components/HeaderDetailComponent';
import {Colors} from '../../Theme/Variables';
import {imageURL, imageUrl} from '../../Utils/Urls';

const index = ({navigation, route}) => {
  const {
    PackageDetailData,
    onPressMessage,
    onPressEMail,
    onPressCall,
    navigationChatScreen,
  } = useHeaderDetailScreen(navigation);
  const imageLenght = detailsImages.length;
  const Item = route.params;
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 4 && (
        <ImageBackground
          resizeMode="cover"
          source={{uri: imageUrl(item)}}
          style={styles.secondImage(index)}>
          {index == 3 && (
            <View style={styles.overlayView}>
              <TextComponent
                text={`+${imageLenght - 4}`}
                styles={styles.overlayText}
              />
            </View>
          )}
        </ImageBackground>
      )
    );
  }, []);

  const SocialBoxNotification = ({image, imageText}) => {
    return (
      <View style={styles.socialbox}>
        <Image
          source={{
            uri: imageUrl(image),
          }}
          style={styles.imageStyle}
        />
        <TextComponent text={imageText} styles={styles.imageTextStyle} />
      </View>
    );
  };

  return (
    <>
      <HeaderDetailComponent
        onPress={() => navigation.goBack()}
        profileName={Item?.userDetail?.name}
        headerTitle={'Details'}
        arrowBackIcon={arrowbackwhite}
        centerTextStyle={styles.centerHeading}
        backText={'Back'}
        onPressEMail={() => onPressEMail(Item?.userDetail?.email)}
        onPressCall={() => onPressCall('03302876406')}
        // centerImage={require('../../Assests/Images/profile5.png')}
        onPressMessage={() => navigationChatScreen(Item)}
        centerImage={Item?.userDetail?.profilePicture}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.topContainer}>
        <TextComponent text={'Ad Details'} styles={styles.headingStyle} />

        <View style={styles.imageHeaderView}>
          <Image
            style={styles.firstImage(imageLenght)}
            source={{uri: imageUrl(Item?.adDetail.photos[0])}}
          />
          {Item?.adDetail.photos.length > 0 && (
            <FlatList
              refreshing={false}
              data={Item?.adDetail.photos}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
            />
          )}
        </View>

        <View style={styles.detail}>
          <View style={styles.detailTitle}>
            <TextComponent text={Item?.adDetail?.title} styles={styles.title} />
            <TextComponent
              text={'$' + Item?.adDetail?.price}
              styles={styles.price}
            />
          </View>

          <TextComponent
            text={'For ' + Item?.adDetail?.adType}
            styles={styles.forRent}
          />

          <View style={styles.locationMain}>
            <Image source={locationBlueIcon} style={styles.loctStyle} />
            <TextComponent
              numberOfLines={2}
              text={Item?.adDetail?.location}
              styles={styles.locationText}
            />
          </View>
          <TextComponent
            text={'General Preferences'}
            styles={styles.headingStyle}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Item?.adDetail?.generalPref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
          <TextComponent
            text={'Outside Preferences'}
            styles={{...styles.headingStyle, marginTop: hp('2')}}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Item?.adDetail?.outsidePref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
          <TextComponent
            text={'Inside Preferences'}
            styles={{...styles.headingStyle, marginTop: hp('2')}}
          />

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Item?.adDetail?.insidePref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default memo(index);
