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
  chat,
  favEmpty,
  locationBlueIcon,
} from '../../Assests';
import FilterAddButton from '../../Components/FilterAddButton';
import usePackageDetailsScreen from './usePackageDetailsScreen';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MsgSendButton from '../../Components/MsgSendButton';
import {imageURL, imageUrl} from '../../Utils/Urls';
import BlurBackground from '../../Components/BlurBackground';
import BlurImage from '../../Components/BlurImage';
import {fav} from '../../Assests';
const PackageDetailsScreen = ({navigation, route}) => {
  const {
    PackageDetailData,
    userDetail,
    outsidePref,
    price,
    insidePref,
    generalPref,
    title,
    photos,
    location,
    adType,
    navigationChatScreen,
  } = usePackageDetailsScreen(route, navigation);

  const imageLenght = photos.length;
  console.log('itemsssss', route.params);
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 4 && (
        <BlurBackground uri={imageUrl(item)} styles={styles.secondImage(index)}>
          {index == 4 && (
            <View style={styles.overlayView}>
              <TextComponent
                text={`+${imageLenght - 4}`}
                styles={styles.overlayText}
              />
            </View>
          )}
        </BlurBackground>
      )
    );
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header
        arrowBackIcon={arrowback}
        backText={'Back'}
        icon={route.params.items.isFavourite ? fav : favEmpty}
        style={styles.headerStyle}
        goBack={navigation.goBack}
      />
      <View style={styles.imageHeaderView}>
        <BlurImage
          styles={styles.firstImage(imageLenght)}
          uri={imageUrl(photos[0])}
        />
        {photos.length > 0 && (
          <FlatList
            refreshing={false}
            data={photos}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
      {/* {console.log(PackageDetailData)} */}

      <View style={styles.detail}>
        <View style={styles.detailTitle}>
          <TextComponent text={title} styles={styles.title} />
          <TextComponent text={`for ${adType}`} styles={styles.forRent} />
        </View>
        <View style={styles.locationMain}>
          <Image source={locationBlueIcon} />
          <TextComponent
            text={location}
            numberOfLines={10}
            styles={styles.locationText}
          />
        </View>
        <TextComponent
          text={'Property Details'}
          styles={styles.detailsHeading}
        />
        <ScrollView
          style={styles.propertyDetails}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: hp('6')}}>
            <Collapse style={styles.mainToggle}>
              <CollapseHeader>
                <View style={styles.toggleHead}>
                  <Text style={styles.headTitle}>Profile </Text>
                  <Ionicons color={'black'} name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.profileDetails}>
                  <BlurImage
                    uri={
                      imageUrl(userDetail.profilePicture) ??
                      userDetail.profilePicture
                    }
                    styles={styles.accProfileImg}
                  />
                  <View style={styles.profileData}>
                    <TextComponent
                      text={userDetail?.name}
                      styles={styles.pTitle}
                    />
                    <TextComponent
                      text={userDetail?.email}
                      styles={styles.pEmail}
                    />
                  </View>
                  <View style={styles.accChat}>
                    <Image source={chat} />
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.mainToggle}>
              <CollapseHeader>
                <View style={styles.toggleHead}>
                  <Text style={styles.headTitle}>General </Text>
                  <Ionicons color={'black'} name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {generalPref?.map(item => {
                    console.log('sdfsdfsdfsdfsdfsdfd', item);
                    return (
                      <FilterAddButton
                        disabledValue={true}
                        title={item?.name}
                        image={imageUrl(item.image)}
                        style={styles.btn}
                      />
                    );
                  })}
                </View>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.mainToggle}>
              <CollapseHeader>
                <View style={styles.toggleHead}>
                  <Text style={styles.headTitle}>Outside </Text>
                  <Ionicons color={'black'} name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {outsidePref?.map(item => {
                    return (
                      <FilterAddButton
                        disabledValue={true}
                        title={item?.name}
                        image={imageUrl(item.image)}
                        style={styles.btn}
                        required={true}
                      />
                    );
                  })}
                </View>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.mainToggle}>
              <CollapseHeader>
                <View style={styles.toggleHead}>
                  <Text style={styles.headTitle}>Inside </Text>
                  <Ionicons color={'black'} name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {insidePref?.map(item => {
                    return (
                      <FilterAddButton
                        disabledValue={true}
                        title={item?.name}
                        image={imageUrl(item.image)}
                        style={styles.btn}
                      />
                    );
                  })}
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        </ScrollView>
        <View style={styles.priceMain}>
          <View style={styles.priceLeft}>
            <TextComponent text={'$' + price} styles={styles.price} />
            <TextComponent text={'Total price'} styles={styles.priceText} />
          </View>
          <MsgSendButton
            // onPress={navigationChatScreen}
            title={'Contact Now'}
            style={styles.sendBtnStyle}
            textStyle={styles.sendTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(PackageDetailsScreen);
