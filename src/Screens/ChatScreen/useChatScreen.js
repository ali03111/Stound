// import useNotificationScreen from '.';

import {ChatData} from '../../Utils/localDB';
import React, {useCallback, useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {messagesNotification} from '../../Redux/Action/messagesAction';
import {useFocusEffect} from '@react-navigation/native';
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

  // const getUsers = async () => {
  //   dispatch(loadingTrue());

  //   if (userData.agoraId) {
  //     var usersData = []; // Create an array to store the user data
  //     await db
  //       .collection('users')
  //       .where('userId', '==', userData.agoraId)
  //       .get()
  //       .then(async snap => {
  //         for (const doc of snap.docs) {
  //           const chatUsers = doc.data().chatUsers || [];
  //           for (const item of chatUsers) {
  //             await db
  //               .collection('users')
  //               .where('userId', '==', item.otherUserId)
  //               .get()
  //               .then(innerSnap => {
  //                 console.log(innerSnap._docs, 'aaaaaa');
  //                 innerSnap.forEach(innerDoc => {
  //                   if (innerDoc.exists) {
  //                     console.log(
  //                       'innerDoc.data()',
  //                       innerDoc.data()?.chatUsers,
  //                     );
  //                     usersData.push(innerDoc.data());
  //                   }
  //                 });
  //               });
  //           }
  //         }
  //       });

  //     setUsers(usersData);

  //     dispatch(loadingFalse());
  //   }
  // };

  const getUsers = () => {
    dispatch(loadingTrue());

    if (userData.agoraId) {
      // Create an array to store the user data
      const usersData = [];

      // Reference to the user's document
      const userRef = db.collection('users').doc(userData.agoraId);

      // Listen for changes to the user's chat data
      const unsubscribe = userRef.onSnapshot(async doc => {
        if (doc.exists) {
          const userData = doc.data();
          const chatUsers = userData.chatUsers || [];

          // Clear the existing data
          usersData.length = 0;

          // Loop through chatUsers and fetch corresponding user data
          for (const item of chatUsers) {
            const otherUserId = item.otherUserId;
            const otherUserRef = db.collection('users').doc(otherUserId);
            const otherUserDoc = await otherUserRef.get();

            if (otherUserDoc.exists) {
              const otherUserData = otherUserDoc.data();
              usersData.push(otherUserData);
            }
          }

          // Update the state with the new data
          setUsers(usersData);
          dispatch(loadingFalse());
        }
      });
      // dispatch(loadingFalse());

      // Return the unsubscribe function to clean up the listener when needed
      return unsubscribe;
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
      const data = getUsers();
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

  // const updateIsReadToFalse = async () => {
  //   if (userData.agoraId) {
  //     const userRef = db.collection('users').doc(userData.agoraId);

  //     try {
  //       const chatUsersSnapshot = await userRef.get();

  //       if (chatUsersSnapshot.exists) {
  //         const userData = chatUsersSnapshot.data();

  //         if (userData.chatUsers && Array.isArray(userData.chatUsers)) {
  //           const updatedChatUsers = userData.chatUsers.map(chatUser => {
  //             if (chatUser.isRead === true) {
  //               chatUser.isRead = false;
  //             }
  //             return chatUser;
  //           });

  //           await userRef.update({ chatUsers: updatedChatUsers });
  //           console.log('isRead updated to false for relevant chat users');
  //         } else {
  //           console.log('chatUsers field is missing or not an array');
  //         }
  //       } else {
  //         console.log('User document does not exist');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   } else {
  //     console.log('userData.agoraId is not defined');
  //   }
  // };

  const updateIsReadToFalse = async () => {
    if (userData.agoraId) {
      const userRef = db.collection('users').doc(userData.agoraId);
      const userSnapshot = await userRef.get();
      const userData = userSnapshot.data();

      if (userData && userData.chatUsers) {
        const batch = db.batch();

        userData.chatUsers.forEach(chatUser => {
          const otherUserId = chatUser.otherUserId;
          const messagesRef = db
            .collection('users')
            .doc(otherUserId)
            .collection('messages');

          // Update all messages in the messages collection for the chat user
          messagesRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const messageData = doc.data();

              // Check if the message belongs to the current user
              if (messageData.userId === userData.agoraId) {
                // Update the message's isRead status to false
                const messageRef = messagesRef.doc(doc.id);
                batch.update(messageRef, {isRead: false});
              }
            });
          });
        });

        // Commit the batch update
        await batch.commit();
      }
    }
  };

  // useFocusEffect(() => {
  //   // Your logic to run when the screen gains focus
  //   console.log('Screen is focuaasedaaa');
  //   updateIsReadToFalse();
  // });

  useFocusEffect(
    useCallback(() => {
      // alert('Screen was focused');

      // Do something when the screen is focused
      return () => {
        updateIsReadToFalse();

        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  const navigateToMsg = item =>
    navigate('MessagesScreen', {id: item.userId, userDetail: item});

  return {
    ChatData,
    navigateToMsg,
    users,
    userData,
    changeText,
    onChangeText,
    searchData: searchData?.slice().reverse(),
    isloading,
  };
};
export default useChatScreen;
