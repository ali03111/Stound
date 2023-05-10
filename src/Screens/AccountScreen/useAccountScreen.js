import {useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import {logOutUser} from '../../Redux/Action/AuthAction';

const useAccountScreen = ({navigate}) => {
  const dynamicNav = res => navigate(res);
  const {dispatch} = useReduxStore();

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

  return {dynamicNav, logOut, deactivate, onCancel, onConfirm};
};

export default useAccountScreen;
