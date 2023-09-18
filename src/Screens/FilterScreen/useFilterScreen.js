import {useCallback, useEffect, useState} from 'react';
import API from '../../Utils/helperFunc';
import {FilterAdsUrl, getPreUrl} from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {successMessage, errorMessage} from '../../Config/NotificationMessage';
import {loadingFalse} from '../../Redux/Action/isloadingAction';
import axios from 'axios';

const useFilterScreen = ({navigate}) => {
  // Start Dropdown

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
    {label: 'Sale', value: 'Sale'},
    {label: 'Rent', value: 'Rent'},
  ];

  const [preferencesVal, setPreferencesVal] = useState({
    gp: [],
    ip: [],
    op: [],
    cat: null,
    rooms: 1,
    bathRoom: 1,
    images: [],
    type: options[0]?.value,
    locations: '',
  });

  const {gp, ip, op, bathRoom, rooms, cat, images, type, locations} =
    preferencesVal;
  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  //SElECT RENT TYPE
  const onSelecteTag = (item, key) => {
    console.log(type, cat, 'keyueueau');
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

  //GET LOCATION

  //Navigate Preferences with onSelectTag Function
  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

  // const getAllID = data => {
  //   console.log(data, 'asdfklalskdfjklasj');
  //   const newArry = [];
  //   data.map(res => newArry?.push(res.id));
  //   return newArry;
  // };
  // const getAllName = data => {
  //   console.log(data, 'asdfklalskdaaafjklasj');

  //   const newArry = [];
  //   data.map(res => newArry?.push(res.name));
  //   return newArry;
  // };
  // Corrected getAllID and getAllName functions
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
    gp,
    ip,
    op,
    cat,
    type,
    bathRoom,
    rooms,
    locations,
    'aldfjajksdflkaaj',
  );
  const filterAdsDataFunction = async () => {
    if (rooms != null && bathRoom != null && cat != null) {
      const body = {
        propertyType: cat,
        adType: type,
        rooms: rooms,
        bathrooms: bathRoom,
        generalPrefIds: getAllID(gp),
        insidePrefIds: getAllID(ip),
        outsidePrefIds: getAllID(op),
        // location: getAllName(locations),
        location: locations,
        minPrice: min,
        maxPrice: max,
        country: countryName ?? '',
        state: stateName ?? '',
        city: cityName ?? '',
      };
      console.log('h12312eheha;', body);
      const {ok, data, originalError} = await API.post(FilterAdsUrl, body);
      console.log('h12312eh121121eh;', data);

      if (ok) {
        navigate('FilterPackageScreen', {items: data});
        // successMessage(data?.message || 'Your Ad has been created ');
      } else {
        console.log('dfdfa', originalError, data);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      errorMessage('please comeplete all fields');
    }
  };

  //Get Location
  const getLocation = data => {
    updateState({locations: data});

    console.log(data, 'aakljskljakldjlaksjdklajskldj');
  };
  const sendLocation = () => {
    navigate('LocationScreen', {getLocation});
  };

  //Reset All Value In Filter Screen
  const resetFunction = () => [
    updateState({
      gp: [],
      ip: [],
      op: [],
      cat: null,
      rooms: 1,
      bathRoom: 1,
      images: [],
      type: options[0]?.value,
      locations: '',
    }),
  ];

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
    locations,
    sliderValue,
    setSliderValue,
    resetFunction,
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
    // setMIN_DEFAULT,
    // setMAX_DEFAULT,
  };
};

export default useFilterScreen;
