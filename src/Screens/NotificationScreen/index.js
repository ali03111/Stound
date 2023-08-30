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
import {hp, wp} from '../../Config/responsive';
import {arrowback} from '../../Assests';
import {AlertDesign} from '../../Components/AlertDesign';
import {Colors} from '../../Theme/Variables';
import {EmptyViewComp} from '../../Components/EmptyViewComp';
import {imageURL, imageUrl} from '../../Utils/Urls';

const Notification = ({navigation}) => {
  const {
    notificationData,
    getStart,
    onCancel,
    onConfirm,
    logOut,
    coinAlert,
    notificationDataState,
    isNotification,
    getAllNotificationFunc,
  } = useNotificationScreen(navigation);
  console.log(notificationDataState, 'asldkjfklaasdasdsdfjlkdjsf');
  const renderItem = useCallback(
    ({item: {displayNotification}, item, index}) => {
      console.log(item, index, 'asdklajklsasdasdjakls');
      return (
        <View style={styles.notification}>
          <NotificationComp
            image={imageUrl(displayNotification?.profilePicture)}
            name={displayNotification?.name}
            description={displayNotification?.answer}
            time={item?.createdAt}
            onPress={() => {
              onCancel(coinAlert, 'coinAlert', index, item);
              // onCancel(item);
            }}
          />
        </View>
      );
    },
    [notificationDataState],
  );
  return (
    <>
      <View style={styles.notificationMain}>
        <Header
          style={styles.topHeader}
          headerTitle={'Notification'}
          backText={'Back'}
          arrowBackIcon={arrowback}
          goBack={navigation.goBack}
        />
        <View>
          <FlatList
            refreshing={false}
            data={notificationDataState}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              paddingHorizontal: wp('4'),
            }}
            style={{paddingBottom: 0}}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: 'center',
                  height: hp('80'),
                }}>
                {isNotification && (
                  <EmptyViewComp onRefresh={getAllNotificationFunc} />
                )}
              </View>
            }
          />
        </View>
      </View>
      <AlertDesign
        buttonColor={'#0BB4FF'}
        cancel={'Not Now'}
        isVisible={coinAlert}
        title="Use Coins"
        message="Use 1 coins to get the details!"
        confirmText="Use Coins"
        onCancel={() => onCancel(coinAlert, 'coinAlert')}
        onConfirm={() => onConfirm(coinAlert)}
      />
    </>
  );
};

export default memo(Notification);
