import SocialLoginScreen from '.';
import {
  appleIdlogin,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';

const useSocialLoginScreen = ({navigate}) => {
  const contWithEmail = () => {
    navigate('LoginScreen');
  };

  const appleIdAuth = async () => {
    try {
      const data = await appleIdlogin();
      console.log('data', data);
    } catch (error) {
      console.log('err', error);
    }
  };
  const googleAuth = async () => {
    try {
      const data = await googleLogin();
      console.log('data', data);
    } catch (error) {
      console.log('err', error);
    }
  };
  const facebookAuth = async () => {
    try {
      const data = await faceBookLogin();
      console.log('data', data);
    } catch (error) {
      console.log('err', error);
    }
  };

  return {contWithEmail, appleIdAuth, googleAuth, facebookAuth};
};
export default useSocialLoginScreen;
