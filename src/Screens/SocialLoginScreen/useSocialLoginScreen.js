import SocialLoginScreen from '.';

const useSocialLoginScreen = ({navigate}) => {
  const contWithEmail = () => {
    navigate('LoginScreen');
  };
  return {contWithEmail};
};
export default useSocialLoginScreen;
