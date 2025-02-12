import {useEffect, useState} from 'react';
import Schemas from '../../Utils/Validation';
import useReduxStore from '../../Hooks/UseReduxStore';
import {launchImageLibrary} from 'react-native-image-picker';
import {updateAuth, updateUser} from '../../Redux/Action/AuthAction';
import API from '../../Utils/helperFunc';
import {getPreUrl} from '../../Utils/Urls';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');

const useEditProfileScreen = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );

  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const options = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Buy', value: 'Buy'},
  ];
  console.log(item?.categoryDetail?.categoryId, 'asdf1111asdf');
  const item = null;
  const [category, setCategory] = useState(item?.category);
  const [preferencesData, setPreferencesData] = useState([]);
  const [preferencesVal, setPreferencesVal] = useState({
    gp: item?.generalPref ?? [],
    ip: item?.insidePref ?? [],
    op: item?.outsidePref ?? [],
    cat: item?.categoryDetail?.categoryId ?? null,
    rooms: item?.rooms,
    bathRoom: item?.bathrooms,
    images: [],
    type: item?.adType ?? options[0].value,
    location: item?.location,
    uploadedImages: item?.photos ?? [],
  });

  const {
    gp,
    ip,
    op,
    bathRoom,
    rooms,
    cat,
    images,
    type,
    location,
    uploadedImages,
  } = preferencesVal;
  const updateState1 = data => setPreferencesVal(prev => ({...prev, ...data}));

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
  const updateProfile = ({name, number, description}) => {
    console.log(number, name, profileData, 'ueiueieieu');
    console.log('sdfhjalksdfjkldjsfkj', profileData.uri);
    console.log('sdfhjalksdfjkldjsfkj', Boolean(profileData.uri));
    {
      Boolean(profileData.uri)
        ? dispatch(
            updateUser({
              profileData: {
                name,
                number,
                description,
                image: profileData,
              },
            }),
          )
        : dispatch(
            updateUser({
              profileData: {
                name,
                number,
                description,
              },
            }),
          );
    }
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  useEffect(() => {
    getPreferences();
  }, []);

  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError);
  };

  const onSelecteTag = (item, key) => {
    console.log(key, item, 'keyueueu11');
    updateState1({[key]: item});
  };

  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

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
    options,
    onSelecteTag,
    cat,
    category,
    setCategory,
    preferencesData,
    preferencesVal,
    gp,
    ip,
    op,
    dynamicNav,
  };
};

export default useEditProfileScreen;
