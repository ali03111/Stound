const getCredentials = () => {
  if (__DEV__)
    return {
      // baseURL: 'https://virtualrealitycreators.com/stound/api/',
      // imageURL: 'https://virtualrealitycreators.com/stound/',
      baseURL: 'https://stound.co/stound/api/',
      imageURL: 'https://stound.co/stound/',
      // inAppUrl: 'https://sandbox.itunes.apple.com/verifyReceipt',
    };
  else {
    console.log = () => {};
    return {
      baseURL: 'https://stound.co/stound/api/',
      imageURL: 'https://stound.co/stound/',

      // baseURL: 'https://virtualrealitycreators.com/stound/api/',
      // imageURL: 'https://virtualrealitycreators.com/stound/',
      // inAppUrl: 'https://buy.itunes.apple.com/verifyReceipt',
    };
  }
};

export const {baseURL, imageURL} = getCredentials();

export const apendUrl = url => {
  return baseURL + url;
};
export const imageUrl = url => {
  return url
    ? imageURL + url
    : // : 'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg';
      '';
};

export const registerUrl = 'auth/register';
export const loginUrl = 'auth/login';
export const logoutUrl = 'auth/logout';
export const updateUserUrl = 'auth/update-user';
export const getPreUrl = 'get-preferences';
export const getAdsUrl = 'get-ads';
export const createAdsUrl = 'create-ad';
export const getfavouritesUrl = 'get-favourites';
export const updateFavUrl = 'update-favourites/';
export const addQuesUrl = 'add-question';
export const deviceIdUrl = 'auth/update-device-id/';
export const notifyUserUrl = 'buyer-interested/';
export const getAllNotificationUrl = 'get-user-notifications/';
export const getAgoraTokenUrl = 'getAccessToken/';
export const updateAdImage = 'update-ad-photos';
export const FilterAdsUrl = 'filter-ads';
export const searchAdsUrl = 'search-ads';
export const deleteAccUrl = 'auth/delete-user/';
export const iosAppUrl = 'inApp-ios';
export const androidAppUrl = 'inApp-android';
export const useCoinUrl = 'use-coin';
