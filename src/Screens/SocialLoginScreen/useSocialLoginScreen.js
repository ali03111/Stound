import useReduxStore from '../../Hooks/UseReduxStore';
import { loginUser } from '../../Redux/Action/AuthAction';
import { faceBookLogin } from '../../Utils/SocialLogin';

const useSocialLoginScreen = ({ navigate }) => {
  const contWithEmail = () => {
    navigate('RegisterScreen');
  };
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
      console.log('facebookError', error);
    }
  };

  return { contWithEmail, appleIdAuth, googleAuth, facebookAuth };
};
export default useSocialLoginScreen;
