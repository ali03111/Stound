import React, {memo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';
import Header from '../../Components/Header';
import {hp} from '../../Config/responsive';

const FavouriteScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {onPress,onFavouriteData} = useFavourateScreen(navigation);
  const renderItem = useCallback((item) => {
    // console.log("121321312231",item.item.adDetail)
    return (
      <View>
        <FavouriteComp
          backgroundImage={item.item.adDetail.backgroundImage}
          title={item.item.adDetail[0].title}
          locationText={item.item.adDetail.description}
          price={item.item.adDetail.price}
          duration={item.item.adDetail.duration}
          beds={item.item.adDetail.beds}
          baths={item.item.adDetail.baths}
          size={item.item.adDetail.size}
          onPress={onPress}
        />
      </View>
    );
  });
  return (
    <View style={styles.favMain}>
      <Header styles={styles.topHeader} headerTitle={'Favourite'} />
      <FlatList
        refreshing={false}
        data={onFavouriteData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}
      />
    </View>
  );
};
export default memo(FavouriteScreen);
