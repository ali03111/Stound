const useAccountScreen = ({navigate}) => {
  const dynamicNav = res => navigate(res);

  return {dynamicNav};
};

export default useAccountScreen;
