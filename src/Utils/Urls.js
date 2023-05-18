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

export const {baseURL,imageURL} = getCredentials();

export const apendUrl = url => {
  return baseURL + url;
};
export const imageUrl = url => {
  console.log("jsbdfjkbdjklbf",url)
  return imageURL + url;
};

export const registerUrl = apendUrl('auth/register');
export const loginUrl = apendUrl('auth/login');
export const logoutUrl = apendUrl('auth/logout');
export const getPreUrl = apendUrl('get-preferences');
export const getAdsUrl = apendUrl('get-ads');
export const createAdsUrl = apendUrl('create-ad');
export const getfavourites = apendUrl('get-favourites');
