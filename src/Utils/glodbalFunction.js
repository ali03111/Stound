import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check} from 'react-native-permissions';

const getSingleCharacter = text => {
  let letter = text?.charAt(0).toUpperCase();
  return letter;
};

const formatPhoneNumber = phoneNumber => {
  // Remove all non-numeric characters from the input
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // If the number is not exactly 10 digits, return it as is
  if (cleaned.length !== 10) {
    return phoneNumber;
  }

  // Match the numbers and format them as (XXX) XXX XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`;
  }

  // Fallback in case of unexpected input (although unlikely due to earlier length check)
  return phoneNumber;
};

const formatPhoneNumber1 = phoneNumber => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format the number according to its length
  if (cleaned.length <= 3) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(
      6,
      10,
    )}`;
  }

  return cleaned; // If longer than 10 digits, return as is
};

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Function to format date to MM/DD/YYYY according to the specified timezone
const formatDateToMMDDYYYYInTimeZone = dateString => {
  const formattedDate = moment.utc(dateString).tz(timeZone).format('MM/D/YYYY');

  return formattedDate; // Returns in MM/DD/YYYY format
};

import moment from 'moment-timezone';

const formatTimeToHHMMSSInTimeZone = dateString => {
  console.log(dateString, timeZone, 'asklfjlaksdfjlaksdfj');
  // Parse the date string and apply the specified timeZone
  // const formattedTime = moment.tz(dateString, timeZone).format('hh:mm:ss A'); // 12-hour format with AM/PM
  const convertedDate = moment.utc(dateString).tz(timeZone).format('h:mm A');
  console.log(convertedDate, 'asdfkjalsdfjk');
  // console.log(formattedTime, 'aslfjkalsdkfjldjs');
  return convertedDate;
};

export const formatDateExpire = date => {
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(newDate.getDate()).padStart(2, '0');
  const year = newDate.getFullYear();
  return `${month}/${day}/${year}`;
};
function formatDuration(duration) {
  // Use a default value for duration if it is null or undefined
  if (!duration) {
    return 'None';
  }

  const [hours, minutes] = duration.split(':').map(Number);

  let result = [];
  if (hours > 0) result.push(`${hours} hr`);
  if (minutes > 0) result.push(`${minutes} min`);

  return result.join(' ') || 'None';
}

const formatExpireDate = dateString => {
  const date = new Date(dateString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
};

function formatDate(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName} ${monthName} ${day < 10 ? '0' + day : day} ${year}`;
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Adding leading zeros to hours, minutes, and seconds if they are less than 10
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function capitalizeFirstLetter(string) {
  if (!string) return '';

  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const formatTimeDifference = date => {
  // Extract the date from the item
  const notificationDate = new Date(date);

  // Calculate the time difference in milliseconds
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - notificationDate.getTime();

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let displayTime;

  if (days >= 1) {
    displayTime = `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours >= 1) {
    displayTime = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes >= 1) {
    displayTime = `${minutes} ${minutes === 1 ? 'min' : 'min'} ago`;
  } else {
    displayTime = `${seconds} ${seconds === 1 ? 'sec' : 'sec'} ago`;
  }

  return displayTime;
};

// const options = {
//   taskname: 'example',
//   tasktitle: 'exampletask title',
//   taskdesc: 'exampletask description',
//   taskicon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkinguri: 'yourschemehere://chat/jane', // see deep linking for more info
//   parameters: {
//     delay: 10000,
//   },
// };

// await backgroundservice.start(veryintensivetask, options);
// await backgroundservice.updatenotification({taskdesc: 'new exampletask description'}); // only android, ios will ignore this call
// // ios will also run everything here in the background until .stop() is called
// await backgroundservice.stop();

function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const getLocationName = async (latitude, longitude) => {
  const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDrsOp8m31p4Ouy3S0pfXRNehExMJ-Mp2U`;

  // Replace "YOUR_API_KEY" with your actual Google Maps Geocoding API key

  const res = await fetch(geocodingAPI);
  const response = await res.json();

  if (response.results.length > 0) {
    const locationName = response.results[0].formatted_address;
    return locationName;
  }
};

const getCurrentLocation = async () => {
  let locationData;
  // Request permission to access geolocation if needed
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Location permission denied');
    }
  }
  Geolocation.getCurrentPosition(async info => {
    const locationName = await getLocationName(
      info.coords.latitude,
      info.coords.longitude,
    );
    locationData = {
      coords: {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      },
      description: locationName,
    };
  });
  return locationData;
  // const coords = Geolocation.getCurrentPosition();
  // console.lg('jksbjksbdjkbsd', coords);
  // const locationName = await getLocationName(coords.latitude, coords.longitude);
  // return {
  //   coords: {
  //     latitude,
  //     longitude,
  //   },
  //   description: locationName,
  // };
};

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const globalCheckLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log(permissionStatus, 'iOS permission status', Platform.OS);
    return permissionStatus === RESULTS.GRANTED;
  } else if (Platform.OS === 'android') {
    try {
      // Check if permission is already granted
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        console.log('Location permission already granted');
        return true;
      } else {
        // Request permission if not granted
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else if (result === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied by the user');
          return false;
        } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log(
            'Location permission denied and never ask again selected',
          );
          return false;
        }
      }
    } catch (error) {
      console.error('Error checking/requesting location permission:', error);
      return false;
    }
  }
};

function isPrivateRelayEmail(email) {
  return email.includes('@privaterelay.appleid.com');
}

function formatPrice(number) {
  return number.toLocaleString('en-US');
}

export {
  getSingleCharacter,
  formatTimeDifference,
  generateRandomString,
  getCurrentLocation,
  requestLocationPermission,
  getLocationName,
  capitalizeFirstLetter,
  formatDate,
  formatTime,
  globalCheckLocationPermission,
  formatExpireDate,
  formatDateToMMDDYYYYInTimeZone,
  formatTimeToHHMMSSInTimeZone,
  timeZone,
  formatPhoneNumber,
  formatPhoneNumber1,
  formatDuration,
  isPrivateRelayEmail,
  formatPrice,
};
