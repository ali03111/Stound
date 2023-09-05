import React, {memo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';
import Header from '../../Components/Header';
import {hp} from '../../Config/responsive';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const FavouriteScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {favouriteData, onPress, favData, getFav, updateFav, isloading} =
    useFavourateScreen(navigation);

  console.log('favData', favData);

  const renderItem = useCallback(({item}) => {
    return (
      <View>
        <FavouriteComp
          backgroundImage={imageUrl(item?.photos[0])}
          title={item?.title}
          locationText={item?.location}
          price={item?.price}
          duration={item?.duration}
          beds={item?.rooms}
          baths={item?.bathrooms}
          size={item?.size}
          onPress={() => onPress(item)}
          onFav={() => updateFav(item)}
        />
      </View>
    );
  });
  return (
    <View style={styles.favMain}>
      <Header styles={styles.topHeader} headerTitle={'Favorite'} />
      <FlatList
        refreshing={false}
        data={favouriteData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}
        onRefresh={getFav}
        ListEmptyComponent={
          !isloading && (
            <View
              style={{
                justifyContent: 'center',
                height: hp('74'),
              }}>
              <EmptyViewComp onRefresh={getFav} />
            </View>
          )
        }
      />
    </View>
  );
};
export default memo(FavouriteScreen);
