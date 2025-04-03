import {useEffect, useRef, useState} from 'react';
import API from '../../Utils/helperFunc';
import {interestedUserUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Config/NotificationMessage';
import {Alert} from 'react-native';
import useReduxStore from '../../Hooks/UseReduxStore';

const useListingQueryScreen = ({navigate}, {params}) => {
  const [listing, setListing] = useState();
  const {getState} = useReduxStore();
  const {userData} = getState('Auth');

  const listingRef = useRef();

  // console.log(
  //   'listinglistinglistinglistinglistinglisting',
  //   JSON.stringify(listing?.ad),
  // );

  const getListingData = async () => {
    const {ok, data} = await API.get(interestedUserUrl + params?.adId);
    console.log(data, 'alksjdlkajsdwwwlfkjaklsd');
    if (ok) {
      setListing(data);
      listingRef.current = data;
    } else errorMessage(data.message || 'request failed');
  };

  const onAlertConfirmation = item => {
    console.log(
      'dsuvsdbbsdvbsdiovbodisbviosdbviobdioboiadbiovad',
      listingRef.current,
    );
    if (item?.coinUsed) {
      // If coin is used, navigate directly to the detail screen.
      navigate('HeaderDetailScreen', {
        userDetail: item,
        adDetail: listingRef.current?.ad,
        coinUsed: true,
        adId: params?.adId,
      });
    } else if (userData?.isSubscribed) {
      // If the user is subscribed, set the state and navigate to the detail screen.
      navigate('HeaderDetailScreen', {
        userDetail: item,
        adDetail: listingRef.current?.ad,
        coinUsed: true,
        adId: params?.adId,
      });
    } else {
      // If the user is not subscribed, navigate to the BuyCoinScreen and pass isSub.
      navigate('BuyCoinScreen', {
        items: {
          userDetail: item,
          adDetail: listingRef.current?.ad,
          coinUsed: true,
        },
        isSub: true,
      });
    }
  };

  const toSeeDetails = item => {
    Alert.alert(
      userData?.coins > 0 ? 'Confirmation Alert' : 'Warning',
      userData?.coins > 0
        ? 'Want to use 1 coin to see the details?'
        : 'You not have enough coin to see this. Want to buy coins?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: userData?.coins > 0 ? 'Yes' : 'Buy',
          onPress: () => {
            onAlertConfirmation(item);
            //  if(userData?.coins >0) {
            //   navigate('HeaderDetailScreen', {
            //     userDetail: item,
            //     adDetail: listing?.ad,
            //   })
            //  }else{

            //  }
          },
        },
      ],
    );
  };

  useEffect(() => {
    getListingData();
  }, []);

  return {queryData: listing, getListingData, toSeeDetails};
};
export default useListingQueryScreen;
