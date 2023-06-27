import React from 'react';
import {Text, Image, StyleSheet, FlatList} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {TextComponent} from './TextComponent';
import {imageUrl} from '../Utils/Urls';
import {View} from 'react-native-animatable';

const FilterAddButton = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  imgStyle,
  disabledValue,
  tintColor,
  isRequired,
  locations,
}) => {
  const renderItem = ({item, index}) => {
    console.log('itmemmemem', item);
    return (
      <FilterAddButton style={styles.tags} title={item?.name} required={true} />
    );
  };
  return (
    // <ShadowButton>
    <>
      <Touchable
        Opacity={0.7}
        onPress={onPress}
        disabled={disabledValue}
        style={[
          styles.button,
          {justifyContent: image ? 'center' : 'space-between', ...style},
        ]}>
        {image && (
          <Image
            tintColor={tintColor}
            source={isRequired ? image : {uri: image}}
            style={[styles.image, {...imgStyle}]}
          />
        )}
        <TextComponent styles={{...styles.text, ...textStyle}} text={title} />
      </Touchable>
      {locations?.length > 0 && (
        <FlatList
          data={locations}
          horizontal
          contentContainerStyle={styles.flatListMain}
          renderItem={renderItem}
        />
      )}
    </>

    // </ShadowButton>
  );
};

export default FilterAddButton;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    // width: wp('25'),
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    borderRadius: 10,
  },
  image: {
    width: 20,
    height: 20,
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    // fontSize: heightPercentageToDP('2'),
    color: Colors.black,
    textAlign: 'center',
    marginLeft: wp('2'),
    // fontFamily: FontFamily.regular,
  },
  flatListMain: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: hp('1'),
  },
  tags: {
    paddingHorizontal: wp('2'),
    marginHorizontal: wp('1'),
    marginBottom: hp('1'),
  },
});
