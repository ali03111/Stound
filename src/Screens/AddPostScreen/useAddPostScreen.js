import {useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {createAdsUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import useReduxStore from '../../Hooks/UseReduxStore';
import {updateAdImage} from '../../Utils/Urls';
import {Platform} from 'react-native';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = ({navigate}) => {
  const {dispatch, getState} = useReduxStore();

  const {recentLocation} = getState('recentlocation');
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.addPost,
  );

  const options = [
    {label: 'sale', value: 'Sale'},
    {label: 'Rent', value: 'Rent'},
  ];

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
    console.log(key, 'keyueueu');
    updateState({[key]: item});
  };

  const uploadFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 10,
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 300,
        maxHeight: 300,
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

  const postDataWithOutText = async body => {
    const {ok, data, status, originalError, problem} = await API.post(
      createAdsUrl,
      body,
    );
    return {ok, data, originalError};
  };

  const postDataWithImage = async formData => {
    const {ok, data, status, originalError, problem} = await API.post(
      updateAdImage,
      formData,
    );
    return {status: ok, result: data, error: originalError};
  };

  const postData = async ({title, desc, number}) => {
    if (
      images.length &&
      cat != null &&
      rooms != null &&
      bathRoom != null &&
      gp.length &&
      ip.length &&
      op.length
    ) {
      const formData = new FormData();

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
        price: number,
        adType: type,
      };
      const body1 = {
        photos: [],
      };

      // console.log(body1, 'alkjlsdjkflaksjdfkljsal');
      // Object.entries(body1).forEach(([key, val]) => {
      //   if (key === 'photos' && Array.isArray(val)) {
      //     val.forEach((res, index) => {
      //       formData.append(`photos`, {
      //         name: res?.fileName,
      //         type: res?.type,
      //         uri: res?.uri,
      //       });
      //     });
      //   }
      //   //  else {
      //   //   formData.append(key, val);
      //   // }
      // });

      try {
        const {ok, data, originalError} = await postDataWithOutText(body);
        console.log(data.data, ok, originalError, '787877');
        if (ok) {
          console.log(data.data.adId, 'aaaaaaaaaaaaa22aaAAAaaa');

          formData.append('adId', data.data?.adId);
          images.map(item => {
            formData.append('photos', {
              name: item?.uri.split('/').pop(),
              type: item?.type,
              uri: item?.uri,
            });
            console.log(
              item?.uri.split('/').pop(),
              item?.uri,
              'ajajaaaaaaa11jaj',
            );
          });
          console.log(
            formData._parts[1],
            data?.data?.adId,
            'formdataasasdasaaaaaaaa',
          );
          const {status, result, error} = await postDataWithImage(formData);
          console.log('aldjsflaaaakjsdf', result, status, error);

          if (status) {
            console.log('aldjsflkjsdf', status);
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
            successMessage(result?.message || 'Your Ad has been created ');
            console.log(result, 'dlkjdkjdkaaajdkjdkj');
          } else {
            console.log('dfdfaaaaaaaaaaa', originalError, status);
            errorMessage(
              originalError?.message?.split(' ')?.slice(1)?.join(' '),
            );
          }
        } else {
          console.log('dfdfa', originalError, status, problem, data?.message);
          errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
        }
      } catch (e) {
        console.log(e, 'Erororororooror');
      }
    } else {
      errorMessage('please comeplete all fields');
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
    // goBack,
  };
};

export default useAddPostScreen;
