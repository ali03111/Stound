import {launchImageLibrary} from 'react-native-image-picker';
import useFormHook from '../../Hooks/UseFormHooks';
import {useState} from 'react';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = () => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.addPost,
  );
  const [AddImage, setAddImage] = useState([]);
  const pickImagesFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 10,
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (!res?.didCancel) {
          setAddImage(res?.assets);
        }
      },
    );
  };
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    pickImagesFromGalary,
    AddImage,
    // goBack,
  };
};

export default useAddPostScreen;
