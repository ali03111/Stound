// import useNotificationScreen from '.';

import {ChatData} from '../../Utils/localDB';
import React, {useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
const useChatScreen = ({navigate, goBack}) => {
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

  const navigateToMsg = () => navigate('MessagesScreen');

  return {ChatData, navigateToMsg};
};
export default useChatScreen;
