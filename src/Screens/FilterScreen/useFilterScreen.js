import {useCallback, useEffect, useRef, useState} from 'react';
import API from '../../Utils/helperFunc';
import {FilterAdsUrl, getPreUrl, savePreUrl} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import {loadingFalse} from '../../Redux/Action/isloadingAction';
import axios from 'axios';
import useFormHook from '../../Hooks/UseFormHooks';
import {squarefoot} from '../../Assets';

const useFilterScreen = ({navigate}) => {
  // Start Dropdown
  const bathRooms = ['1', '2', '3', '4', '5', '6', '7+'];
  const bedRooms = ['1', '2', '3', '4', '5', '6', '7+'];
  const {handleSubmit, errors, reset, control, getValues, resetField} =
    useFormHook();
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

  //For MODAL
  const [category, setCategory] = useState('');
  const [Modal0, setModal0] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);

  //FOR RANGE SLIDER
  const MIN_DEFAULT = 0;
  const MAX_DEFAULT = 100000000;
  // const [MIN_DEFAULT, setMIN_DEFAULT] = useState(0);
  // const [MAX_DEFAULT, setMAX_DEFAULT] = useState(0);

  const [min, setMin] = useState(MIN_DEFAULT);
  const [max, setMax] = useState(MAX_DEFAULT);

  const sliderRef = useRef(null);
  const sliderRef1 = useRef(null);
  // for squarefoot
  const [squareFootLow, setSquareFootLow] = useState(0);
  const [squareFootHigh, setSquareFootHigh] = useState(2000);

  // for price range
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(100000);

  //GET COUNTRY
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

  // const [options,setOptions]=useState();
  const [sliderValue, setSliderValue] = useState(0);
  const {dispatch, getState} = useReduxStore();

  console.log('preferencesDataa', preferencesData);

  const options = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Sell', value: 'Sell'},
  ];

  const [preferencesVal, setPreferencesVal] = useState({
    adType,
    gp: [],
    ip: [],
    op: [],
    cat: null,
    // rooms: 1,
    // bathRoom: 1,
    bedRoom: null,
    bathRoom: null,
    images: [],
    // type: options[0]?.value,
    location: '',
  });
  const {adType, gp, ip, op, bathRoom, bedRoom, rooms, cat, images, location} =
    preferencesVal;
  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  //SElECT RENT TYPE
  const onSelecteTag = (item, key) => {
    console.log(cat, 'keyueueau');
    updateState({[key]: item});
  };

  //GET CATEGORY BY API
  const [preferencesData, setPreferencesData] = useState([]);
  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    console.log('jsjaasdsjsj', data);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError);
  };
  useEffect(() => {
    getPreferences();
  }, []);

  useEffect(() => {
    // Whenever preferencesData changes, update the state
    setPreferencesVal({
      gp: preferencesData?.gp?.filter(item => item.isSelected) ?? [],
      ip: preferencesData?.ip?.filter(item => item.isSelected) ?? [],
      op: preferencesData?.op?.filter(item => item.isSelected) ?? [],
      cat: preferencesData?.property_type ?? [],
      // type: preferencesData?.type ?? 'Rent', // Default to "Rent"
    });
  }, [preferencesData]);

  //GET LOCATION

  //Navigate Preferences with onSelectTag Function
  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

  const getAllID = data => {
    if (Array.isArray(data)) {
      return data.map(res => res.id);
    }
    return [];
  };

  const getAllName = data => {
    if (Array.isArray(data)) {
      return data.map(res => res.name);
    }
    return [];
  };

  console.log(
    adType,
    gp,
    ip,
    op,
    cat,
    bathRoom,
    rooms,
    location,
    'aldfjajksdflkaaj',
  );
  const filterAdsDataFunction = async () => {
    console.log();
    if (cat != null) {
      const body = {
        adType,
        category: cat,
        rooms: bedRoom,
        bathrooms: bathRoom,
        generalPref: getAllID(gp),
        insidePref: getAllID(ip),
        outsidePref: getAllID(op),
        location,
        minPrice: priceLow,
        maxPrice: priceHigh,
        minAreaSize: squareFootLow,
        maxAreaSize: squareFootHigh,
      };
      console.log('h12312eheha;', body);
      const {ok, data, originalError} = await API.post(FilterAdsUrl, body);
      console.log('h12312eh121121eh;', ok, data, originalError);

      const body1 = {
        generalPrefIds: getAllID(gp),
        insidePrefIds: getAllID(ip),
        outsidePrefIds: getAllID(op),
        categoryId: cat,
        adType,
      };
      console.log('body1', body1);
      const response = await API.post(savePreUrl, body1);
      console.log('preferences data post filter', response);

      if (ok) {
        navigate('FilterPackageScreen', {items: data});
        // successMessage(data?.message || 'Your Ad has been created ');
      } else {
        console.log('dfdfa', originalError, data);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      errorMessage(`Please make sure to select a "Property Type"`);
    }
  };

  //Get Location
  const getLocation = data => {
    updateState({location: data});

    console.log(data, 'aakljskljakldjlaksjdklajskldj');
  };
  const sendLocation = () => {
    navigate('LocationScreen', {getLocation});
  };

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
      adType: null,
    });
    setCategory('');
    // for squarefoot
    setSquareFootLow(0);
    setSquareFootHigh(2000);

    // for price range
    setPriceLow(0);
    setPriceHigh(100000);

    sliderRef.current?.resetSlider();
    sliderRef1.current?.resetSlider();
    setStateData([]);
    setCityData([]);
  }, []);
  const onSelectMultiTag = (item, key) => {
    setPreferencesVal(prev => {
      const selectedItems = prev[key] || [];

      let updatedItems;
      if (selectedItems.includes(item)) {
        // Remove item if already selected
        updatedItems = selectedItems.filter(i => i !== item);
      } else {
        // Add new item
        updatedItems = [...selectedItems, item];
      }

      const newState = {...prev, [key]: updatedItems};
      console.log('Updated preferencesVal:', newState); // Debugging state
      return newState;
    });
  };
  return {
    filterAdsDataFunction,
    onSelecteTag,
    options,
    preferencesData,
    cat,
    rooms,
    bathRoom,
    gp,
    op,
    ip,
    dynamicNav,

    sliderValue,
    setSliderValue,
    sendLocation,
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
    isFocus,
    setIsFocus,
    isFocus1,
    setIsFocus1,
    isFocus2,
    setIsFocus2,
    category,
    setCategory,
    Modal0,
    setModal0,
    Modal1,
    setModal1,
    Modal2,
    setModal2,
    MIN_DEFAULT,
    MAX_DEFAULT,
    min,
    setMin,
    max,
    setMax,
    handleState,
    handleCity,
    setCityData,
    setStateData,
    adType,
    updateState,
    onResetState,
    location,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    resetField,
    bathRooms,
    bedRooms,
    bedRoom,
    bathRoom,
    images,

    squareFootLow,
    setSquareFootLow,
    squareFootHigh,
    setSquareFootHigh,

    priceLow,
    setPriceLow,
    priceHigh,
    setPriceHigh,

    sliderRef,
    sliderRef1,
    preferencesVal,
    onSelectMultiTag,
  };
};

export default useFilterScreen;
