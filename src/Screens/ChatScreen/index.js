import React, {memo, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import Header from '../../Components/Header';
import ChatComponent from '../../Components/ChatComponent';
import {TextComponent} from '../../Components/TextComponent';
import {styles} from './styles';
import useChatScreen from './useChatScreen';
import {NotificationHeader} from '../../Components/Header';
import {hp, wp} from '../../Config/responsive';
import {arrowback, moredots, search, smsedit} from '../../Assests';
import {Colors} from '../../Theme/Variables';
import {imageUrl} from '../../Utils/Urls';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const ChatScreen = ({navigation}) => {
  const {
    navigateToMsg,
    userData,
    onChangeText,
    changeText,
    searchData,
    isloading,
  } = useChatScreen(navigation);
  const renderItem = useCallback(({item, index}) => {

    const createdAtt = item?.chatUsers.find(
      res => res.otherUserId == userData?.agoraId,
    )?.createdAt;

    const createdAt = new Date(createdAtt?.seconds * 1000);
    
    return (
      <View style={styles.notification}>
        <ChatComponent
          image={imageUrl(item?.profilePicture)}
          name={item?.name}
          description={
            item.chatUsers.find(res => res.otherUserId == userData?.agoraId)
              ?.lastMsg
          }
          time={createdAt}
          messages={item?.messages}
          onPress={() => navigateToMsg(item)}
          isRead={
            item.chatUsers.find(res => res?.otherUserId == userData?.agoraId)
              ?.isRead
          }
        />
      </View>
    );
  });
  return (
    <View style={styles.notificationMain}>
      <Header
        style={styles.topHeader}
        headerTitle={'Chat Room'}
        centerTextStyle={styles.centerHeading}
      />
      <View style={styles.searchMain}>
        <Image style={styles.search} source={search} />
        <TextInput
          style={styles.searchinput}
          value={changeText}
          onChangeText={onChangeText}
          placeholder={'Search user here...'}
          placeholderTextColor={Colors.gray}
        />
      </View>
      
      <FlatList
        onRefresh={searchData}
        refreshing={false}
        // data={users}
        data={searchData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS == 'ios' ? hp('25') : hp('22'),
          paddingHorizontal: wp('4'),
        }}
        ListEmptyComponent={
          !isloading && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('11.5'),
              }}>
              <EmptyViewComp buttonTrue={true} />
            </View>
          )
        }
      />
    </View>
  );
};

export default memo(ChatScreen);
