import React from 'react';
import { StyleSheet, Text, Image, View, Platform } from 'react-native';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import { arrowback } from '../Assests';
import { hp, wp } from '../Config/responsive';
import { Colors } from '../Theme/Variables';

const NotificationHeader = ({
  headerTitle,
  style,
  saveReset,
  icon,
  arrowBackIcon,
  backText,
  saveResetStyle,
  goBack,
  backTextStyle,
  onSave,
}) => {
  return (
    <View style={[styles.TopHeader, { ...style }]}>
      <View style={styles.HeaderLeft}>
        <Touchable onPress={goBack} style={styles.backMain}>
          <Image
            source={arrowBackIcon}
            style={{
              resizeMode: 'contain',
              ...styles.arrowback,
            }}
          />
          <TextComponent
            text={backText}
            onPress={goBack}
            styles={{ ...styles.backBtn, ...backTextStyle }}
          />
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
          <TextComponent
            text={saveReset}
            styles={{ ...styles.backBtn, ...saveResetStyle }}
            onPress={onSave}
          />
        </Touchable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopHeader: {
    paddingBottom: hp('1.5'),
    flexDirection: 'row',
    width: wp('90'),
    marginTop: Platform.OS == 'ios' ? hp('5') : hp('1.5'),
    paddingHorizontal: wp('5'),
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowback: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  HeaderCenter: {
    width: wp('50'),
    alignItems: 'center',
  },
  HeaderRight: {
    width: wp('20'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default NotificationHeader;
