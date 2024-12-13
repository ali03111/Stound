import {useCallback, useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {createAdsUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import axios from 'axios';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = ({navigate}, {params}) => {
  const item = params;

  console.log(
    'paramsparamsparamsparamsparamsparamsparamsparamsparams',
    params?.price,
  );

  const {dispatch, getState} = useReduxStore();

  const {recentLocation} = getState('recentlocation');
  const {handleSubmit, errors, reset, control, getValues, resetField} =
    useFormHook(Schemas.addPost, {
      title: item?.title ?? '',
      desc: item?.description ?? '',
      // number: item?.price ?? '',
      number: '77',
    });
  // Retrieve values of form fields
  const title = getValues('title');
  const desc = getValues('desc');
  const number = getValues('number');
  const numberRegex = /^[0-9]+$/;

  const options = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Sell', value: 'Sell'},
  ];

  //For Picker
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState({
    value: item?.country,
    label: item?.country,
  });
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState({
    value: item?.country,
    label: item?.country,
  });
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [category, setCategory] = useState(item?.category);

  const [preferencesData, setPreferencesData] = useState([]);
  const [preferencesVal, setPreferencesVal] = useState({
    gp: item?.generalPref ?? [],
    ip: item?.insidePref ?? [],
    op: item?.outsidePref ?? [],
    cat: item?.category ?? null,
    rooms: item?.rooms,
    bathRoom: item?.bathrooms,
    images: [],
    type: item?.adType ?? options[0].value,
    location: item?.location,
    uploadedImages: item?.photos ?? [],
  });

  console.log(
    'preferencesDatapreferencesDatapreferencesDatapreferencesDatapreferencesData',
    preferencesData,
  );

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
            // You've reached the maximum limit, show an error message or take appropriate action.
            // You can also limit the selection in a different way here.
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

  // const postData = async ({title, desc, number}) => {
  //   console.log('asljdflkajsdflkajsdlfkjasldfkj');
  //   dispatch(loadingTrue());
  //   // if (!number || Number(number) === 0 || numberRegex.test(number)) {
  //   //   // Display error message if proposed_price is null or 0
  //   //   Alert.alert('Invalid', 'Price cannot be empty or zero.');
  //   //   return; // Exit the function early
  //   // }

  //   // if (!title || !desc || !number) {
  //   //   errorMessage('Please complete all fields before submitting.');
  //   //   return;
  //   // }
  //   if (
  //     images.length &&
  //     cat != null &&
  //     rooms != null &&
  //     bathRoom != null &&
  //     gp.length &&
  //     ip.length &&
  //     op.length &&
  //     location != ''
  //   ) {
  //     const body = {
  //       title: title,
  //       rooms: rooms,
  //       description: desc,
  //       bathrooms: bathRoom,
  //       location,
  //       generalPref: getAllID(gp),
  //       insidePref: getAllID(ip),
  //       outsidePref: getAllID(op),
  //       category: cat,
  //       photos: images,
  //       // price: number,
  //       adType: type,
  //       country: countryName,
  //       state: stateName,
  //       city: cityName,
  //     };
  //     console.log(body, 'alsdkaskldf');
  //     const {ok, data, status, originalError, problem} = await formDataFunc(
  //       createAdsUrl,
  //       body,
  //       'photos',
  //       true,
  //     );
  //     console.log(data, 'sadlkfjlsadkfj');
  //     if (ok) {
  //       updateState({
  //         images: [],
  //         gp: null,
  //         op: null,
  //         ip: null,
  //         cat: null,
  //         rooms: null,
  //         bathRoom: null,
  //         location: '',
  //         number,
  //       });
  //       // reset();
  //       dispatch(loadingFalse());
  //       successMessage(data?.message || 'Your Ad has been created ');
  //       navigate('HomeScreen');

  //       reset();
  //       setTimeout(() => {
  //         onResetState();
  //       }, 1000);
  //     } else {
  //       dispatch(loadingFalse());
  //       console.log('dfdfa', originalError, status, problem, data?.message);
  //       errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
  //     }
  //   } else {
  //     dispatch(loadingFalse());
  //     // !numberRegex.test(number)
  //     //   ? errorMessage('Please correct your price')
  //     errorMessage('Please comeplete all fields');
  //   }
  // };

  const postData = async ({title, desc, number}) => {
    console.log('alsdkfjlakjsdiedkddi');
    dispatch(loadingTrue());

    if (
      images.length &&
      cat != null &&
      rooms != null &&
      bathRoom != null &&
      gp.length &&
      ip.length &&
      op.length &&
      location != '' &&
      numberRegex.test(number)
    ) {
      const body = {
        title: title,
        rooms: rooms,
        description: desc,
        bathrooms: bathRoom,
        location,
        generalPref: getAllID(gp),
        insidePref: getAllID(ip),
        outsidePref: getAllID(op),
        category: cat,
        photos: images,
        price: number,
        adType: type,
        country: countryName,
        state: stateName,
        city: cityName,
      };
      console.log(body, 'alsdkaskldf');
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
          rooms: null,
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

  //GET COUNTRY
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY':
          'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;

        let countryArray = [];
        for (let i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleState = useCallback(
    countryCode => {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        headers: {
          'X-CSCAPI-KEY':
            'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));

          var count = Object.keys(response.data).length;
          let stateArray = [];
          for (let i = 0; i < count; i++) {
            stateArray.push({
              value: response.data[i].iso2,
              label: response.data[i].name,
            });
          }

          setStateData(stateArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [stateData],
  );

  const handleCity = useCallback(
    (countryCode, stateCode) => {
      console.log(countryCode, stateCode, 'aaaaaaa');

      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        headers: {
          'X-CSCAPI-KEY':
            'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          var count = Object.keys(response.data).length;
          let cityArray = [];
          for (let i = 0; i < count; i++) {
            cityArray.push({
              value: response.data[i].id,
              label: response.data[i].name,
            });
          }
          setCityData(cityArray);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [cityData],
  );
  // End Dropdown

  //REST ALL STATE
  const onResetState = useCallback(() => {
    // resetField('desc')

    reset();
    updateState({
      images: [],
      gp: null,
      op: null,
      ip: null,
      cat: null,
      rooms: null,
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

    if (!title || title.length < 15) {
      errorMessage(
        'Title cannot be null and must be at least 15 characters long',
      );
      return;
    }

    if (!desc || desc.length < 20) {
      errorMessage(
        'Description cannot be null or description must be at least 20 characters long ',
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

    if (!country) {
      errorMessage('Country cannot be empty');
      return;
    }
    if (!bathRoom) {
      errorMessage('Bathrooms must select');
      return;
    }
    if (!rooms) {
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
    rooms,
    bathRoom,
    cat,
    postData,
    uploadFromGalary,
    images,
    options,
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
    handleState,
    handleCity,
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
    options,
    validateForm,
    category,
    setCategory,
    uploadedImages,
    // handleError
    // goBack,
  };
};

export default useAddPostScreen;
