import { useEffect, useState } from 'react';
import { errorMessage } from '../../Config/NotificationMessage';
import { getfavourites } from '../../Utils/Urls';
import {favouriteData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';

const useFavourateScreen = ({navigate}) => {
  const onPress = () => navigate('PackageDetailsScreen');
  const [favouriteData, setFavouriteData] = useState([]);
  console.clear();
  
  const getFavouriteData = async () => {
    const {ok, data, originalError} = await API.get(getfavourites);
    if (ok) setFavouriteData(data);
    else errorMessage(originalError);
  };

  const useEffectFun = () => {
    getFavouriteData();
  };
  useEffect(useEffectFun, []);

  return {onFavouriteData:favouriteData, onPress};
};

export default useFavourateScreen;
