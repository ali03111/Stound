import {useEffect} from 'react';
import {PackageDetailData} from '../../Utils/localDB';
import API from '../../Utils/helperFunc';
import {notifyUserUrl} from '../../Utils/Urls';

const usePackageDetailsScreen = ({params}, {navigate}) => {
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
      userDetail: {agoraId},
    },
  } = params;

  const useEffectFun = async () => {
    const {ok, data} = await API.put(notifyUserUrl + params.items.adId);
  };

  useEffect(useEffectFun, []);

  const navigationChatScreen = () => {
    navigate('MessagesScreen', {id: agoraId, userDetail});
  };

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
    navigationChatScreen,
  };
};

export default usePackageDetailsScreen;
