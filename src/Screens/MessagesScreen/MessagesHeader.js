import React from 'react';
import { StyleSheet, Text, Image, View, Platform } from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import {
  arrowback,
  lineleft,
  lineright,
  notificationProfile2,
} from '../../Assests';
import { hp, wp } from '../../Config/responsive';
import { Colors } from '../../Theme/Variables';
import { goBack } from '../../Utils';
import { CircleImageComp } from '../../Components/CircleImageComp';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const MessagesHeader = ({
  headerTitle,
  style,
  saveReset,
  icon,
  arrowBackIcon,
  backText,
  saveResetStyle,
  backTextStyle,
  centerTextStyle,
  dayStyle,
}) => {
  return (
    <View>
      <View style={[styles.TopHeader, { ...style }]}>
        <View style={styles.HeaderLeft}>
          <Touchable onPress={goBack} style={styles.backMain}>
            <Image
              source={arrowBackIcon}
              style={{
                resizeMode: 'contain',
                style: styles.arrowback,
              }}
            />
            <CircleImageComp
              styles={styles.profileImg}
              image={notificationProfile2}
            />
            <TextComponent
              text={backText}
              styles={{ ...styles.backBtn, ...backTextStyle }}
            />
          </Touchable>
        </View>
        <View style={{ ...styles.HeaderCenter, ...centerTextStyle }}>
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
            />
          </Touchable>
        </View>
      </View>
      <View style={styles.dayBarStyle}>
        <Image source={lineleft} />
        <TextComponent text={'Today'} styles={{ ...styles.day, ...dayStyle }} />
        <Image source={lineright} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopHeader: {
    paddingTop: hp('6'),
    paddingBottom: hp('3'),
    flexDirection: 'row',
    width: wp('100'),
    // marginTop: Platform.OS == 'ios' ? hp('5') : hp('1.5'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: wp('4'),
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: hp('0.2'),
  },
  backBtn: {
    // marginLeft: wp('1'),
    color: Colors.gray2,
  },
  HeaderTitle: {
    fontSize: hp('2.3'),
    color: Colors.white,
    fontWeight: '500',
  },
  HeaderLeft: {
    width: wp('20'),
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  HeaderCenter: {
    width: wp('52'),
    alignItems: 'flex-start',
  },
  HeaderRight: {
    width: wp('20'),
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  profileImg: {
    width: wp('9'),
    height: hp('4.5'),
    marginLeft: wp('5'),
  },
  dayBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    paddingHorizontal: wp('5'),
    paddingVertical: hp('2.5'),
  },
});
export default MessagesHeader;
