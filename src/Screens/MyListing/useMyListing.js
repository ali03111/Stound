import {useEffect, useState} from 'react';
import {errorMessage} from '../../Config/NotificationMessage';
import API from '../../Utils/helperFunc';
import {getMyAdsUrl} from '../../Utils/Urls';

const useMyListing = ({navigate, addListener}) => {
  const [listing, setListing] = useState();

  const getListingData = async () => {
    const {ok, data} = await API.get(getMyAdsUrl);
    console.log(data, 'alksjdlkajsdwwwlfkjaklsd');
    if (ok) {
      // dispatch({type: types.UpdateProfile, payload: data.user});
      setListing(data?.data);
    } else errorMessage(data.message || 'request failed');
  };

  useEffect(() => {
    getListingData();
    return () => {
      console.log('GETLISTING DATA BACK');
    };
  }, []);

  return {listingData: listing};
};
export default useMyListing;
