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
        {currentIndex === 2 ?  <ShareButton title={'Get Started'} style={styles.getStart} onPress={getStart} />:   <ShareButton title={'Next'} style={styles.getStart} onPress={handleNext} />}
        </View>}
        
        
        

      
      </View>
    );
  };

  export default memo(OnboardScreen);