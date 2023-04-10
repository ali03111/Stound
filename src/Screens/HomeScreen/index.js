import React, {memo, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import useHomeScreen from './useHomeScreen';
import {styles} from './styles';
import {keyExtractor} from '../../Utils';
import {TextComponent} from '../../Components/TextComponent';
import HomeCard from '../../Components/HomeCard';
import {homeCard, notification, profile, search, setting} from '../../Assests';

import * as Animatable from 'react-native-animatable';
import {InputComponent} from '../../Components/InputComponent';
// import {TextInput} from 'react-native-paper';
import {Touchable} from '../../Components/Touchable';
import Notification from '../../Components/Notification';
import Swiper from 'react-native-deck-swiper';
import {hp, wp} from '../../Config/responsive';
import SomeComponent from '../GestureScreenTest';

const HomeScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');

  const {onBoardinData, currentIndex, onSnapToItem, getStart} =
    useHomeScreen(navigation);

  const renderItem = useCallback(({item, index}) => {
    return (
      <HomeCard
        userName={'test'}
        image={homeCard}
        profile={profile}
        bath={'3 Baths'}
        Beds={'4 Beds'}
        locationText={'1050 Old Nichols Rd Islandia, NY 11749'}
        forRent={'For Rent'}
        price={'$1500'}
        duration={'month'}
      />
    );
  }, []);

  return (
    <View style={{paddingTop: Platform.OS == 'ios' ? hp('3') : hp('0')}}>
      <View style={styles.searchBarMain}>
        <View style={styles.searchMain}>
          <Image style={styles.search} source={search} />
          <TextInput
            style={styles.searchinput}
            onChangeText={onChangeText}
            value={text}
            placeholder={'Search property here...'}
          />
        </View>
        <View style={styles.searchIcons}>
          <Touchable
            onPress={() => navigation.navigate('FilterScreen')}
            style={styles.rightIcon}>
            <Image source={setting} style={styles.setting} />
          </Touchable>
          <Touchable style={styles.rightIcon}>
            <Image source={notification} style={styles.notification} />
          </Touchable>
        </View>
      </View>
      <View style={styles.cardMainView}>
        <Swiper
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          useViewOverflow={true}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          marginBottom={0}
          renderCard={renderItem}
          onSwipedLeft={ca => {
            console.log('left');
          }}
          onSwipedRight={ca => {
            console.log('Right');
          }}
          onSwipedTop={ca => {
            console.log('Top');
          }}
          onSwipedBottom={ca => {
            console.log('bottom');
          }}
          cardIndex={0}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          stackSize={2}
        />
      </View>
    </View>
  );
};

export default memo(HomeScreen);
