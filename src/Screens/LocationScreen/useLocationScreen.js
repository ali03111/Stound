import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {setRecentLocation} from '../../Redux/Action/recentLocationAction';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';

const useLocationScreen = ({goBack}, {params}) => {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({coords: {latitude, longitude}});
            },
            error => {
              dispatch(loadingFalse());
              console.log(error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          dispatch(loadingFalse());

          console.log('Location permission denied');
        }
      } catch (err) {
        dispatch(loadingFalse());

        console.warn(err);
      }
    };

    requestLocationPermission();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getCurrentLocation = () => {
    dispatch(loadingTrue());
    try {
      Geolocation.getCurrentPosition(info => {
        getLocationName(info?.coords?.latitude, info?.coords?.longitude),
          setLocation(info);
      });
    } catch (e) {
      console.log(e, 'askldjkljWWWWW');
      dispatch(loadingFalse());
    }
  };
  const {dispatch, getState} = useReduxStore();
  const {recentLocation} = getState('recentlocation');

  const ref = useRef();
  const [addressText, setAddressText] = useState([]);

  const handleButtonClick = data => {
    const newValue = data.description; // The value you want to push
    setLocation(data);
    // Create a new array with the updated value
    console.log(data, '123123123');
    const updatedArray = [...addressText, newValue];
    // Update the state variable with the new array
    dispatch(setRecentLocation(data));
  };

  const setSelectedLocation = locationName => {
    params.getLocation(locationName);
    dispatch(loadingFalse());
    goBack();
  };

  function getLocationName(latitude, longitude) {
    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBWU9HrMQUigxX7_ry_HpHNvEdn_Vve4DI`;

    // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

    fetch(geocodingAPI)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const locationName = data.results[0].formatted_address;
          setSelectedLocation(locationName);
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }



  return {
    ref,
    setAddressText,
    addressText,
    handleButtonClick,
    getCurrentLocation,
    location,
    setLocation,
    recentLocation,
    getLocationName,
    setSelectedLocation,
  };
};

export default useLocationScreen;

