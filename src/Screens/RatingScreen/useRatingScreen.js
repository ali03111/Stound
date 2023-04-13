import Schemas from '../../Utils/Validation';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');

const useEditProfileScreen = () => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
  };
};

export default useEditProfileScreen;
