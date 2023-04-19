import useFormHook from '../../Hooks/UseFormHooks';

const {default: Schemas} = require('../../Utils/Validation');

const useAddPostScreen = () => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.addPost,
  );
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    // goBack,
  };
};

export default useAddPostScreen;
