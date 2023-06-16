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
  console.log(agoraId, userDetail, 'skldfjklsdfjlkjsdfkl');
  const useEffectFun = async () => {
    const {ok, data} = await API.put(notifyUserUrl + params.items.adId);
  };

  useEffect(useEffectFun, []);

  const navigationChatScreen = () => {
    navigate('MessagesScreen', {id: agoraId, userDetail});
    // navigate('MessagesScreen', {id: users[0]?.userId, userDetail: users[0]});
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
