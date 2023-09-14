import {useCallback, useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {createAdsUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import useReduxStore from '../../Hooks/UseReduxStore';
import {updateAdImage} from '../../Utils/Urls';
import {Platform} from 'react-native';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import axios from 'axios';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = ({navigate}) => {
  const {dispatch, getState} = useReduxStore();

  const {recentLocation} = getState('recentlocation');
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.addPost,
  );
  const options = [
    {label: 'Sale', value: 'Sale'},
    {label: 'Rent', value: 'Rent'},
  ];


      //For Picker
      const [countryData, setCountryData] = useState([]);
      const [stateData, setStateData] = useState([]);
      const [cityData, setCityData] = useState([]);
    
      const [country, setCountry] = useState(null);
      const [state, setState] = useState(null);
      const [city, setCity] = useState(null);
      const [countryName, setCountryName] = useState(null);
      const [stateName, setStateName] = useState(null);
      const [cityName, setCityName] = useState(null);
      const [isFocus, setIsFocus] = useState(false);
      const [isFocus1, setIsFocus1] = useState(false);
      const [isFocus2, setIsFocus2] = useState(false);

  const [preferencesData, setPreferencesData] = useState([]);
  const [preferencesVal, setPreferencesVal] = useState({
    gp: [],
    ip: [],
    op: [],
    cat: null,
    rooms: null,
    bathRoom: null,
    images: [],
    type: options[0].value,
    location: '',
  });

  const {gp, ip, op, bathRoom, rooms, cat, images, type, location} =
    preferencesVal;

  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError);
  };

  const onSelecteTag = (item, key) => {
    console.log(key,item, 'keyueueu11');
    updateState({[key]: item});
  };

  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 10,
        mediaType: 'photo',
        quality: 1,
        // maxWidth: 300,
        // maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          if (images.length == 0) {
            updateState({images: res?.assets});
          } else {
            updateState({images: [...images, ...res?.assets]});
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

  const postData = async ({title, desc, number}) => {
    dispatch(loadingTrue());
    const numberRegex = /^[0-9]+$/;
    if (
      images.length &&
      cat != null &&
      rooms != null &&
      bathRoom != null &&
      gp.length &&
      ip.length &&
      op.length &&
      numberRegex.test(number)  
      
    ) {
      const body = {
        title: title,
        description: desc,
        rooms: rooms,
        bathrooms: bathRoom,
        location,
        generalPref: getAllID(gp),
        insidePref: getAllID(ip),
        outsidePref: getAllID(op),
        category: cat,
        photos: images,
        price: number,
        adType: type,
        country:countryName,
        state:stateName,
        city:cityName
      };
      const {ok, data, status, originalError, problem} = await formDataFunc(
        createAdsUrl,
        body,
        'photos',
        true,
      );
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
        });
        reset();
        dispatch(loadingFalse());
        successMessage(data?.message || 'Your Ad has been created ');
        navigate('HomeScreen');
      } else {
        dispatch(loadingFalse());
        console.log('dfdfa', originalError, status, problem, data?.message);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      !numberRegex.test(number) ? errorMessage('Please correct your price'):errorMessage('please comeplete all fields');
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
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
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
  
  const handleState = useCallback(countryCode => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
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
  }, [stateData]);
  
  const handleCity = useCallback((countryCode, stateCode) => {
    console.log(countryCode,stateCode,'aaaaaaa')
  
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
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
  }, [cityData]);
  // End Dropdown  

  //REST ALL STATE
  const onResetState = () => {
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
    reset();
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
    state, setState,
    city, setCity,
    countryName, setCountryName,
    stateName, setStateName,
    cityName, setCityName,
    handleState,
    handleCity,
    setCityData,
    isFocus, setIsFocus,
    isFocus1, setIsFocus1,
    isFocus2, setIsFocus2,
    // goBack,
  };
};

export default useAddPostScreen;
