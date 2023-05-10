import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser} from '../../Redux/Action/AuthAction';

const useAccountScreen = ({navigate}) => {
  const dynamicNav = res => navigate(res);
  const {dispatch, getState} = useReduxStore();
  const {userData} = getState('Auth');

  console.log('use', userData);
  const [alerState, setAlertState] = useState({
    logOut: false,
    deactivate: false,
  });

  const {deactivate, logOut} = alerState;

  const updateState = data => setAlertState(() => ({...alerState, ...data}));

  const onConfirm = () => {
    updateState({logOut: false});
    setTimeout(() => {
      dispatch(logOutUser());
    }, 1000);
  };
  const onCancel = (state, stateName) => {
    updateState({[stateName]: !state});
  };

  return {dynamicNav, logOut, deactivate, onCancel, onConfirm, userData};
};

export default useAccountScreen;
