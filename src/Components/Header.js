import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';
import {arrowback} from '../Assests';
import {hp, wp} from '../Config/responsive';
import {Colors} from '../Theme/Variables';

const NotificationHeader = ({headerTitle, style, saveReset, icon}) => {
  return (
    <View style={styles.TopHeader}>
      <View style={styles.HeaderLeft}>
        <Touchable style={styles.backMain}>
          <Image
            source={arrowback}
            style={{
              resizeMode: 'contain',
              style: styles.arrowback,
            }}
          />
          <TextComponent text={'Back'} styles={styles.backBtn} />
        </Touchable>
      </View>
      <View style={styles.HeaderCenter}>
        <TextComponent text={headerTitle} styles={styles.HeaderTitle} />
      </View>
      <View style={styles.HeaderRight}>
        <Touchable style={styles.backMain}>
          <Image
            source={icon}
            style={{
              resizeMode: 'contain',
              style: styles.arrowback,
            }}
          />
          <TextComponent text={saveReset} styles={styles.backBtn} />
        </Touchable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopHeader: {
    paddingBottom: hp('2'),
    flexDirection: 'row',
    width: wp('100'),
    // justifyContent: 'space-between',
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: hp('0.2'),
  },
  backBtn: {
    marginLeft: wp('3'),
    color: Colors.gray2,
  },
  HeaderTitle: {
    fontSize: hp('2.6'),
    color: Colors.black,
    fontWeight: 'bold',
  },
  HeaderLeft: {
    width: wp('20'),
    // textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderCenter: {
    width: wp('60'),
    alignItems: 'center',
  },
  HeaderRight: {
    width: wp('20'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NotificationHeader;
