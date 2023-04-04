import React, {memo, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import Header from '../../Components/Header';
import NotificationComp from '../../Components/Notification';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import useNotificationScreen from './useNotificationScreen';
import {NotificationHeader} from '../../Components/Header';
import {wp} from '../../Config/responsive';
import {arrowback} from '../../Assests';

const Notification = () => {
  const {notificationData, getStart} = useNotificationScreen();
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <NotificationComp
          image={item?.image}
          name={item?.name}
          description={item?.description}
          time={item?.time}
        />
      </View>
    );
  });
  return (
    <View style={styles.notificationMain}>
      <Header
        style={styles.topHeader}
        headerTitle={'Notification'}
        backText={'Back'}
        arrowBackIcon={arrowback}
      />
      <View>
        <FlatList
          refreshing={false}
          data={notificationData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 0,
            paddingHorizontal: wp('4'),

            // height: 'auto',
          }}
          style={{paddingBottom: 0}}
        />
      </View>
    </View>
  );
};

export default memo(Notification);
