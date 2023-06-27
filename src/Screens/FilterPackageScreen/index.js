import React, {memo, useCallback, useState} from 'react';
import {View, FlatList} from 'react-native';
import {styles} from './styles';
import {TextComponent} from '../../Components/TextComponent';
import FavouriteComp from '../../Components/FavouriteComponent';
import Header from '../../Components/Header';
import {hp} from '../../Config/responsive';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import useFilterPackageScreen from './useFilterPackageScreen';
import {arrowback} from '../../Assests';

const FilterPackageScreen = ({navigation, route}) => {
  const {favouriteData, onPress, updateFav} = useFilterPackageScreen(
    navigation,
    route,
  );

  console.log('favouriteData', favouriteData);

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
      <Header
        styles={styles.topHeader}
        headerTitle={'Filter Ads'}
        backText={'Back'}
        arrowBackIcon={arrowback}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        refreshing={false}
        data={favouriteData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('6')}}
        // onRefresh={getFav}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              height: hp('80'),
            }}>
            {/* <EmptyViewComp onRefresh={getFav} /> */}
          </View>
        }
      />
    </View>
  );
};
export default memo(FilterPackageScreen);
