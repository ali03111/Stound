import React, {memo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import useFavourateScreen from './useFavourateScreen';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';
import Header from '../../Components/Header';
import {Picker} from '@react-native-picker/picker';

const Favourite = () => {
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
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <FlatList
        refreshing={false}
        data={favouriteData}
        renderItem={renderItem}
      />
    </View>
  );
};
export default memo(Favourite);
