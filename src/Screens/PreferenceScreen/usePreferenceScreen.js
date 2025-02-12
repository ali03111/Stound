import {useCallback, useEffect, useRef, useState} from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import {savePreUrl, getPreUrl} from '../../Utils/Urls';
import API, {formDataFunc} from '../../Utils/helperFunc';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import axios from 'axios';
import {navigationRef} from '../../../RootNavigation';
import {Platform} from 'react-native';

const {default: Schemas} = require('../../Utils/Validation');

const usePreferenceScreen = ({navigate}, {params}) => {
  const item = params;

  console.log(
    'paramsparamsparamsparamsparamsparamsparamsparamsparams',
    params?.price,
  );

  const {dispatch} = useReduxStore();

  const options = [
    {label: 'Rent', value: 'Rent'},
    {label: 'Sell', value: 'Sell'},
  ];

  const [preferencesData, setPreferencesData] = useState([]);
  const [preferencesVal, setPreferencesVal] = useState({
    gp: preferencesData?.gp?.filter(item => item.isSelected) ?? [],
    ip: preferencesData?.ip?.filter(item => item.isSelected) ?? [],
    op: preferencesData?.op?.filter(item => item.isSelected) ?? [],
    cat: preferencesData?.cat?.filter(item => item.isSelected)[0]?.categoryId,
    adType: options[0].value,
  });

  console.log(
    'preferencesDatapreferencesDatapreferencesDatapreferencesDatapreferencesData',
    preferencesData,
  );

  const {gp, ip, op, adType, cat, category} = preferencesVal;

  const updateState = data => setPreferencesVal(prev => ({...prev, ...data}));

  const getPreferences = async () => {
    const {ok, data, originalError} = await API.get(getPreUrl);
    console.log(Platform.OS, 'data preferences', data);
    if (ok) setPreferencesData(data);
    else errorMessage(originalError);
  };
  console.log(
    preferencesData?.op?.filter(item => item.isSelected),
    'asdljfladjsf',
  );
  useEffect(() => {
    // Whenever preferencesData changes, update the state
    setPreferencesVal(prev => ({
      ...prev,
      gp: preferencesData?.gp?.filter(item => item.isSelected) ?? [],
      ip: preferencesData?.ip?.filter(item => item.isSelected) ?? [],
      op: preferencesData?.op?.filter(item => item.isSelected) ?? [],
      category: preferencesData?.property_type || '',
      cat:
        preferencesData?.cat?.filter(item => item.isSelected)[0]?.categoryId ||
        '',
    }));
  }, [preferencesData]);

  const onSelecteTag = (item, key) => {
    console.log(key, item, 'keyueueu11');
    updateState({[key]: item});
  };

  const dynamicNav = data => navigate('GeneralScreen', {...data, onSelecteTag});

  const getAllID = data => {
    const newArry = [];
    data.map(res => newArry.push(res.id));
    return newArry;
  };

  const postData = async () => {
    // if (!cat) {
    //   errorMessage('Property type please must select');
    // }
    dispatch(loadingTrue());

    // if (cat != null) {
    const body = {
      generalPrefIds: getAllID(gp),
      insidePrefIds: getAllID(ip),
      outsidePrefIds: getAllID(op),
      categoryId: cat,
      adType,
    };
    console.log('body11111111111', body);

    const {ok, data, status, originalError, problem} = await API.post(
      savePreUrl,
      body,
    );
    console.log(Platform.OS, 'preferences data post', data);
    if (ok) {
      dispatch(loadingFalse());
      successMessage(data?.message || 'Your Preferences has been updated ');
      navigate('HomeScreen');
    } else {
      dispatch(loadingFalse());
      console.log('dfdfa', originalError, status, problem, data?.message);
      errorMessage(originalError?.message?.split(' ')?.slice(1)?.join(' '));
    }
    // } else {
    //   dispatch(loadingFalse());
    //   errorMessage('Please comeplete all fields');
    // }
  };

  const useEffectFun = () => {
    getPreferences();
  };

  useEffect(useEffectFun, []);

  const onResetState = useCallback(() => {
    // resetField('desc')

    updateState({
      gp: null,
      op: null,
      ip: null,
      cat: null,
    });
  }, []);

  const validateForm = () => {
    return true;

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
    dynamicNav,
    preferencesData,
    preferencesVal,
    gp,
    ip,
    op,
    onSelecteTag,
    cat,
    postData,
    options,
    onRefresh: getPreferences,
    onResetState,

    category,
  };
};

export default usePreferenceScreen;
