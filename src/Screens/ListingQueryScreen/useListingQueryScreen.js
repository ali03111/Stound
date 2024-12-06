import {useEffect, useState} from 'react';
import API from '../../Utils/helperFunc';
import {interestedUserUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Config/NotificationMessage';

const useListingQueryScreen = ({navigate}, {params}) => {
  const [listing, setListing] = useState();

  const getListingData = async () => {
    const {ok, data} = await API.get(interestedUserUrl + params?.adId);
    console.log(data, 'alksjdlkajsdwwwlfkjaklsd');
    if (ok) {
      setListing(data?.data);
    } else errorMessage(data.message || 'request failed');
  };

  useEffect(() => {
    getListingData();
  }, []);

  return {queryData: listing, getListingData};
};
export default useListingQueryScreen;
