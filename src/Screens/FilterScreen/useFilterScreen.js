import {useEffect, useState} from 'react';
import API from '../../Utils/helperFunc';
import {FilterAdsUrl, getPreUrl} from '../../Utils/Urls';
import {errorMessage} from '../../Components/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import {successMessage} from '../../Config/NotificationMessage';
import {loadingFalse} from '../../Redux/Action/isloadingAction';

const useFilterScreen = ({navigate}) => {
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
    locations: [],
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

  const getAllID = data => {
    const newArry = [];
    data.map(res => newArry.push(res.id));
    return newArry;
  };
  const getAllName = data => {
    const newArry = [];
    data.map(res => newArry.push(res.name));
    return newArry;
  };

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
        location: getAllName(locations),
        priceRange: [250, sliderValue],
        // propertyType: 'cat_ac91df8e-abcb-4a51-aa85-3fb63d533e20',
        // adType: 'Sale',
        // generalPrefIds: [],
        // insidePrefIds: [],
        // outsidePrefIds: [],
        // rooms: '5',
        // bathrooms: '2',
        // location: ['1800 Ellis St, San Francisco, CA 94115, USA'],
        // priceRange: ['0', '5500'],
      };
      console.log('h12312eheh;', body);
      const {ok, data, originalError} = await API.post(FilterAdsUrl, body);
      console.log('h12312eh121121eh;', data);

      if (ok) {
        navigate('FilterPackageScreen', {items: data});
        successMessage(data?.message || 'Your Ad has been created ');
      } else {
        console.log('dfdfa', originalError, data);
        errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
      }
    } else {
      dispatch(loadingFalse());
      errorMessage('please comeplete all fields');
    }
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
      locations: [],
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
  };
};

export default useFilterScreen;
