import {useState} from 'react';
import Schemas from '../../Utils/Validation';
import useReduxStore from '../../Hooks/UseReduxStore';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateAuth, updateUser} from '../../Redux/Action/AuthAction';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');

const useEditProfileScreen = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );

  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');
  console.log('userData', userData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [profileData, setProfileData] = useState({
    images: {},
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const {images} = profileData;

  const updateState = data => setProfileData(prev => ({...prev, ...data}));

  const uploadFromGalary = () => {
    console.log(images, 'alsdkjfasdsaklasjf');

    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          console.log('image', res.assets);
          updateState({images: res?.assets[0]});
        }
      },
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const updateProfile = ({name, number}) => {
    dispatch(updateUser({profileData: {name, number, image: images}}));
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
    uploadFromGalary,
    images,
    updateProfile,
  };
};

export default useEditProfileScreen;
