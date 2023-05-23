const getCredentials = () => {
  if (__DEV__)
    return {
      baseURL: 'https://virtualrealitycreators.com/stound/api/',
      imageURL: 'https://virtualrealitycreators.com/stound/',
      // baseURL: 'http://10.32.27.153:5000/api/',
    };
  else {
    console.log = () => {};
    return {
      baseURL: 'https://virtualrealitycreators.com/stound/api',
      imageURL: 'https://virtualrealitycreators.com/stound/',
    };
  }
};

export const {baseURL, imageURL} = getCredentials();

export const apendUrl = url => {
  return baseURL + url;
};
export const imageUrl = url => {
  console.log('jsbdfjkbdjklbf', url);
  return imageURL + url;
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
