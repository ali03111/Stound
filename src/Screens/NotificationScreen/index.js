import React, { memo, useCallback } from 'react';
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
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import useNotificationScreen from './useNotificationScreen';
import { NotificationHeader } from '../../Components/Header';
import { wp } from '../../Config/responsive';
import { arrowback } from '../../Assests';
import { AlertDesign } from '../../Components/AlertDesign';
import { Colors } from '../../Theme/Variables';

const Notification = ({ navigation }) => {
  const { notificationData, getStart, onCancel, onConfirm, logOut, coinAlert } = useNotificationScreen(navigation);
  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.notification}>
        <NotificationComp
          image={item?.image}
          name={item?.name}
          description={item?.description}
          time={item?.time}
          onPress={() => onCancel(coinAlert, 'coinAlert')}

        />
      </View>
    );
  });
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
            data={notificationData}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              paddingHorizontal: wp('4'),

              // height: 'auto',
            }}
            style={{ paddingBottom: 0 }}
          />
        </View>
        {console.log('LOGOUT', logOut)}
      </View>
      <AlertDesign
        buttonColor={'#0BB4FF'}
        cancel={"Not Now"}
        isVisible={coinAlert}
        title="Use Coins"
        message="Use 2 coins to get the details!"
        confirmText="Use Coins"
        onCancel={() => onCancel(coinAlert, 'coinAlert')}
        onConfirm={() => onConfirm(coinAlert)}
      />
    </>
  );
};

export default memo(Notification);
