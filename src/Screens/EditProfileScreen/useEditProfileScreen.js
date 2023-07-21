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
    dispatch(updateUser({profileData: {name, number, image: profileData}}));

    // Create FormData object to send the image as multipart form data
    // const formData = new FormData();
    // formData.append('image', {
    //   uri: images.uri,
    //   type: images.type,
    //   name: images.fileName || 'image.jpg',
    // });
    // formData.append('name', 'John Doe1'); // Add name field
    // formData.append('number', '1234567890'); // Add number field

    // // Set your bearer token here
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlhdCI6MTY4NzI3NTA0OH0.Wf_phuoel0YJVsDPUKA359hQcIw4NqzOzn4I51Iy3Y0';

    // // Send the FormData object to the server
    // fetch('https://virtualrealitycreators.com/stound/api/auth/update-user', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${token}`, // Include bearer token in the request header
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Upload response:', data);
    //     // Handle the response from the server
    //   })
    //   .catch(error => {
    //     console.log('Upload error:', error);
    //     // Handle any errors that occur during the upload
    //   });
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
