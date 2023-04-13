const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useResetPasswordScreen = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.newPassword,
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

export default useResetPasswordScreen;
