import {useCallback, useEffect, useState} from 'react';
import {favouriteData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {getfavouritesUrl, updateFavUrl} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useFocusEffect } from '@react-navigation/native';

const useFavourateScreen = ({navigate, addListener}) => {
  const {getState} = useReduxStore();
  const onPress = data => navigate('PackageDetailsScreen', {items: data});
  const {isloading} = getState('isloading');

  const [favData, setFavData] = useState([]);

  const getFav = async () => {
    try {
      const {data, ok, originalError} = await API.get(getfavouritesUrl);
      if (ok) setFavData(data.data.ads);
    } catch (error) {
      errorMessage(error.message.split(' ').slice(1).join(' '));
    }
  };

  const updateFav = async item => {
    const url = updateFavUrl + item.adId;
    const {ok, originalError, data} = await API.put(url);
    if (ok) {
      setFavData(data.data.ads);
      successMessage(data?.message);
    } else errorMessage(originalError.message.split(' ').slice(1).join(' '));
  };
  


  const useEffectFuc = () => {
    const event = addListener('focus', getFav);
    return event;
  };

  useEffect(useEffectFuc, []);



  return {
    favouriteData: favData.slice().reverse(),
    onPress,
    favData,
    getFav,
    updateFav,
    isloading,
  };
};

export default useFavourateScreen;
