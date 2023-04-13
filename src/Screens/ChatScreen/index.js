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

const ChatScreen = () => {
  const {ChatData, getStart} = useChatScreen();
  const [text, onChangeText] = React.useState('');
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <ChatComponent
          image={item?.image}
          name={item?.name}
          description={item?.description}
          time={item?.time}
          messages={item?.messages}
        />
      </View>
    );
  });
  return (
    <View style={styles.notificationMain}>
      <Header
        style={styles.topHeader}
        headerTitle={'Chat Room'}
        arrowBackIcon={smsedit}
        icon={moredots}
        centerTextStyle={styles.centerHeading}
      />
      <View style={styles.searchMain}>
        <Image style={styles.search} source={search} />
        <TextInput
          style={styles.searchinput}
          onChangeText={onChangeText}
          value={text}
          placeholder={'Search property here...'}
        />
      </View>
      <FlatList
        refreshing={false}
        data={ChatData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS == 'ios' ? hp('25') : hp('22'),
          paddingHorizontal: wp('4'),
          // height: 'auto',
        }}
        // style={{paddingBottom: 0}}
      />
    </View>
  );
};

export default memo(ChatScreen);
