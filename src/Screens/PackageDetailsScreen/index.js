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
import { imageUrl } from '../../Utils/Urls';
const PackageDetailsScreen = ({navigation,route}) => {
  const {PackageDetailData} = usePackageDetailsScreen();
  const imageLenght = detailsImages.length;
  const {items:{userDetail,outsidePrefDetail,price,insidePrefDetail,generalPrefDetail,title}}=route.params;
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 4 && (
        <ImageBackground
          resizeMode="cover"
          source={{uri: item}}
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
  return (
    <View style={{flex: 1}}>
      <Header
        arrowBackIcon={arrowback}
        backText={'Back'}
        icon={favEmpty}
        style={styles.headerStyle}
        goBack={navigation.goBack}
      />
      <View style={styles.imageHeaderView}>
        <Image
          style={styles.firstImage(imageLenght)}
          source={{uri: detailsImages[0]}}
        />
        {detailsImages.length > 0 && (
          <FlatList
            refreshing={false}
            data={detailsImages}
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
          <TextComponent
            text={PackageDetailData.forRent}
            styles={styles.forRent}
          />
        </View>
        <View style={styles.locationMain}>
          <Image source={locationBlueIcon} />
          <TextComponent
            text={PackageDetailData.location}
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
                  <Ionicons name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.profileDetails}>
                  <View style={styles.accProfile}>
                    <Image
                      source={accountprofile}
                      style={styles.accProfileImg}
                    />
                  </View>
                  <View style={styles.profileData}>
                    <TextComponent text={userDetail?.name} styles={styles.pTitle} />
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
                  <Ionicons name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {generalPrefDetail?.map(item => {
                    return (
                      <FilterAddButton
                        disabledValue={true}
                        title={item?.name}
                        image={imageUrl(item.image[0].path)}
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
                  <Ionicons name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {outsidePrefDetail?.map(item => {
                    return (
                      <FilterAddButton
                      disabledValue={true}
                      title={item?.name}
                      image={imageUrl(item.image[0].path)}
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
                  <Text style={styles.headTitle}>Inside </Text>
                  <Ionicons name={'caret-down'} size={hp(2)} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.btns}>
                  {insidePrefDetail?.map(item => {
                    return (
                      <FilterAddButton
                      disabledValue={true}
                        title={item?.name}
                        image={imageUrl(item.image[0].path)}
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
            <TextComponent text={'$'+price} styles={styles.price} />
            <TextComponent text={'Total price'} styles={styles.priceText} />
          </View>
          <MsgSendButton
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
