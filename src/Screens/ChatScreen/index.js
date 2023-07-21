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

const ChatScreen = ({navigation}) => {
  const {
    ChatData,
    getStart,
    navigateToMsg,
    users,
    userData,
    onChangeText,
    changeText,
    filteredUserData,
    filtered,
    searchData,
  } = useChatScreen(navigation);
  const renderItem = useCallback(({item, index}) => {
    console.log(item, 'hshjashhs');
    const createdAtt = item.chatUsers.find(
      res => res.otherUserId == userData?.agoraId,
    ).createdAt;
    const createdAt = new Date(createdAtt.seconds * 1000);
    return (
      <View style={styles.notification}>
        <ChatComponent
          image={imageUrl(item?.profilePicture)}
          name={item?.name}
          description={
            item.chatUsers.find(res => res.otherUserId == userData?.agoraId)
              .lastMsg
          }
          time={createdAt}
          messages={item?.messages}
          onPress={() => navigateToMsg(item)}
        />
      </View>
    );
  });
  return (
    <View style={styles.notificationMain}>
      <Header
        style={styles.topHeader}
        headerTitle={'Chat Room'}
        // arrowBackIcon={smsedit}
        // icon={moredots}

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
        refreshing={false}
        // data={users}
        data={searchData?.reverse()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS == 'ios' ? hp('25') : hp('22'),
          paddingHorizontal: wp('4'),
          // height: 'auto',
        }}
      />
    </View>
  );
};

export default memo(ChatScreen);
