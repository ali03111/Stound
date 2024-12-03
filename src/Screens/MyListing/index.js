import {FlatList, ImageBackground, Platform, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import useMyListing from './useMyListing';
import Header from '../../Components/Header';
import {styles} from './styles';
import {arrowback} from '../../Assests';
import MyListingComp from '../../Components/MyListingComp';
import {hp} from '../../Config/responsive';
import {isIOS} from '../../Theme/Variables';
MyListingComp;
const MyListing = ({navigation}) => {
  const {} = useMyListing(navigation);

  const data = [
    {
      price: '1500',
      apartmentName: 'Apartment for rent',
      location: '1050 Old Nichols Rd Islandia.',
      Baths: '3',
      Beds: '4',
      sqft: '120',
    },
    // {
    //   price: '1500',
    //   apartmentName: 'Apartment for rent',
    //   location: '1050 Old Nichols Rd Islandia.',
    //   Baths: '3',
    //   Beds: '4',
    //   sqft: '120',
    // },
    // {
    //   price: '1500',
    //   apartmentName: 'Apartment for rent',
    //   location: '1050 Old Nichols Rd Islandia.',
    //   Baths: '3',
    //   Beds: '4',
    //   sqft: '120',
    // },
    // {
    //   price: '1500',
    //   apartmentName: 'Apartment for rent',
    //   location: '1050 Old Nichols Rd Islandia.',
    //   Baths: '3',
    //   Beds: '4',
    //   sqft: '120',
    // },
  ];

  const renderItem = useCallback((item, index) => {
    console.log(item, index, 'MY LISTINGIGNIGNIGN');
    return (
      <View>
        <MyListingComp />
      </View>
    );
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: hp(isIOS ? '1' : '3'),
        paddingBottom: hp('15'),
      }}>
      <Header
        style={styles.topHeader}
        headerTitle={'My Listing'}
        backText={'Back'}
        arrowBackIcon={arrowback}
        goBack={() => navigation.navigate('MybottomTabs')}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{alignItems: 'center'}}
      />
      <Text>MyListing</Text>
    </View>
  );
};

export default memo(MyListing);
