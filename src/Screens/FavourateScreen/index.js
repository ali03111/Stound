import React, {memo, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';

const Favourite = () => {
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
    <View>
      <FlatList
        refreshing={false}
        data={favouriteData}
        renderItem={renderItem}
      />
    </View>
  );
};
export default memo(Favourite);
