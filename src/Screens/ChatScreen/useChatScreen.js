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
                      // setUsers(prev => [...prev, innerDoc.data()]);
                      console.log('innerDoc.data()', innerDoc.data());
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
  const useEffectFun = () => {
    const event = addListener('focus', getUsers);
    return event;
  };
  useEffect(useEffectFun, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      console.log(data, 'ljlkajlkajalkjal'); // Access the usersData array here
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
    searchData,
  };
};
export default useChatScreen;
