import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {registerUser} from '../../Redux/Action/AuthAction';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useRegister = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.signUp,
  );
  const {dispatch} = useReduxStore();

  //FOR Country Code Flag
  const [countryCode, setCountryCode] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const registerWithEmail = ({name, email, password, number}) => {
    dispatch(
      registerUser({type: 'email', datas: {email, password, name, number}}),
    );
  };

  const register = () => navigate('LoginScreen');

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
    registerWithEmail,
    goBack,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    isFocus,
    setIsFocus,
  };
};

export default useRegister;
