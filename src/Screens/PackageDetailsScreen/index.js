import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {hp, wp} from '../../Config/responsive';
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
import MsgSendButton from '../../Components/MsgSendButton';
import {imageUrl} from '../../Utils/Urls';
import BlurBackground from '../../Components/BlurBackground';
import BlurImage from '../../Components/BlurImage';
import {fav} from '../../Assests';
import DetailsUiComponent from '../../Components/DetailsUiComponent';
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
    askQuestion,
    description,
    onFavouriteFunction,
    isFav,
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        headerTitle={'Package Details'}
        arrowBackIcon={arrowback}
        backText={'Back'}
        icon={!isFav ? fav : favEmpty}
        style={styles.headerStyle}
        goBack={navigation.goBack}
        onHeartPress={onFavouriteFunction}
        // onSave={() => updateFav()}
      />
      <ScrollView style={{padding: 5}} showsVerticalScrollIndicator={false}>
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

        <View style={styles.detail}>
          <View style={styles.detailTitle}>
            <TextComponent text={title} styles={styles.title} />
            <TextComponent text={`for ${adType}`} styles={styles.forRent} />
          </View>
          <View style={styles.locationMain}>
            <Image
              style={{width: wp('6'), height: hp('5'), resizeMode: 'contain'}}
              source={locationBlueIcon}
            />
            <TextComponent
              text={location}
              numberOfLines={2}
              styles={styles.locationText}
            />
          </View>
          {console.log(generalPref, 'afjdalskfj')}
          <DetailsUiComponent heading={'Property Details'} list={generalPref} />
          <View style={{marginBottom: hp('1.5')}}>
            <TextComponent text={'Description'} styles={styles.pTitle} />
            <View style={styles.button}>
              <TextComponent
                numberOfLines={50}
                text={description}
                styles={styles.desText}
              />
            </View>
          </View>
          <DetailsUiComponent heading={'General'} list={generalPref} />
          <DetailsUiComponent heading={'Inside'} list={insidePref} />
          <DetailsUiComponent heading={'Outside'} list={outsidePref} />
          <View style={styles.priceMain}>
            <View style={styles.priceLeft}>
              <TextComponent
                text={'$' + price?.toLocaleString()}
                styles={styles.price}
              />
              <TextComponent text={'Total price'} styles={styles.priceText} />
            </View>
            <MsgSendButton
              onPress={askQuestion}
              title={'Contact Now'}
              style={styles.sendBtnStyle}
              textStyle={styles.sendTextStyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(PackageDetailsScreen);
