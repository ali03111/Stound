import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextComponent} from './TextComponent';
import {hp, wp} from '../Config/responsive';
import FilterAddButton from './FilterAddButton';
import {imageUrl} from '../Utils/Urls';
import {Colors} from '../Theme/Variables';

const DetailsUiComponent = ({heading, list}) => {
  return (
    <View>
      <TextComponent text={heading} styles={styles.detailsHeading} />
      <View style={styles.btns}>
        {list?.map(item => {
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
    </View>
  );
};

export default DetailsUiComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  detailsHeading: {
    fontSize: hp('1.6'),
    // color: 'black',
    // fontWeight: '500',
    color: Colors.primaryTextColor,
    marginBottom: hp('1'),
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  btn: {
    paddingHorizontal: wp('2.5'),
    marginRight: wp('2'),
    marginBottom: hp('1.5'),
  },
});
