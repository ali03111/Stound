import Schemas from '../../Utils/Validation';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');

const useRatingScreen = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.editProfile,
  );
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
  };
};

export default useRatingScreen;
