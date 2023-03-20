const getCredentials = () => {
  if (__DEV__)
    return {
      baseURL: 'http://192.168.20.107:5000/api/',
      // baseURL: 'http://10.32.27.153:5000/api/',
    };
  else {
    console.log = () => {};
    return {
      baseURL: 'https://virtualrealitycreators.com/Believe-Backend/api',
    };
  }
};

export const {baseURL} = getCredentials();

const apendUrl = url => {
  return baseURL + url;
};

export const registerUrl = apendUrl('auth/register');
export const loginUrl = apendUrl('auth/login');
