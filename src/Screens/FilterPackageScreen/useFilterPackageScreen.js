import {useEffect, useState} from 'react';
import {favouriteData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {getfavouritesUrl, updateFavUrl} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';

const useFilterPackageScreen = ({navigate, addListener}, {params}) => {
  const {items} = params;
  console.log(items, 'lakjsfkljalk');
  const onPress = data => navigate('PackageDetailsScreen', {items: data});

  const [favData, setFavData] = useState(items?.data || []);

  //   const getFav = async () => {
  //     try {
  //       const {data, ok, originalError} = await API.get(getfavouritesUrl);
  //       if (ok) setFavData(data.data.ads);
  //     } catch (error) {
  //       errorMessage(error.message.split(' ').slice(1).join(' '));
  //     }
  //   };

  const updateFav = async item => {
    const url = updateFavUrl + item.adId;
    const {ok, originalError, data} = await API.put(url);
    if (ok) {
      setFavData(data.data.ads);
      successMessage(data?.message);
    } else errorMessage(originalError.message.split(' ').slice(1).join(' '));
  };

  //   const useEffectFuc = () => {
  //     const event = addListener('focus', getFav);
  //     return event;
  //   };

  //   useEffect(, []);

  return {favouriteData: favData, onPress, favData, updateFav};
};

export default useFilterPackageScreen;
