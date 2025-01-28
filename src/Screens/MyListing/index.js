import {FlatList, ImageBackground, Platform, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import useMyListing from './useMyListing';
import Header from '../../Components/Header';
import {styles} from './styles';
import {arrowback} from '../../Assets';
import MyListingComp from '../../Components/MyListingComp';
import {hp} from '../../Config/responsive';
import {isIOS} from '../../Theme/Variables';
import {keyExtractor} from '../../Utils';
MyListingComp;
const MyListing = ({navigation}) => {
  const {listingData} = useMyListing(navigation);

  const renderItem = useCallback(({item, index}) => {
    console.log(item, index, 'MY LISTINGIGNIGNIGN');
    return (
      <View style={{marginBottom: hp('2')}}>
        <MyListingComp
          price={item?.price}
          location={item?.location}
          title={item?.title}
          bathrooms={item?.bathrooms}
          rooms={item?.rooms}
          onPressInquires={() =>
            navigation.navigate('ListingQueryScreen', item)
          }
          onPressEdit={() => navigation.navigate('AddPostScreen', item)}
        />
      </View>
    );
  }, []);
  return (
    <View
      style={{
        flexGrow: 1,
        paddingTop: hp(isIOS ? '1' : '3'),
      }}>
      <Header
        style={styles.topHeader}
        headerTitle={'My Listing'}
        backText={'Back'}
        arrowBackIcon={arrowback}
        goBack={() => navigation.navigate('MybottomTabs')}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listingData}
        renderItem={renderItem}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingBottom: hp('15'),
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default memo(MyListing);
