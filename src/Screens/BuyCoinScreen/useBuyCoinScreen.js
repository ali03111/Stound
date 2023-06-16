// import useNotificationScreen from '.';
import { ChatData } from '../../Utils/localDB';

const useBuyCoinScreen = ({ navigate, goBack }) => {
    const HeaderDetailScreen = (item) => navigate('HeaderDetailScreen', item);
    return { ChatData, HeaderDetailScreen };
};
export default useBuyCoinScreen;