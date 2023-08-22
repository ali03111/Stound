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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [profileData, setProfileData] = useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // const {images} = profileData;

  const updateState = data => setProfileData(prev => ({...prev, ...data}));

  const uploadFromGalary = () => {
    // console.log(images, 'alsdkjfasdsaklasjf');

    launchImageLibrary(
      {
        selectionLimit: 1,
        quality: 1,
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
      },
      res => {
        if (!res?.didCancel) {
          console.log('image', res.assets);
          setProfileData(res?.assets[0]);
        }
      },
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  // , image: images
  const updateProfile = ({name, number}) => {
    console.log(number, name, profileData, 'ueiueieieu');
    console.log('sdfhjalksdfjkldjsfkj', profileData.uri);
    console.log('sdfhjalksdfjkldjsfkj', Boolean(profileData.uri));
    {Boolean(profileData.uri) ?dispatch(
      updateUser({
        profileData: {
          name,
          number,
          image:  profileData
        },
      }),
    ):
    dispatch(
      updateUser({
        profileData: {
          name,
          number,
        },
      }),
      )}
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
    profileData,
    // images,
    updateProfile,
  };
};

export default useEditProfileScreen;
