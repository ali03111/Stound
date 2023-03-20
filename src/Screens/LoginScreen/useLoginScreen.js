// import {errorMessage} from '../../Components/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
// import {loginUser} from '../../Redux/Actions/AuthAction';
// import API from '../../Utils/helperFunction';
// import {
//   faceBookLogin,
//   googleLogin,
//   PhoneNumberLogin,
//   verifyCode,
// } from '../../Utils/SocialLogin';
// import {loginUrl} from '../../Utils/Url';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useLogin = ({navigate}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.logIn,
  );
  const {dispatch} = useReduxStore();

  //   const facebookLoginFunc = () => {
  //     faceBookLogin()
  //       .then(res => {
  //         if (res.additionalUserInfo.isNewUser == false) {
  //           let data = {
  //             email: res.additionalUserInfo.profile.email,
  //             password: '',
  //             providerId: res.additionalUserInfo.providerId,
  //           };
  //           loginWithEmail(data);
  //         } else navigate('RegisterScreen', {...res.additionalUserInfo});
  //       })
  //       .catch(err => console.log('error', err));
  //   };
  //   const googleLoginFunc = () => {
  //     googleLogin()
  //       .then(res => navigate('RegisterScreen', {...res.additionalUserInfo}))
  //       .catch(err => console.log('error', err));
  //   };

  //   const PhoneNumberLoginFuc = async ({number}) => {
  //     try {
  //       const confirm = await PhoneNumberLogin(number);
  //       navigate('OtpScreen', {number, confirm});
  //     } catch (error) {
  //       console.log('err', error);
  //     }
  //   };

  //   const loginWithEmail = async ({email, password, providerId}) => {
  //     const {ok, data} = await API.post(loginUrl, {
  //       email,
  //       password,
  //       providerId: providerId || 'email.com',
  //     });
  //     if (ok) dispatch(loginUser(data));
  //     else {
  //       errorMessage(data?.data || 'Network request failed');
  //     }
  //   };

  const register = () => navigate('RegisterScreen');
  const loginWithEmail = () => navigate('MybottomTabs');

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc: () => {},
    googleLoginFunc: () => {},
    PhoneNumberLoginFuc: () => {},
    register,
    loginWithEmail,
  };
};

export default useLogin;
