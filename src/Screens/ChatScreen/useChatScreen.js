// import useNotificationScreen from '.';

import {ChatData} from '../../Utils/localDB';
import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
const useChatScreen = ({navigate, goBack, addListener}) => {
  const [users, setUsers] = React.useState([]);
  const [storUser, setStoreUsers] = React.useState([]);
  const db = firebase.firestore();

  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');

  const useEffectFun = () => {
    const event = addListener('focus', getUsers);
    return event;
  };
  useEffect(useEffectFun, []);
  // const getUsers = async () => {
  //   dispatch(loadingTrue());

  //   if (userData.agoraId) {
  //     var usersData = []; // Create an array to store the user data
  //     // const storeOtheIds = []; // Create an array to store the user data

  //     await db
  //       .collection('users')
  //       .where('userId', '==', userData.agoraId)
  //       .get()
  //       .then(snap => {
  //         snap.forEach(doc => {
  //           console.log(doc.data().chatUsers, '1545454545');
  //           console.log(storUser, '16511542');

  //           if (doc.data().chatUsers != []) {
  //             doc.data().chatUsers.map(async item => {
  //               await db
  //                 .collection('users')
  //                 .where('userId', '==', item.otherUserId)
  //                 .get()
  //                 .then(snap => {
  //                   snap.forEach(doc => {
  //                     if (doc.data() != []) {
  //                       usersData.push(doc.data());
  //                     }
  //                   });
  //                 });
  //             });
  //           }
  //           // if (doc.data() != []) {
  //           //   usersData.push(doc.data()); // Add each user data to the array
  //           // }
  //         });
  //       });

  //     // await db
  //     //   .collection('users')
  //     //   .where('userId', 'array-contains-any', [
  //     //     '02a9774c-35b7-4c3e-a8ff-5e4d9d4910a2',
  //     //   ])
  //     //   .get()
  //     //   .then(snap => {
  //     //     snap.forEach(doc => {
  //     //       console.log(doc.data(), 'ajuajuajua');

  //     //       if (doc.data() != []) {
  //     //         usersData.push(doc.data()); // Add each user data to the array
  //     //       }
  //     //     });
  //     //   });
  //     // setStoreUsers(storeOtheIds);

  //     setUsers(usersData);

  //     dispatch(loadingFalse()); // Save the user data in the setUsers state variable
  //   }
  // };

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

  // Iterate through the snapshot to extract the chat room IDs
  const navigateToMsg = item =>
    navigate('MessagesScreen', {id: item.userId, userDetail: item});

  return {ChatData, navigateToMsg, users, userData};
};
export default useChatScreen;
