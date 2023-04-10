import React, {memo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';
import Header from '../../Components/Header';
import {hp} from '../../Config/responsive';

const FavouriteScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {favouriteData} = useFavourateScreen();
  const renderItem = useCallback(({item}) => {
    return (
      <View>
        <FavouriteComp
          backgroundImage={item?.backgroundImage}
          title={item?.title}
          locationText={item?.locationText}
          price={item?.price}
          duration={item?.duration}
          beds={item?.beds}
          baths={item?.baths}
          size={item?.size}
        />
      </View>
    );
  });
  return (
    <View style={styles.favMain}>
      <Header styles={styles.topHeader} headerTitle={'Favourite'} />
      <FlatList
        refreshing={false}
        data={favouriteData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}
      />
    </View>
  );
};
export default memo(FavouriteScreen);
