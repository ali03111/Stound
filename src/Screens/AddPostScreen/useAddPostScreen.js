import {useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {createAdsUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = ({navigate}) => {
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
  });

  const {gp, ip, op, bathRoom, rooms, cat, images, type} = preferencesVal;

  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError.message.split(' ').slice(1).join(' '));
  };

  const onSelecteTag = (item, key) => {
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

  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

  const getAllID = data => {
    console.log('ALl data ', data);
    const newArry = [];
    data.map(res => newArry.push(res.id));
    return newArry;
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
        location: 'sjkdbjksb',
        generalPref: getAllID(gp),
        insidePref: getAllID(ip),
        outsidePref: getAllID(op),
        category: cat,
        photos: images,
        price: number,
        adType: type,
      };
      Object.entries(body).forEach(([key, val]) => {
        if (key === 'photos' && Array.isArray(val)) {
          val.forEach((res, index) => {
            formData.append(`photos`, {
              name: res?.fileName,
              type: res?.type,
              uri: res?.uri,
            });
          });
        } else {
          formData.append(key, val);
        }
      });

      const {ok, data, status, originalError} = await API.post(
        createAdsUrl,
        formData,
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
          type: options[0].value,
        });
        reset();
        successMessage(data?.message);
      } else {
        console.log('dfdf', originalError);
        errorMessage(originalError.message.split(' ').slice(1).join(' '));
      }
    } else {
      errorMessage('please comeplete all fields');
    }
  };

  const useEffectFun = () => {
    getPreferences();
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
    // goBack,
  };
};

export default useAddPostScreen;
