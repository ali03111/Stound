import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Pressable,
  Modal,
  ActivityIndicator,
  Dimensions,
  Platform,
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
} from '../../Assets';
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
import {fav} from '../../Assets';
import DetailsUiComponent from '../../Components/DetailsUiComponent';
import {Colors} from '../../Theme/Variables';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DividerLine from '../../Components/DividerLine';
import {capitalizeFirstLetter} from '../../Utils/glodbalFunction';

const PackageDetailsScreen = ({navigation, route}) => {
  const {
    price,
    insidePref,
    generalPref,
    title,
    rooms,
    bathrooms,
    areaSize,
    photos,
    location,
    adType,
    navigationChatScreen,
    askQuestion,
    description,
    onFavouriteFunction,
    isFav,
    preferences,
  } = usePackageDetailsScreen(route, navigation);

  const propertyDetails = [
    {id: '1', icon: 'bath', text: `${bathrooms} Baths`}, // FontAwesome5
    {id: '2', icon: 'bed', text: `${rooms} Beds`}, // FontAwesome5
    {id: '3', icon: 'square-foot', text: `${areaSize} sqft`}, // MaterialIcons
  ];

  console.log(insidePref, 'asdjlkajsdfljalsdf');

  console.log(generalPref, 'slslslslslls');
  const imgFlatListRef = useRef(null);

  const [imageModal, setImageModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const onSnapToItem = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffsetX / Dimensions.get('window').width,
    );
  };

  const imageLenght = photos.length;
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 5 && (
        <Touchable onPress={() => setImageModal(true)}>
          <BlurBackground
            uri={imageUrl(item)}
            styles={styles.secondImage(index)}>
            {index == 4 && (
              <View style={styles.overlayView}>
                <TextComponent
                  text={`+${imageLenght - 5}`}
                  styles={styles.overlayText}
                />
              </View>
            )}
          </BlurBackground>
        </Touchable>
      )
    );
  }, []);

  return (
    <>
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
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.imageHeaderView}>
            <Touchable
              onPress={() => {
                setImageModal(true);
              }}>
              <BlurImage
                styles={styles.firstImage(imageLenght)}
                uri={imageUrl(photos[0])}
              />
            </Touchable>
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
            <View
              style={{
                marginHorizontal: wp('5'),
              }}>
              <View style={styles.detailTitle}>
                <TextComponent
                  text={capitalizeFirstLetter(title)}
                  styles={styles.title}
                />
                <TextComponent text={`For ${adType}`} styles={styles.forRent} />
              </View>
              <View style={styles.locationMain}>
                <Image
                  style={{
                    width: wp('6'),
                    height: hp('3'),
                    resizeMode: 'contain',
                  }}
                  source={locationBlueIcon}
                />
                <TextComponent
                  text={location}
                  numberOfLines={2}
                  styles={styles.locationText}
                />
              </View>
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />
            <View style={{marginVertical: hp('1'), marginHorizontal: wp('5')}}>
              {/* {generalPref.length > 0 && (
                <DetailsUiComponent
                  heading={'Property Details'}
                  list={generalPref}
                />
              )} */}
              <TextComponent
                styles={styles.propertyText}
                text={'Property Details '}
              />
              <FlatList
                data={propertyDetails}
                horizontal
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({item}) => (
                  <View style={styles.detailBox}>
                    {item.icon === 'square-foot' ? (
                      <MaterialIcons
                        name={item.icon}
                        size={16}
                        color={Colors.primaryTextColor}
                      />
                    ) : (
                      <FontAwesome5
                        name={item.icon}
                        size={16}
                        color={Colors.primaryTextColor}
                      />
                    )}
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                )}
              />
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={{marginVertical: hp('1'), marginHorizontal: wp('5')}}>
              {generalPref.length > 0 ? (
                <DetailsUiComponent
                  heading={'Preferences'}
                  list={preferences}
                />
              ) : (
                <DetailsUiComponent heading={''} list={generalPref} />
              )}
            </View>
            <DividerLine style={{borderBottomWidth: 5}} />

            <View style={{marginVertical: hp('1'), marginHorizontal: wp('5')}}>
              <TextComponent
                text={'Description'}
                styles={styles.propertyText}
              />
              <View style={styles.button}>
                <TextComponent
                  numberOfLines={50}
                  text={description}
                  styles={styles.desText}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {!route?.params?.items?.isShow && (
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
        )}
      </View>
      <Modal animationType="none" transparent={true} visible={imageModal}>
        <StatusBar
          backgroundColor={Colors.bgBtnColor}
          barStyle="dark-content"
        />
        <View style={styles.grayAreaOfModal}>
          <View style={styles.mainBodyOfModal}>
            <View style={styles.checkView}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 50,
                  width: wp('9'),
                  backgroundColor: 'gray',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo
                  name="cross"
                  size={hp('3')}
                  color={Colors.black}
                  onPress={() => {
                    setImageModal(false);
                  }}
                />
              </View>

              <Header
                cross={true}
                onPress={() => {
                  setImageModal(false);
                }}
              />
            </View>
            <View
              style={{
                width: wp('100'),
                height: hp('100'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Show loader while the image is loading */}

              {Boolean(imageLoading || imageLoading) && (
                <ActivityIndicator
                  color={Colors.grayborder}
                  style={{position: 'absolute'}}
                />
              )}
              <FlatList
                refreshing={false}
                ref={imgFlatListRef}
                data={photos?.length > 0 ? photos : [0]}
                renderItem={({item, index}) => {
                  return (
                    <Image
                      source={{
                        uri: item
                          ? imageUrl('/' + item)
                          : 'https://exima-online.net/templates/LiveCast/dleimages/no_image.jpg',
                      }}
                      style={{
                        aspectRatio: 1,
                        width: wp('100'),
                        backgroundColor: Colors.backgroundColor,
                      }}
                      onLoadStart={() => setImageLoading(true)} // Start loader
                      onLoadEnd={() => setImageLoading(false)} // Hide loader when image loads
                      onError={() => setImageLoading(false)} // Hide loader if there's an error
                    />
                  );
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                scrollEnabled={true}
                onMomentumScrollEnd={onSnapToItem}
                onMomentumScrollBegin={onSnapToItem}
                keyExtractor={keyExtractor}
                pagingEnabled={true}
                contentContainerStyle={{
                  flexDirection: 'row',
                  paddingBottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                style={{paddingBottom: 0}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default memo(PackageDetailsScreen);
