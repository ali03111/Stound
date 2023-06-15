// import useNotificationScreen from '.';

import {ChatData} from '../../Utils/localDB';
import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
const useChatScreen = ({navigate, goBack, addListener}) => {
  const [users, setUsers] = React.useState([]);
  const db = firebase.firestore();

  const {getState, dispatch} = useReduxStore();
  const {userData} = getState('Auth');
  // const [users, setUsers] = React.useState([]);
  // //All Data data from Firestore except Login User
  // useEffect(() => {
  //   getUsers();
  // }, []);
  // const getUsers = async () => {
  //   await db
  //     .collection('users')
  //     .where('email', '!=', email)
  //     .get()
  //     .then(snap => {
  //       snap.forEach(doc => {
  //         if (doc.data != []) {
  //           setUsers([doc.data()]);
  //         }
  //       });
  //     });
  // };
  const useEffectFun = () => {
    const event = addListener('focus', getUsers);
    return event;
  };
  useEffect(useEffectFun, []);
  const getUsers = async () => {
    dispatch(loadingTrue());

    if (userData.agoraId) {
      const usersData = []; // Create an array to store the user data

      await db
        .collection('users')
        .where('userId', '!=', userData.agoraId)
        .get()
        .then(snap => {
          snap.forEach(doc => {
            console.log(doc);
            if (doc.data() != []) {
              usersData.push(doc.data()); // Add each user data to the array
            }
          });
        });

      setUsers(usersData);
      dispatch(loadingFalse()); // Save the user data in the setUsers state variable
    }
  };
  // Iterate through the snapshot to extract the chat room IDs

  const navigateToMsg = () => navigate('MessagesScreen');

  return {ChatData, navigateToMsg, users};
};
export default useChatScreen;
