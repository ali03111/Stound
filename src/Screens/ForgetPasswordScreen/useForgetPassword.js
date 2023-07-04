import {firebase} from '@react-native-firebase/auth';
import useReduxStore from '../../Hooks/UseReduxStore';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useForgetPassword = ({goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.forgot,
  );
  const {dispatch} = useReduxStore();

  //ForgetPassword Code
  const forgetFunction = async ({email}) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      goBack();
      // Password reset email sent successfully
      successMessage('Password reset email sent!');
    } catch (e) {
      errorMessage('Email are not found');
      console.error('error=>', e);
    }
    // An error occurred
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    goBack,
    forgetFunction,
    getValues,
  };
};
export default useForgetPassword;
