import {useState} from 'react';
import Schemas from '../../Utils/Validation';
import useReduxStore from '../../Hooks/UseReduxStore';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');

const useEditProfileScreen = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );

  const {getState} = useReduxStore();

  const {userData} = getState('Auth');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    hideDatePicker,
    isDatePickerVisible,
    showDatePicker,
    handleConfirm,
    goBack,
    userData,
  };
};

export default useEditProfileScreen;
