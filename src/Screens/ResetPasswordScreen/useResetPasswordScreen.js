import {firebase} from '@react-native-firebase/auth';
import {store} from '../../Redux/Reducers';
import {updateAuth} from '../../Redux/Action/AuthAction';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');
// const firebase = require('firebase/app');

const useResetPasswordScreen = ({goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.newPassword,
  );

  //CHANGE PASSWORD CODE FROM FIRBASE
  // const firebaseConfig = {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  //   projectId: "YOUR_PROJECT_ID",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //   appId: "YOUR_APP_ID"
  //   // Your Firebase configuration
  // };

  // const changePassword = async currentPassword => {
  //   store.dispatch(loadingTrue());
  //   const { new_password, password } = currentPassword;
  //   var user = firebase.auth().currentUser;
  //   try {
  //     const reauthenticate = currentPassword => {
  //       var crd = firebase.auth.EmailAuthProvider.credential(
  //         user.email,
  //         currentPassword,
  //       );
  //       console.log('usesssr', crd)
  //       return user.reauthenticateWithCredential(crd);

  //     };
  //     const a1 = await reauthenticate(password);
  //     console.log('usesssr', a1)
  //     await user.updatePassword(new_password);
  //     successMessage('Your password has been changed');
  //     goBack();
  //   } catch (error) {
  //     console.log('error ======????????', error);
  //     errorMessage('Current password is wrong');
  //   } finally {
  //     store.dispatch(loadingFalse());

  //   }
  // };
  const changePassword = async currentPassword => {
    store.dispatch(loadingTrue());
    const {new_password, password} = currentPassword;
    console.log(new_password, password, 'asasdasd');
    var user = firebase.auth().currentUser;
    try {
      const reauthenticate = password => {
        // Pass only the password as an argument
        var crd = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password,
        );
        console.log('credential:', crd);
        return user.reauthenticateWithCredential(crd);
      };
      await reauthenticate(password); // Pass only the password
      await user.updatePassword(new_password);
      successMessage('Your password has been changed');
      goBack();
    } catch (error) {
      console.log('error:', error);
      errorMessage('Current password is wrong');
    } finally {
      store.dispatch(loadingFalse());
    }
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    changePassword,
  };
};

export default useResetPasswordScreen;
