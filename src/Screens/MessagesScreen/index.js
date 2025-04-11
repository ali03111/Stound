import React, {useState, useCallback, useEffect, memo, useRef} from 'react';
import {
  Bubble,
  Composer,
  GiftedChat,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';
import {firebase} from '@react-native-firebase/firestore';
import useMessagesScreen from './useMessagesScreen';
import {Image, Platform, Text, View} from 'react-native';
import MessagesHeader from './MessagesHeader';
import {styles} from './styles';
import {arrowbackwhite} from '../../Assets';
import {Colors} from '../../Theme/Variables';
import {hp, wp} from '../../Config/responsive';
import {TextComponent} from '../../Components/TextComponent';
import Feather from 'react-native-vector-icons/Feather';
import {height} from '../../Navigation/bottomNavigation';
import useReduxStore from '../../Hooks/UseReduxStore';
import {messagesNotification} from '../../Redux/Action/messagesAction';
import MyListingComp from '../../Components/MyListingComp';
import {getSingleAdUrl} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import {errorMessage} from '../../Config/NotificationMessage';
const MessagesScreen = ({route, navigation}) => {
  const {userData} = useMessagesScreen(route);
  const {
    id,
    userDetail: {name, profilePicture},
    userDetail,
    adId,
  } = route?.params;
  const [messages, setMessages] = useState([]);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primaryColor,
            borderRadius: 10,
            padding: 5,
          },
          left: {
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: 5,
            marginLeft: wp('-10'), // Remove the left margin
          },
        }}
        containerStyle={{
          right: {
            marginBottom: height < 852 ? hp('3%') : hp('2%'),
          },
          left: {
            marginBottom: height < 852 ? hp('3') : hp('2%'),
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send
        containerStyle={{
          marginBottom: hp('2.5'),
          marginRight: wp('3'),
          color: 'black',
        }}
        {...props}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.primaryColor,
            borderRadius: 10,
            padding: 11,
            paddingHorizontal: wp('5'),
          }}>
          <Feather
            name="send"
            style={{marginRight: wp('2')}}
            size={hp('2')}
            color="white"
          />
          <TextComponent
            text={'Send'}
            styles={{color: 'white', fontSize: hp('1.5')}}
          />
        </View>
      </Send>
    );
  };
  const renderComposer = props => {
    return (
      <>
        <Composer
          {...props}
          textInputStyle={{
            borderRadius: 5,
            padding: 10,
            borderColor: props.text ? '#6200ED' : '#ccc', // Change the border color based on whether there is text or not
            marginBottom: Platform.OS === 'ios' ? hp('3') : hp('3'), // Add marginBottom for iOS only
          }}
        />
      </>
    );
  };

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection('chats')
      .doc('' + userData?.agoraId + id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMsg = querySnapshot.docs.map(item => {
          console.log('ajbcjabjkbcajkbcabcasbbsabsc', userData?.agoraId, id);
          return {
            ...item._data,
            createdAt: item.data()?.createdAt.toDate(), //this line change only
          };
        });
        setMsgId(allMsg[0]?.adId);
        setMessages(allMsg);
      });
    return () => subscriber();
  }, []);
  const onSend = useCallback((messages = []) => {
    console.log(messages, 'aDASDASD');
    const msg = messages[0];
    const myMsg = {
      ...msg,
      adId: adDetails?.adId ?? route?.params?.adId ?? adId ?? null,
      // sentBy: userData.agoraId,
      sentBy: userData.agoraId,
      receivedBy: id,
      createdAt: new Date(msg.createdAt),
      profileImage:
        profilePicture ??
        'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg',
    };
    console.log('klsdlkvsdklbvklsdbvklsdbvksdbklvsbkdsv', myMsg);
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    setMsgId(myMsg?.adId);
    console.log(myMsg, 'MYMessage File');
    firebase
      .firestore()
      .collection('chats')
      .doc('' + userData?.agoraId + id)
      .collection('messages')
      .add({...myMsg, profileImage: userData?.profilePicture});
    firebase
      .firestore()
      .collection('chats')
      .doc('' + id + userData?.agoraId)
      .collection('messages')
      .add({...myMsg, profileImage: profilePicture});

    firebase
      .firestore()
      .collection('users')
      .doc(userData?.agoraId)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const existingData = docSnapshot.data();
          const chatUsers = existingData.chatUsers || [];

          // Check if the chatUsers array already contains the otherUserId
          const existingIndex = chatUsers.findIndex(
            user => user.otherUserId === id,
          );

          if (existingIndex !== -1) {
            // Merge the existing object
            chatUsers[existingIndex] = {
              ...chatUsers[existingIndex],
              lastMsg: msg.text,
              createdAt: new Date(msg?.createdAt),
              isRead: true,
            };
          } else {
            // Add a new object to the chatUsers array
            chatUsers.push({
              lastMsg: msg.text,
              otherUserId: id,
              createdAt: new Date(msg?.createdAt),
              isRead: true,
            });
          }

          //Save DATA IN REDUX WITH ACTION
          // Update the Firestore document with the modified chatUsers array
          firebase.firestore().collection('users').doc(userData?.agoraId).set(
            {
              chatUsers: chatUsers,
              // profilePicture: userData.profilePicture,
            },
            {merge: true},
          );
        }
      });

    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const existingData = docSnapshot.data();
          const chatUsers = existingData.chatUsers || [];

          // Check if the chatUsers array already contains the otherUserId
          const existingIndex = chatUsers.findIndex(
            user => user.otherUserId === userData?.agoraId,
          );

          if (existingIndex !== -1) {
            // Merge the existing object
            chatUsers[existingIndex] = {
              ...chatUsers[existingIndex],
              lastMsg: msg.text,
              createdAt: new Date(msg.createdAt),
            };
          } else {
            // Add a new object to the chatUsers array
            chatUsers.push({
              lastMsg: msg.text,
              otherUserId: userData?.agoraId,
              createdAt: new Date(msg?.createdAt),
            });
          }

          // Update the Firestore document with the modified chatUsers array
          firebase.firestore().collection('users').doc(id).set(
            {
              chatUsers: chatUsers,
              // profilePicture: userData.profilePicture,
            },
            {merge: true},
          );
        }
      });
  }, []);

  console.log(
    'dlsgfvdslvilsdgilvdgsivbilsdblvsdfsdgsdgvsdgsdgsdbsdklb',
    adDetails?.adId ?? route?.params?.adId ?? adId ?? messages[0]?.adId,
  );

  const mesgRef = useRef(
    adDetails?.adId ?? route?.params?.adId ?? adId ?? messages[0]?.adId,
  );

  const [adDetails, setAdDetails] = useState({});
  const [msgId, setMsgId] = useState(
    adDetails?.adId ?? route?.params?.adId ?? adId ?? messages[0]?.adId,
  );

  const getHomeData = async () => {
    const url = getSingleAdUrl + msgId;
    console.log('urlurlurlurlurlurlurlurlurlurlurlurlurlurlurlurl', url);
    const {ok, data} = await API.get(url);
    // const {ok, data} = await API.get(getAdsUrl);
    console.log(JSON.stringify(data?.data), 'alksjdlkajsdlfkjaklsd');
    if (ok) {
      setAdDetails(data?.data);
    }
  };

  useEffect(() => {
    getHomeData();
  }, [msgId]);

  console.log(
    'messagesmessagesmessagesmessagesmessagesmessagesmessagesmessagesmessages',
    messages,
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <MessagesHeader
        image={profilePicture}
        goBack={() => navigation.goBack()}
        // style={styles.topHeader}
        headerTitle={name}
        arrowBackIcon={arrowbackwhite}
        // icon={whitedots}
        centerTextStyle={styles.centerHeading}
      />
      <MyListingComp
        bathrooms={adDetails?.bathrooms}
        location={adDetails?.location}
        price={adDetails?.price}
        title={adDetails?.title}
        rooms={adDetails?.rooms}
        squareFeet={adDetails?.areaSize}
        mainViewStyles={{alignSelf: 'center', height: hp('20')}}
        image={adDetails?.photos ? adDetails?.photos[0] : null}
        onPressView={() =>
          navigation.navigate('PackageDetailsScreen', {
            items: {
              ...adDetails,
              isShow: true,
            },
          })
        }
      />
      <GiftedChat
        alwaysShowSend={false}
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          borderRadius: 5,
          color: 'black',
        }}
        textInputStyle={{
          paddingHorizontal: 10,
          borderRadius: 5,
          color: 'black',
        }}
        renderSend={renderSend}
        user={{
          _id: userData.agoraId,
          createdAt: new Date(userData.createdAt),
        }}
        textInputProps={{
          color: 'black',
        }}
        renderBubble={renderBubble}
        renderComposer={renderComposer}
      />
    </View>
  );
};
export default memo(MessagesScreen);
