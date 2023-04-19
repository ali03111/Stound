import React, {memo, useCallback} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import MessagesHeader from '../MessagesScreen/MessagesHeader';
import MessagesComp from '../MessagesScreen/MessagesComp';
import {styles} from './styles';
import useChatScreen from './useChatScreen';
import {wp} from '../../Config/responsive';
import {
  arrowback,
  moredots,
  search,
  smsedit,
  arrowbackwhite,
  whitedots,
  send,
} from '../../Assests';
import MsgSendButton from '../../Components/MsgSendButton';

const MessagesScreen = () => {
  const {msgs, getStart} = useChatScreen();
  const [text, onChangeText] = React.useState('');
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.notification}>
        <MessagesComp user={item?.user} time={item?.time} msg={item?.msg} />
      </View>
    );
  });
  return (
    <View style={{flex: 1}}>
      <MessagesHeader
        style={styles.topHeader}
        headerTitle={'Gregory Hayes'}
        arrowBackIcon={arrowbackwhite}
        icon={whitedots}
        centerTextStyle={styles.centerHeading}
      />

      <FlatList
        refreshing={false}
        data={msgs}
        scrollEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: wp('4'),
        }}
      />
      <View style={styles.searchBar}>
        <View style={styles.searchMain}>
          <TextInput
            style={styles.searchinput}
            onChangeText={onChangeText}
            value={text}
            placeholder={'Type a message'}
          />
          <MsgSendButton
            title={'Send'}
            image={send}
            style={styles.sendBtnStyle}
            textStyle={styles.sendTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(MessagesScreen);
