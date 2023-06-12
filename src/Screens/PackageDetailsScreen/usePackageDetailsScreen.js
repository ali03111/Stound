import {useEffect} from 'react';
import {PackageDetailData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {notifyUserUrl} from '../../Utils/Urls';

const usePackageDetailsScreen = ({params}) => {
  const {
    items: {
      userDetail,
      outsidePref,
      price,
      insidePref,
      generalPref,
      title,
      photos,
      location,
      adType,
    },
  } = params;

  // const useEffectFun = async () => {
  //   const {ok, data} = await API.put(notifyUserUrl + params.items.adId);
  //   // console.log('data', data, params.items);
  // };

  // useEffect(useEffectFun, []);

  return {
    PackageDetailData,
    userDetail,
    outsidePref,
    price,
    insidePref,
    generalPref,
    title,
    photos,
    location,
    adType,
  };
};

export default usePackageDetailsScreen;
