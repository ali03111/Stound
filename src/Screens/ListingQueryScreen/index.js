import {memo, useCallback} from 'react';
import useListingQueryScreen from './useListingQueryScreen';
import {FlatList, View} from 'react-native';
import Header from '../../Components/Header';
import {arrowback} from '../../Assets';
import {styles} from './styles';
import {keyExtractor} from '../../Utils';
import {hp, wp} from '../../Config/responsive';
import NotificationComp from '../../Components/Notification';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import {capitalizeFirstLetter} from '../../Utils/glodbalFunction';

const ListingQueryScreen = ({navigation, route}) => {
  const {queryData, getListingData, toSeeDetails} = useListingQueryScreen(
    navigation,
    route,
  );

  const renderItem = useCallback(({item, index}) => {
    console.log(item, index, 'MY LISTINGIGNIGNIGN');
    return (
      <NotificationComp
        image={imageUrl(item?.profilePicture)}
        name={capitalizeFirstLetter(item?.name)}
        description={item?.answer}
        time={item?.createdAt}
        onPress={() => {
          toSeeDetails(item);
          // navigation.navigate('HeaderDetailScreen', {
          //   userDetail: item,
          //   adDetail: queryData?.ad,
          // });
          //   onCancel(coinAlert, 'coinAlert', index, item);
          // onCancel(item);
        }}
      />
    );
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      <Header
        style={styles.topHeader}
        headerTitle={'Inquiries'}
        backText={'Back'}
        arrowBackIcon={arrowback}
        goBack={() => navigation.goBack()}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={queryData?.interested_users}
        renderItem={renderItem}
        contentContainerStyle={{
          alignSelf: 'center',
          paddingBottom: hp('15'),
        }}
        refreshing={false}
        onRefresh={getListingData}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          queryData?.interested_users.length == 0 && (
            <View
              style={{
                justifyContent: 'center',
                height: hp('80'),
              }}>
              <EmptyViewComp onRefresh={getListingData} />
            </View>
          )
        }
      />
    </View>
  );
};

export default memo(ListingQueryScreen);
