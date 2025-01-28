import {Dimensions, Platform, Image, Text} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
const {width, height} = Dimensions.get('window');

const Colors = {
  primaryColor: '#0BB4FF',
  primaryColorFaded: '#759CFA',
  yellow2: '#F2E3B5',
  lightGray2: '#98A1BD',
  barFaded: 'rgba(49,74,138,0.63)',
  searchFaded: 'rgba(60,75,119,0.78)',
  lightFaded: 'rgba(29, 134, 202, 0.31)',
  darkFaded: 'rgba(5, 33, 65, 0.9)',
  primaryFaded: 'rgba(29, 134, 202, 0.31)',
  downloadFaded: 'rgba(29, 134, 202)',
  primaryColor2: '#4A7DD4',
  primaryColor3: '#13396E',
  blueMenu: 'rgba(5, 33, 65, 0.8)',
  blueMenu2: 'rgba(60, 75, 119, 0.3)',
  blueButton: 'rgba(29, 134, 202, 0.3)',
  blueBar: 'rgba(5, 33, 65,1)',
  darkBlue: 'rgba(6, 42, 89, 0.71)',
  borderBlue: '#22C7FF',
  borderBlue2: 'rgba(208, 220, 255, 0.5)',
  background: 'rgba(60, 75, 119, 0.75)',
  backgroundBlue: '#052141',
  buttonBlue: 'rgba(49, 74, 142, 0.63)',
  border: '#6CF8E0',
  border2: '#3A88E2',
  blue: '#43B7E8',
  darkBlue2: '#07385C',
  darkBlue3: '#0C5185',
  graphBlue: '#60F8DE',
  green: '#60F8DD',
  fadeBlue: 'rgba(29, 134, 202, 0.3)',
  label: '#ADB9D1',
  darkGreen: '#2C695F',
  fadeGreen: 'rgba(69, 197, 175, 0.11)',
  overlayColor: 'rgba(60, 75, 119, 0.7)',
  lightBackground: 'rgba(60, 75, 119, 0.11)',
  greenCard: 'rgba(63, 181, 165, 0.5)',
  greenCard2: '#3FB5A5',
  greenCard3: 'rgba(69, 197, 175, 0.6)',
  greenCard4: 'rgba(69, 197, 175, 1)',
  greenCard5: '#ADFFF1',
  greenCardBorder: '#72EEDD',
  // primaryColor: '#0E2A79',
  secondaryColor: '#060C1E',
  greenFaded: '#45C5AF',
  borderGreen: '#74F4DE',
  whiteFaded: '#EBEAEC',
  yellow: '#FFE7BF',
  rating: '#FFBA49',
  redFade: '#FF4F40',
  lightRed: '#FD6F6F',
  black2: '#072348',
  line: '#2F5C84',
  seconds: '#DA2E7C',
  bottomLine: '#D0DCFF',
  // primaryColor: '#13678A',
  // primaryColor: '#C3FFF5',
  transparent: 'rgba(0, 0, 0, 0)',
  blurBlack: 'rgba(0, 0, 0, 0.4)',
  blurWhite: 'rgba(255, 255, 255, 0.5)',
  blurWhite1: 'rgba(255, 255, 255, 0.2)',
  blurWhite2: 'rgba(255, 255, 255, 0.6)',
  blurWhite3: 'rgba(255, 255, 255, 0.42)',
  blurWhite4: 'rgba(255, 255, 255, 0.2)',
  white: '#ffffff',
  white2: '#DEDEDE',
  black: '#000000',
  text: '#212529',
  red: 'red',
  gray: '#C5C6CA',
  gray2: 'rgba(60, 75, 119, 0.7)',
  lightGray: '#A1A4B2',
  fadedGray: '#EBEAEC',
  grayBackground: 'rgba(3,23,76,0.23)',
  grayScale: '#b8c0d6',
  success: '#28a745',
  placeholder: '#C4C4C4',
  switch: 'rgba(60, 75, 119, 0.4)',
  card: 'rgba(29 ,134 ,202 ,0.41)',
  blackDark: 'rgba(0,0,0,0.4)',
  bubbleView: '#D5D5D5',
  bubbleText: '#656565',
  lightblue: 'rgba(11, 180, 255, 0.2)',
  grayborder: '#292D32',
  redfaded: '#EA4335',
  blue: '#1877F2',
  primaryTextColor: '#212759',
};

const NavigationColors = {
  primary: Colors.primary,
};

/** FontSize **/
const FontSize = {
  scale12: Math.round(width / 36),
  scale13: Math.round(width / 33),
  scale14: Math.round(width / 31.5),
  scale15: Math.round(width / 29),
  scale16: Math.round(width / 27),
  scale17: Math.round(width / 26.5),
  scale18: Math.round(width / 24),
  scale19: Math.round(width / 22),
  scale20: Math.round(width / 21.5),
  scale21: Math.round(width / 20),
  scale22: Math.round(width / 19.5),
  scale24: Math.round(width / 18),
  scale26: Math.round(width / 16.5),
  scale28: Math.round(width / 15.5),
  scale30: Math.round(width / 14.5),
  scale31: Math.round(width / 14),
  scale32: Math.round(width / 13.5),
  scale33: Math.round(width / 13),
  scale34: Math.round(width / 12.5),
  scale35: Math.round(width / 12),
  scale36: Math.round(width / 11.5),
  scale37: Math.round(width / 11),
  scale38: Math.round(width / 10.5),
  scale39: Math.round(width / 10),
  scale40: Math.round(width / 9.5),
  scale41: Math.round(width / 9),
  scale42: Math.round(width / 8.5),
  scale43: Math.round(width / 8),
  scale44: Math.round(width / 7.5),
  scale45: Math.round(width / 7),
  scale46: Math.round(width / 6.5),
  scale47: Math.round(width / 6),
  scale48: Math.round(width / 5.5),
  scale49: Math.round(width / 5),
  scale50: Math.round(width / 4.5),
  scale51: Math.round(width / 4.5),
  scale52: Math.round(width / 4.2),
  scale53: Math.round(width / 4),
  scale54: Math.round(width / 3.8),
  scale55: Math.round(width / 3.7),
  scale56: Math.round(width / 3.6),
  scale57: Math.round(width / 3.5),
  scale58: Math.round(width / 3.4),
  scale59: Math.round(width / 3.3),
  scale60: Math.round(width / 3.2),
  scale61: Math.round(width / 3.1),
  scale62: Math.round(width / 3),
  scale63: Math.round(width / 2.9),
  scale64: Math.round(width / 2.8),
  scale65: Math.round(width / 2.7),
  scale66: Math.round(width / 2.6),
  scale67: Math.round(width / 2.5),
  scale68: Math.round(width / 2.4),
  scale69: Math.round(width / 2.3),
  scale70: Math.round(width / 2.2),
  scale71: Math.round(width / 2.1),
  scale72: Math.round(width / 2),
  scale73: Math.round(width / 1.9),
  scale74: Math.round(width / 1.8),
  scale75: Math.round(width / 1.7),
  scale76: Math.round(width / 1.6),
  scale77: Math.round(width / 1.5),
  scale78: Math.round(width / 1.4),
  scale79: Math.round(width / 1.3),
  scale80: Math.round(width / 1.2),
  small: 8,
  medium: 10,
  regular: 12,
  default: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 22,
};
const FontFamily = {
  regular: 'ProximaNova-Regular',
  semiBold: 'ProximaNova-Semibold',
  bold: 'ProximaNova-Bold',
};

const Sizes = {
  width,
  height,
  h10: Math.round(height * 0.0125),
  h20: Math.round(height * 0.025),
};

const topTabsStyles = {
  tabBarLabelStyle: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.semiBold,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabBarInactiveTintColor: '#22222280',
  tabBarActiveTintColor: Colors.heading,
  tabBarIndicatorStyle: {
    backgroundColor: Colors.heading,
    marginBottom: 5,
    width: Sizes.width / 4,
    left: Sizes.width / 8,
  },
  tabBarPressColor: '#FAF0E7',
  lazy: true,
};

const modalStyles = {
  flex: 1,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: Colors.blueMenu,
};

const modalAdStyles = {
  margin: 50,
  borderRadius: 10,
  marginBottom: 250,
  shadowColor: Colors.transparent,
  backgroundColor: Colors.transparent,
};

const overlayStyle = {
  backgroundColor: 'rgba(0,0,0,0.5)',
};

const screenOptions = {
  headerTitleStyle: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: Colors.white,
};

// export const bottomTabRoute = ({route: {name}}) => ({
//   tabBarIcon: ({focused}) => (
//     <Image
//       source={Images[name.replace('Stack', '')]}
//       style={{
//         height: 20,
//         width: 20,
//         resizeMode: 'contain',
//         tintColor: focused ? Colors.white : Colors.grayScale,
//       }}
//     />
//   ),
//   lazy: true,
//   headerShown: false,
//   tabBarStyle: {
//     backgroundColor: Colors.primaryColor,
//     paddingVertical: 0,
//     height: Platform.OS == 'ios' ? 100 : 70,
//     alignItems: 'center',
//     borderTopWidth: 0,
//   },
//   tabBarLabel: ({focused}) => (
//     <>
//       {focused && (
//         <Image
//           source={Images.dot}
//           style={{
//             width: 25,
//             height: 25,
//             // height: width * 0.02,
//             // width: width * 0.02,
//             resizeMode: 'contain',
//             position: 'absolute',
//             bottom: '18%',
//           }}
//         />
//       )}
//       <Text
//         style={{
//           marginBottom: 5,
//           fontSize: FontSize.scale12,
//           fontFamily: FontFamily.medium,
//           color: focused ? Colors.white : Colors.grayScale,
//         }}>
//         {name.replace('Stack', '')}
//       </Text>
//       {/* {focused && (
//         <View
//           style={{
//             bottom: 4,
//             position: 'absolute',
//             height: 4,
//             width: 4,
//             borderRadius: 2,
//             // marginBottom:5,
//             backgroundColor: focused ? Colors.primaryColor : Colors.white,
//           }}
//         />
//       )} */}
//     </>
//   ),
// });

const animationConfig = {
  cardOverlayEnabled: true,
  animationEnabled: false,
  gestureEnabled: Platform.OS === 'ios',
  detachPreviousScreen: false,
  headerShown: false,
  // cardStyleInterpolator: ({current}) => ({opacity: current.progress}),
};

const isIOS = Boolean(Platform.OS == 'ios');

export {
  Colors,
  FontSize,
  FontFamily,
  modalStyles,
  modalAdStyles,
  overlayStyle,
  Sizes,
  topTabsStyles,
  screenOptions,
  NavigationColors,
  animationConfig,
  isIOS,
};
