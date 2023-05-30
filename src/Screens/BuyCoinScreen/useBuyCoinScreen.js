// import useNotificationScreen from '.';
import { ChatData } from '../../Utils/localDB';

const useBuyCoinScreen = ({ navigate, goBack }) => {
    const HeaderDetailScreen = () => navigate('HeaderDetailScreen');
    return { ChatData, HeaderDetailScreen };
};
export default useBuyCoinScreen;