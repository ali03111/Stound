import React from 'react';
import {Text, Image, StyleSheet, FlatList} from 'react-native';
import {Colors, FontFamily, scaleFont} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {TextComponent} from './TextComponent';

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
  adjustsFontSizeToFit,
}) => {
  const renderItem = ({item, index}) => {
    return (
      <FilterAddButton style={styles.tags} title={item?.name} required={true} />
    );
  };
  return (
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
        <TextComponent
          adjustsFontSizeToFit={adjustsFontSizeToFit ?? true}
          styles={{...styles.text, ...textStyle}}
          text={title}
        />
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
  );
};

export default FilterAddButton;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(11, 180, 255, 0.3)',
    backgroundColor: 'rgba(11, 180, 255, 0.05)',
    borderRadius: 10,
    marginTop: hp('0.5'),
  },
  image: {
    width: wp('4.5'),
    height: hp('3'),
    resizeMode: 'contain',
  },
  text: {
    color: Colors.black,
    textAlign: 'center',
    marginLeft: wp('2'),
    fontSize: scaleFont(14),
    fontFamily: FontFamily.regular,
  },
  flatListMain: {
    flexDirection: 'row',
    width: '100',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tags: {
    paddingHorizontal: wp('2'),
    marginHorizontal: wp('1'),
    marginBottom: hp('1'),
    marginTop: hp('1'),
    backgroundColor: 'red',
  },
});
