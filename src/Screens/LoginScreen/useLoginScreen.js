// import {errorMessage} from '../../Components/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { loginUser } from '../../Redux/Action/AuthAction';
import { faceBookLogin } from '../../Utils/SocialLogin';
// import {loginUser} from '../../Redux/Actions/AuthAction';
// import API from '../../Utils/helperFunction';
// import {
//   faceBookLogin,
//   googleLogin,
//   PhoneNumberLogin,
//   verifyCode,
// } from '../../Utils/SocialLogin';
// import {loginUrl} from '../../Utils/Url';

const { default: useFormHook } = require('../../Hooks/UseFormHooks');
const { default: Schemas } = require('../../Utils/Validation');

const useLogin = ({ navigate, goBack }) => {
  const { handleSubmit, errors, reset, control, getValues } = useFormHook(
    Schemas.logIn,
  );
  const { dispatch } = useReduxStore();

  const appleIdAuth = () => dispatch(loginUser({ type: 'appleID', datas: {} }));

  const googleAuth = async () => {
    dispatch(loginUser({ type: 'Google', datas: {} }));
  };
  const facebookAuth = async () => {
    try {
      const data = await faceBookLogin();
      console.log('data', data);
    } catch (error) {
      console.log('err', error);
    }
  };
  const register = () => navigate('RegisterScreen');
  const loginWithEmail = ({ email, password }) => {
    dispatch(loginUser({ type: 'email', datas: { email, password } }));


  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc: facebookAuth,
    googleLoginFunc: googleAuth,
    register,
    loginWithEmail,
    goBack,
    appleIdAuth,
  };
};

export default useLogin;
