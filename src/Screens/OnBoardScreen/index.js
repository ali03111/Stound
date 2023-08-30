// import React, {memo, useCallback} from 'react';
// import {View, FlatList, Dimensions, Image, ScrollView} from 'react-native';
// import useOnboardScreen from './useOnboardScreen';
// import {styles} from './styles';
// import {keyExtractor} from '../../Utils';
// // import Lottie from 'lottie-react-native';
// import {hp} from '../../Config/responsive';
// import {TextComponent} from '../../Components/TextComponent';
// import ShareButton from '../../Components/ShareButton';

// const OnboardScreen = ({navigation}) => {
//   const {onBoardinData, currentIndex, onSnapToItem, getStart, goNext,goBack} =
//     useOnboardScreen(navigation);
//   const renderItem = useCallback(
//     ({item, index}) => {
//       {
//         console.log('alsdkjfkladsjflkadjs', item);
//       }
//       return (
//         currentIndex == index && (
//           <View
//             key={index}
//             style={{
//               flex: 1,
//               width: Dimensions.get('window').width,
//               // flexDirection: 'row',
//               paddingBottom: 0,
//             }}>
//             <View style={styles.centerMainView}>
//               <Image
//                 style={styles.bannerImg}
//                 // resizeMode="contain"
//                 source={item?.image}
//               />
//               <TextComponent
//                 numberOfLines={2}
//                 text={item?.heading}
//                 styles={styles.centerHeading}
//               />
//             </View>
//           </View>
//         )
//       );
//     },
//     [currentIndex],
//   );
//   const renderItemDots = useCallback(
//     ({item, index}) => {
//       return <View style={styles.dot(currentIndex, index)} />;
//     },
//     [currentIndex],
//   );
//   return (
//     <ScrollView
//       bounces={false}
//       style={{backgroundColor: 'white', flex: 1, paddingBottom: hp('10')}}>
//       {/* style={{backgroundColor: 'white', flex: 1}}> */}
//       {console.log(currentIndex, 'askfjdlskjflksad')}
//       <FlatList
//         bounces={false}
//         refreshing={false}
//         data={onBoardinData}
//         renderItem={renderItem}
//         showsHorizontalScrollIndicator={false}
//         horizontal={true}
//         onMomentumScrollEnd={onSnapToItem}
//         keyExtractor={keyExtractor}
//         pagingEnabled={true}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           paddingBottom: 0,
//         }}
//         style={{paddingBottom: 0}}
//       />

//       <FlatList
//         scrollEnabled={false}
//         refreshing={false}
//         data={[0, 1, 2]}
//         renderItem={renderItemDots}
//         alwaysBounceVertical
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={keyExtractor}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.dotList}
//         style={{alignSelf: 'center'}}
//       />
//       {currentIndex == 2 ? (
//         // <Animatable.View animation={'bounceIn'}>
//         <ShareButton
//           title={'Get Start'}
//           style={styles.getStarted}
//           onPress={getStart}
//         />
//       ) : (
//         // </Animatable.View>
//         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          
//         {/* <ShareButton title={'Back'} style={styles.getStart} onPress={goBack} /> */}
//         <ShareButton title={'Next'} style={styles.getStarted} onPress={goNext} />
//         </View>
//       )}
      
//     </ScrollView>
//   );
// };

// export default memo(OnboardScreen);

  import React, { memo, useCallback, useRef } from 'react';
  import { View, FlatList, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
  import useOnboardScreen from './useOnboardScreen';
  import { styles } from './styles';
  import { keyExtractor } from '../../Utils';
  import { hp } from '../../Config/responsive';
  import { TextComponent } from '../../Components/TextComponent';
  import ShareButton from '../../Components/ShareButton';

  const OnboardScreen = ({ navigation }) => {
    const {
      onBoardinData,
      currentIndex,
      onSnapToItem,
      getStart,
      flatListRef,
      handleNext
    } = useOnboardScreen(navigation);
    const renderItem = useCallback(
          ({item, index}) => {
            {
              console.log('alsdkjfkladsjflkadjs', item);
            }
            return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    width: Dimensions.get('window').width,
                    // flexDirection: 'row',
                    paddingBottom: 0,
                  }}>
                  <View style={styles.centerMainView}>
                    <Image
                      style={styles.bannerImg}
                      // resizeMode="contain"
                      source={item?.image}
                    />
                    <TextComponent
                      numberOfLines={2}
                      text={item?.heading}
                      styles={styles.centerHeading}
                    />
                  </View>
                </View>
            );
          },
          [currentIndex],
        );

    const renderItemDots = useCallback(
      ({ index }) => (
        <View style={styles.dot(currentIndex, index)} />
      ),
      [currentIndex]
    );

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
            ref={flatListRef}
          data={onBoardinData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          onMomentumScrollEnd={onSnapToItem}
        />

        <FlatList
          data={onBoardinData} // Use the same data for the dots
          renderItem={renderItemDots}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dotList}
          style={{ alignSelf: 'center', marginTop: 10 }}
        />


          {<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {currentIndex === 2 ?  <ShareButton title={'Get Started'} style={styles.getStarted} onPress={getStart} />:   <ShareButton title={'Next'} style={styles.getStarted} onPress={handleNext} />}
        </View>}
        
        
        

      
      </View>
    );
  };

  export default memo(OnboardScreen);
