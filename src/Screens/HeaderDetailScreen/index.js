import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {goBack, keyExtractor} from '../../Utils';
import {styles} from './styles';
import {detailsImages} from '../../Utils/localDB';
import {TextComponent} from '../../Components/TextComponent';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Touchable} from '../../Components/Touchable';
import Header from '../../Components/Header';
import {
  accountprofile,
  arrowback,
  arrowbackwhite,
  chat,
  favEmpty,
  locationBlueIcon,
} from '../../Assests';
import FilterAddButton from '../../Components/FilterAddButton';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MsgSendButton from '../../Components/MsgSendButton';
import useHeaderDetailScreen from './useHeaderDetailScreen';
import HeaderDetailComponent from '../../Components/HeaderDetailComponent';
import {Colors} from '../../Theme/Variables';
import {imageURL, imageUrl} from '../../Utils/Urls';
import {GiftedChat} from 'react-native-gifted-chat';
import {firebase} from '@react-native-firebase/firestore';

const index = ({navigation, route}) => {
  const {
    PackageDetailData,
    onPressMessage,
    onPressEMail,
    onPressCall,
    navigationChatScreen,

    userData: {userData},
  } = useHeaderDetailScreen(navigation, route);
  const [messages, setMessages] = useState([]);

  const Item = route.params;
  const imageLenght = Item?.adDetail.photos.length;
  console.log({routeparam: route.params});
  const renderItem = useCallback(({item, index}) => {
    return (
      index > 0 &&
      index < 4 && (
        <ImageBackground
          resizeMode="cover"
          source={{uri: imageUrl(item)}}
          style={styles.secondImage(index)}>
          {index == 3 && (
            <View style={styles.overlayView}>
              <TextComponent
                text={`+${imageLenght - 4}`}
                styles={styles.overlayText}
              />
            </View>
          )}
        </ImageBackground>
      )
    );
  }, []);

  const SocialBoxNotification = ({image, imageText}) => {
    return (
      <View style={styles.socialbox}>
        <Image
          source={{
            uri: imageUrl(image),
          }}
          style={styles.imageStyle}
        />
        <TextComponent text={imageText} styles={styles.imageTextStyle} />
      </View>
    );
  };
  console.log({alsdlkj1sadfklj: userData.agoraId});

  const firstMsg = [
    {
      _id: Item?.userDetail.agoraId,
      createdAt: new Date(),
      text: 'Hi how can i help you!',
      user: {
        _id: userData?.agoraId,

        createdAt: new Date(),
      },
    },
  ];

  //FIREBASE START
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    const subscriber = firebase
      .firestore()
      .collection('chats')

      .doc('' + userData?.agoraId + Item?.userDetail.agoraId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMsg = querySnapshot.docs.map(item => {
          return {
            ...item._data,
            createdAt: item.data()?.createdAt.toDate(), //this line change only
            // createdAt: Date.parse(item?._data?.createdAt),
            // createdAt: item.createdAt.toDate(),
          };
        });
        setMessages(allMsg);

        ///COMMIT CHANGE
        // const allMsg = querySnapshot.docs.map(item => {
        //   const data = item.data();
        //   return {
        //     ...data,
        //     createdAt: data.createdAt.toDate(), // Convert Firestore timestamp to Date object
        //   };
        // });

        // setMessages(allMsg);
      });
    {
      !Item?.useCoin && onSend(firstMsg);
    }

    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages, 'asldfaASDASlskj');
    // [{"_id": "21d2cccd-debc-453e-9dd2-5786f9bba9b6", "createdAt": 2023-08-17T12:03:13.053Z, "text": "Wolrd", "user": {"_id": "407ccec0-c78e-49ec-89a8-6fdbef59e156", "createdAt": 2023-08-17T11:13:11.255Z}}]
    const msg = messages[0];
    const myMsg = {
      ...msg,
      // sentBy: userData.agoraId,
      sentBy: userData.agoraId,
      receivedBy: Item?.userDetail.agoraId,
      createdAt: new Date(msg.createdAt),
      profileImage:
        Item?.userDetail.profilePicture ??
        'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg',
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firebase
      .firestore()
      .collection('chats')
      .doc('' + userData?.agoraId + Item?.userDetail.agoraId)
      .collection('messages')
      .add({...myMsg, profileImage: userData.profilePicture});
    firebase
      .firestore()
      .collection('chats')
      .doc('' + Item?.userDetail.agoraId + userData?.agoraId)
      .collection('messages')
      .add({...myMsg, profileImage: Item?.userDetail.profilePicture});

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
            user => user.otherUserId === Item?.userDetail.agoraId,
          );

          if (existingIndex !== -1) {
            // Merge the existing object
            chatUsers[existingIndex] = {
              ...chatUsers[existingIndex],
              lastMsg: msg.text,
              createdAt: new Date(msg?.createdAt),
            };
          } else {
            // Add a new object to the chatUsers array
            chatUsers.push({
              lastMsg: msg.text,
              otherUserId: Item?.userDetail.agoraId,
              createdAt: new Date(msg?.createdAt),
            });
          }

          //Save DATA IN REDUX WITH ACTION
          // dispatch(messagesNotification(chatUsers));
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
      .doc(Item?.userDetail.agoraId)
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
              isRead: false,
            };
          } else {
            // Add a new object to the chatUsers array
            chatUsers.push({
              lastMsg: msg.text,
              otherUserId: userData?.agoraId,
              createdAt: new Date(msg?.createdAt),
              isRead: false,
            });
          }

          // Update the Firestore document with the modified chatUsers array
          firebase
            .firestore()
            .collection('users')
            .doc(Item?.userDetail.agoraId)
            .set(
              {
                chatUsers: chatUsers,
                // profilePicture: userData.profilePicture,
              },
              {merge: true},
            );
        }
      });
  }, []);
  //FIREBASE END
  return (
    <>
      <HeaderDetailComponent
        onPress={() => navigation.navigate('NotificationScreen')}
        profileName={Item?.userDetail?.name}
        headerTitle={'Details'}
        arrowBackIcon={arrowbackwhite}
        centerTextStyle={styles.centerHeading}
        backText={'Back'}
        onPressEMail={() => onPressEMail(Item?.userDetail?.email)}
        onPressCall={() => onPressCall(Item?.userDetail?.number)}
        onPressMessage={() => navigationChatScreen(Item)}
        centerImage={Item?.userDetail?.profilePicture}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.topContainer}>
        <TextComponent text={'Ad Details'} styles={styles.headingStyle} />

        <View style={styles.imageHeaderView}>
          <Image
            style={styles.firstImage(imageLenght)}
            // uri={imageUrl(Item?.adDetail.photos[0])}
            source={{uri: imageUrl(Item?.adDetail.photos[0])}}
          />
          {Item?.adDetail.photos.length > 0 && (
            <FlatList
              refreshing={false}
              data={Item?.adDetail.photos}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
            />
          )}
        </View>

        <View style={styles.detail}>
          <View style={styles.detailTitle}>
            <TextComponent text={Item?.adDetail?.title} styles={styles.title} />
            <TextComponent
              text={'$' + Item?.adDetail?.price}
              styles={styles.price}
            />
          </View>

          <TextComponent
            text={'For ' + Item?.adDetail?.adType}
            styles={styles.forRent}
          />

          <View style={styles.locationMain}>
            <Image source={locationBlueIcon} style={styles.loctStyle} />
            <TextComponent
              numberOfLines={2}
              text={Item?.adDetail?.location}
              styles={styles.locationText}
            />
          </View>
          <View style={{marginLeft: wp('2')}}>
            <TextComponent
              text={'Description'}
              styles={styles.descriptionHeading}
            />
            <TextComponent
              text={Item?.adDetail.description}
              numberOfLines={5}
              styles={styles.desText}
            />
          </View>
          <TextComponent
            // onPress={() => onSend('Hello World')}
            text={'General Preferences'}
            styles={styles.headingStyle}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Item?.adDetail?.generalPref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
          <TextComponent
            text={'Outside Preferences'}
            styles={{...styles.headingStyle, marginTop: hp('2')}}
          />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Item?.adDetail?.outsidePref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
          {/* {console.log(firstMsg, 'asdfljsdlkfj')} */}
          <TextComponent
            onPress={() => onSend(firstMsg)}
            text={'Inside Preferences'}
            styles={{...styles.headingStyle, marginTop: hp('2')}}
          />

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Item?.adDetail?.insidePref}
            renderItem={({item}) => {
              return (
                <>
                  <View style={styles.SocialBoxContainer}>
                    <SocialBoxNotification
                      image={item?.image}
                      imageText={item?.name}
                    />
                  </View>
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default memo(index);
