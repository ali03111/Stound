import {favouriteData} from '../../Utils/localDB';

const useFavourateScreen = ({navigate}) => {
  const onPress = () => navigate('PackageDetailsScreen');

  return {favouriteData, onPress};
};

export default useFavourateScreen;
