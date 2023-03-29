import React, {memo, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import NotificationComp from '../../Components/Notification';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import useNotificationScreen from './useNotificationScreen';

const Notification = () => {
  const {notificationData, currentIndex, getStart} = useNotificationScreen();
  const renderItem = useCallback(
    ({item, index}) => {
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
    },
    [currentIndex],
  );
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <FlatList
          refreshing={false}
          data={notificationData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          contentContainerStyle={{
            paddingBottom: 0,
            // height: 'auto',
          }}
          style={{paddingBottom: 0}}
        />
      </View>
    </ScrollView>
  );
};

export default memo(Notification);
