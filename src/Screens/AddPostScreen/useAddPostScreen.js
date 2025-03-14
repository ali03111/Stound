import {useCallback, useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {createAdsUrl, updateAdsUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import axios from 'axios';
import {navigationRef} from '../../../RootNavigation';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = ({navigate}, {params}) => {
  const item = params;
  console.log('item123123123', item);

  const {dispatch, getState} = useReduxStore();

  const {recentLocation} = getState('recentlocation');

  const bathRooms = ['1', '2', '3', '4', '5', '6', '7+'];
  const bedRooms = ['1', '2', '3', '4', '5', '6', '7+'];
  const {handleSubmit, errors, reset, control, getValues, resetField} =
    useFormHook(Schemas.addPost, {
      title: item?.title ?? '',
      desc: item?.description ?? '',
      number: item?.price?.toString() ?? '',
      areaSize: item?.areaSize?.toString() ?? '',
    });
  // Retrieve values of form fields
  const title = getValues('title');
  const desc = getValues('desc');
  const number = getValues('number');
  const areaSize = getValues('areaSize');
  const numberRegex = /^[0-9]+$/;

  //For Picker
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(item?.country_code?.toUpperCase());
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(item?.country);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [category, setCategory] = useState(item?.category);
  console.log(item, 'aklsdfjalsdjflkdjs');

  const [preferencesData, setPreferencesData] = useState([]);
  const [preferencesVal, setPreferencesVal] = useState({
    adType: item?.adType ?? 'Rent',
    gp: item?.generalPref ?? [],
    ip: item?.insidePref ?? [],
    op: item?.outsidePref ?? [],
    cat: item?.categoryDetail?.categoryId ?? null,
    bedRoom: item?.rooms || 1,
    bathRoom: item?.bathrooms || 1,
    images: [],
    location: item?.location,
    uploadedImages: item?.photos ?? [],
  });
  console.log(preferencesData, 'asjdfklajsdflkjsdflkj');
  const {
    gp,
    ip,
    op,
    bathRoom,
    bedRoom,
    cat,
    images,
    adType,
    location,
    uploadedImages,
  } = preferencesVal;

  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError);
  };

  const onSelecteTag = (item, key) => {
    console.log(key, item, 'keyueueu11');
    updateState({[key]: item});
  };

  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        quality: 1,
        // maxWidth: 300,
        // maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          const selectedImages = res?.assets || [];

          if (images.length + selectedImages.length <= 10) {
            updateState({images: [...images, ...selectedImages]});
          } else {
            console.log("You can't select more than 10 images.");
            errorMessage("You can't select more than 10 images.");
          }
        }
      },
    );
  };

  const deleteImage = index => {
    const updatedImages = [...preferencesVal.images];
    updatedImages.splice(index, 1);
    setPreferencesVal(prev => ({...prev, images: updatedImages}));
  };
  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

  const getAllID = data => {
    const newArry = [];
    data.map(res => newArry.push(res.id));
    return newArry;
  };

  const postAddData = async ({title, desc, number, areaSize}) => {
    console.log('alsdkfjlakjsdiedkddi');
    dispatch(loadingTrue());

    if (
      images.length &&
      cat != null &&
      bedRoom != null &&
      bathRoom != null &&
      gp.length &&
      ip.length &&
      op.length &&
      location != '' &&
      numberRegex.test(number)
    ) {
      const body = {
        adType,
        category: cat,
        location,
        areaSize,
        price: number,
        title,
        description: desc,
        bathrooms: bathRoom,
        rooms: bedRoom,
        photos: images,
        generalPref: getAllID(gp),
        outsidePref: getAllID(op),
        insidePref: getAllID(ip),
      };
      console.log(body, '1231231 s dfasdfas');
      const {ok, data, status, originalError, problem} = await formDataFunc(
        createAdsUrl,
        body,
        'photos',
        true,
      );
      console.log(data, 'sadlkfjlsadkfj');
      if (ok) {
        updateState({
          images: [],
          gp: null,
          op: null,
          ip: null,
          cat: null,
          bedRoom: null,
          bathRoom: null,
          location: '',
          number,
        });
        // reset();
        dispatch(loadingFalse());
        successMessage(data?.message || 'Your Ad has been created ');
        navigate('HomeScreen');

        reset();
        setTimeout(() => {
          onResetState();
        }, 1000);
      } else {
        dispatch(loadingFalse());
        console.log('dfdfa', originalError, status, problem, data?.message);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      !numberRegex.test(number)
        ? errorMessage('Please correct your price')
        : errorMessage('Please comeplete all fields');
    }
  };

  const postEditData = async ({title, desc, number}) => {
    console.log('edit post');
    dispatch(loadingTrue());

    if (
      images.length ||
      (uploadedImages.length &&
        cat != null &&
        bedRoom != null &&
        bathRoom != null &&
        gp.length &&
        ip.length &&
        op.length &&
        location != '' &&
        numberRegex.test(number))
    ) {
      const body = {
        adId: item?.adId,
        title: title,
        rooms: bedRoom,
        description: desc,
        bathrooms: bathRoom,
        location,
        generalPref: getAllID(gp),
        insidePref: getAllID(ip),
        outsidePref: getAllID(op),
        category: cat,
        photos: images,
        oldImagesPaths: uploadedImages,
        price: number,
        adType,
      };
      console.log('edit post body', body);
      const {ok, data, status, originalError, problem} = await formDataFunc(
        updateAdsUrl,
        body,
        'photos',
        true,
      );
      console.log('data', data);
      console.log('skldbvklbsdlkvblksdbvklsdbvsbdkvbsdklvds', data);
      if (ok) {
        updateState({
          images: [],
          gp: null,
          op: null,
          ip: null,
          cat: null,
          bedRoom: null,
          bathRoom: null,
          location: '',
          number,
        });
        reset();
        dispatch(loadingFalse());
        successMessage(data?.message || 'Your Ad has been created ');
        navigationRef.goBack();

        reset();
        setTimeout(() => {
          onResetState();
        }, 1000);
      } else {
        dispatch(loadingFalse());
        console.log('error', originalError, status, problem, data?.message);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      !numberRegex.test(number)
        ? errorMessage('Please correct your price')
        : errorMessage('Please comeplete all fields');
    }
  };

  const postData = async ({title, desc, number}) => {
    if (params?.price) {
      postEditData({title, desc, number, areaSize});
    } else {
      postAddData({title, desc, number, areaSize});
    }
  };
  const useEffectFun = () => {
    getPreferences();
  };

  const getLocation = data => {
    updateState({location: data});

    console.log(data);
  };
  const sendLocation = () => {
    navigate('LocationScreen', {getLocation});
  };
  useEffect(useEffectFun, []);

  const onResetState = useCallback(() => {
    // resetField('desc')

    reset();
    updateState({
      images: [],
      gp: null,
      op: null,
      ip: null,
      cat: null,
      bedRoom: null,
      bathRoom: null,
      location: '',
    });
    setStateData([]);
    setCityData([]);
  }, []);

  const validateForm = () => {
    const title = getValues('title');
    const desc = getValues('desc');
    const number = getValues('number');
    const areaSize = getValues('areaSize');

    if (!title || title.length < 10) {
      errorMessage(
        'Title cannot be null and must be at least 10 characters long',
      );
      return;
    }
    if (!areaSize) {
      errorMessage(
        'areaSize cannot be null and must be at least 1 characters long',
      );
      return;
    }

    if (!desc || desc.length < 15) {
      errorMessage(
        'Description cannot be null or description must be at least 15 characters long ',
      );
      return;
    }

    if (!number) {
      errorMessage('Price is required');
      return;
    }

    if (isNaN(number) || Number(number) <= 0) {
      errorMessage('Please enter a valid positive number for price');
      return;
    }

    if (location == '') {
      errorMessage('Location cannot be empty');
      return;
    }

    // if (!country) {
    //   errorMessage('Country cannot be empty');
    //   return;
    // }
    if (!bathRoom) {
      errorMessage('Bathrooms must select');
      return;
    }
    if (!bedRooms) {
      errorMessage('Rooms must select');
      return;
    }
    return true;
    // if (images.length > 0) {
    //   errorMessage('Please upload the image');
    //   return;
    // }

    // if (gp.length > 0) {
    //   errorMessage('General Preferences please must select');
    //   return;
    // }
    // if (op.length > 0) {
    //   errorMessage('Outside Preferences please must select');
    //   return;
    // }
    // if (ip.length > 0) {
    //   errorMessage('Inside Preferences please must select');
    //   return;
    // }
  };
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    dynamicNav,
    preferencesData,
    preferencesVal,
    gp,
    ip,
    op,
    onSelecteTag,
    bedRoom,
    bedRooms,
    bathRoom,
    bathRooms,
    cat,
    postData,
    uploadFromGalary,
    images,
    onRefresh: getPreferences,
    recentLocation,
    sendLocation,
    location,
    deleteImage,
    onResetState,
    countryData,
    stateData,
    cityData,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    countryName,
    setCountryName,
    stateName,
    setStateName,
    cityName,
    setCityName,
    // handleState,
    // handleCity,
    setCityData,
    isFocus,
    setIsFocus,
    isFocus1,
    setIsFocus1,
    isFocus2,
    setIsFocus2,
    title,
    desc,
    number,
    numberRegex,

    validateForm,
    category,
    setCategory,
    uploadedImages,
    adType,
    areaSize,
    updateState,
  };
};

export default useAddPostScreen;
