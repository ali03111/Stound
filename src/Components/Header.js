import React from 'react';
import {StyleSheet, Text, Image, View, Platform} from 'react-native';
import {TextComponent} from './TextComponent';
import {Touchable} from './Touchable';
import {arrowback} from '../Assests';
import {hp, wp} from '../Config/responsive';
import {Colors, FontSize} from '../Theme/Variables';

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
  onHeartPress,
}) => {
  return (
    <View style={[styles.TopHeader, {...style}]}>
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
            styles={{...styles.backBtn, ...backTextStyle}}
          />
        </Touchable>
      </View>
      <View style={styles.HeaderCenter}>
        <TextComponent text={headerTitle} styles={styles.HeaderTitle} />
      </View>
      <View style={styles.HeaderRight}>
        <View style={styles.backMain}>
          {icon && (
            <Touchable onPress={onHeartPress}>
              <Image
                source={icon}
                style={{
                  resizeMode: 'contain',
                  style: styles.arrowback,
                }}
              />
            </Touchable>
          )}
          {saveReset && (
            <TextComponent
              text={saveReset}
              styles={{...styles.backBtn, ...saveResetStyle}}
              onPress={onSave}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopHeader: {
    paddingBottom: hp('1.5'),
    flexDirection: 'row',
    width: wp('90'),
    marginTop: Platform.OS == 'ios' ? hp('6') : hp('1.5'),
    paddingHorizontal: wp('5'),
    alignItems: 'center',
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backBtn: {
    marginLeft: wp('1'),
    color: Colors.gray2,
    padding: 10,
  },
  HeaderTitle: {
    // fontSize: hp('2.6'),
    fontSize: FontSize.scale24,
    color: Colors.primaryTextColor,
    fontWeight: '600',
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
    padding: 10,
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
