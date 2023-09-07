// import useNotificationScreen from '.';

import {ChatData} from '../../Utils/localDB';
import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {messagesNotification} from '../../Redux/Action/messagesAction';
const useChatScreen = ({navigate, goBack, addListener}) => {
  const [users, setUsers] = React.useState([]);

  const db = firebase.firestore();

  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');
  const {isloading} = getState('isloading');

  console.log('asdasdasdas', getState('notification'));
  // SearchFilter For ChatScreen
  useEffect(() => {
    const newSearchContact = users.filter(contact =>
      contact.name.toLowerCase().includes(changeText.toLowerCase()),
    );
    setUsers(newSearchContact);
  }, [changeText]);

  const getUsers = async () => {
    dispatch(loadingTrue());

    if (userData.agoraId) {
      var usersData = []; // Create an array to store the user data
      await db
        .collection('users')
        .where('userId', '==', userData.agoraId)
        .get()
        .then(async snap => {
          for (const doc of snap.docs) {
            const chatUsers = doc.data().chatUsers || [];
            for (const item of chatUsers) {
              await db
                .collection('users')
                .where('userId', '==', item.otherUserId)
                .get()
                .then(innerSnap => {
                  console.log(innerSnap._docs, 'aaaaaa');
                  innerSnap.forEach(innerDoc => {
                    if (innerDoc.exists) {
                      console.log(
                        'innerDoc.data()',
                        innerDoc.data()?.chatUsers,
                      );
                      usersData.push(innerDoc.data());
                    }
                  });
                });
            }
          }
        });

      setUsers(usersData);

      dispatch(loadingFalse());
    }
  };

  //IsRead True in User Chat in on
  // Function to update isRead to true
  const updateIsRead = async () => {
    dispatch(loadingTrue());

    if (userData.agoraId) {
      await db
        .collection('users')
        .where('userId', '==', userData.agoraId)
        .get()
        .then(async snap => {
          for (const doc of snap.docs) {
            const chatUsers = doc.data().chatUsers || [];
            for (const item of chatUsers) {
              await db
                .collection('users')
                .doc(item.otherUserId)
                .get()
                .then(async innerDoc => {
                  if (innerDoc.exists) {
                    const chatUsersData = innerDoc.data().chatUsers || [];
                    const updatedChatUsers = chatUsersData.map(chatUser => {
                      if (chatUser.otherUserId == userData.agoraId) {
                        return {...chatUser, isRead: true};
                      }
                      return chatUser;
                    });

                    await db.collection('users').doc(item.agoraId).update({
                      chatUsers: updatedChatUsers,
                    });
                  }
                });
            }
          }
        });
    }
    dispatch(loadingFalse());
  };

  // Call the function to update isRead when the component mounts (screen is shown)
  useEffect(() => {
    updateIsRead();

    return () => {};
  }, []);

  const useEffectFun = () => {
    const event = addListener('focus', getUsers);
    return event;
  };
  useEffect(useEffectFun, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  //FILTER LOGIC SCREEN
  const [changeText, onChangeText] = React.useState('');
  const [searchData, setSearchData] = React.useState([]);

  React.useEffect(() => {
    const filterData = () => {
      if (changeText.trim() === '') {
        setSearchData(users);
      } else {
        const filteredData = users.filter(item => {
          const itemName = item.name.toLowerCase();
          const searchText = changeText.toLowerCase();
          return itemName.includes(searchText);
        });
        setSearchData(filteredData);
      }
    };

    filterData();
  }, [changeText, users]);
  const navigateToMsg = item =>
    navigate('MessagesScreen', {id: item.userId, userDetail: item});

  return {
    ChatData,
    navigateToMsg,
    users,
    userData,
    changeText,
    onChangeText,
    searchData:searchData?.slice().reverse(),
    isloading,
  };
};
export default useChatScreen;
