import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser} from '../../Redux/Action/AuthAction';
import API from '../../Utils/helperFunc';
import {deleteAccUrl} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
const useAccountScreen = ({navigate}) => {
  const dynamicNav = res => navigate(res);
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');
  const [alerState, setAlertState] = useState({
    logOut: false,
    deactivate: false,
  });

  const {deactivate, logOut} = alerState;

  const updateState = data => setAlertState(() => ({...alerState, ...data}));

  const onConfirm = () => {
    updateState({logOut: false});
    dispatch(logOutUser());
  };
  const onCancel = (state, stateName) => {
    updateState({[stateName]: !state});
  };

  //Delete Account All Database
  const onDeleteConfirm = async () => {
    try {
      const {ok, data} = await API.delete(deleteAccUrl + userData?.uid);
      if (ok) {
        successMessage(data?.message);
        updateState({deactivate: false});
        dispatch(logOutUser());
      }
    } catch (e) {
      errorMessage(e?.message);

      console.log(e.message);
    }
  };

  //CHANGE PASSWORD IN FIREBASE

  const ChangePassword = () => {
    const user = auth().currentUser; // or fetch the user by email
    const newPassword = 'Test@1234';

    user
      .updatePassword(newPassword)
      .then(() => {
        console.log('Password updated successfully.');
      })
      .catch(error => {
        console.log('Error updating password:', error);
      });
  };
  return {
    dynamicNav,
    logOut,
    deactivate,
    onCancel,
    onConfirm,
    userData,
    onDeleteConfirm,
  };
};

export default useAccountScreen;
