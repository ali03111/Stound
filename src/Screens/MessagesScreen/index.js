// import React, {memo, useCallback} from 'react';
// import {
//   View,
//   FlatList,
//   Dimensions,
//   Image,
//   ScrollView,
//   Text,
//   TextInput,
// } from 'react-native';
// import MessagesHeader from '../MessagesScreen/MessagesHeader';
// import MessagesComp from '../MessagesScreen/MessagesComp';
// import {styles} from './styles';
// import useChatScreen from './useChatScreen';
// import {wp} from '../../Config/responsive';
// import {
//   arrowback,
//   moredots,
//   search,
//   smsedit,
//   arrowbackwhite,
//   whitedots,
//   send,
// } from '../../Assests';
// import MsgSendButton from '../../Components/MsgSendButton';
// import {Colors} from '../../Theme/Variables';

// const MessagesScreen = () => {
//   const {msgs, getStart} = useChatScreen();
//   const [text, onChangeText] = React.useState('');
//   const renderItem = useCallback(({item, index}) => {
//     return (
//       <View style={styles.notification}>
//         <MessagesComp user={item?.user} time={item?.time} msg={item?.msg} />
//       </View>
//     );
//   });
//   return (
//     <View style={{flex: 1}}>
//       <MessagesHeader
//         style={styles.topHeader}
//         headerTitle={'Gregory Hayes'}
//         arrowBackIcon={arrowbackwhite}
//         icon={whitedots}
//         centerTextStyle={styles.centerHeading}
//       />

//       <FlatList
//         refreshing={false}
//         data={msgs}
//         scrollEnabled
//         renderItem={renderItem}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 20,
//           paddingHorizontal: wp('4'),
//         }}
//       />
//       <View style={styles.searchBar}>
//         <View style={styles.searchMain}>
//           <TextInput
//             style={styles.searchinput}
//             onChangeText={onChangeText}
//             value={text}
//             placeholder={'Type a message'}
//             placeholderTextColor={Colors.gray}
//           />
//           <MsgSendButton
//             title={'Send'}
//             image={send}
//             style={styles.sendBtnStyle}
//             textStyle={styles.sendTextStyle}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default memo(MessagesScreen);
// Imports dependencies.
import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ChatClient,
  ChatOptions,
  ChatMessageChatType,
  ChatMessage,
  ChatConversationType,
  ChatConversation,
} from 'react-native-agora-chat';
import index from '../BuyCoinScreen';
import useReduxStore from '../../Hooks/UseReduxStore';

// Defines the App object.
const App = () => {
  const {getState} = useReduxStore();
  const {userData} = getState('Auth');
  // Defines the variable.
  const title = 'AgoraChatQuickstart';
  // Replaces <your appKey> with your app key.
  const appKey = '61979408#1143303';
  // Replaces <your userId> with your user ID.
  // const [username, setUsername] = React.useState('<your userId>')
  const [username, setUsername] = React.useState('');

  // '7d66c38a6d334bc19ddfea3536c04f51',
  console.log(userData?.agoraId, 'HLElJELJELJELjkae');
  // Replaces <your agoraToken> with your Agora token.
  // const [chatToken, setChatToken] = React.useState('<your agoraToken>');
  const [chatToken, setChatToken] = React.useState(
    //user1
    // '007eJxTYJjp/qX67vp7j4/tLZI3qDunbs+4qMWJcckb2aSApQ/aE04qMCSlmKaYGqSkppmlJZukGRglGhgZmRinmliYW5obGpmkdAjVpzQEMjJ8TrvIxMjAysAIhCC+CkNqqlFqaoqxga6BiamFrqFhaqquRUqyha6RqbmhQbJRWpJZcjIABnko1A=='
    // '007eJxTYPgp8NT6du9/pwqTkwvWL5wcGrOUW3uH8kwB5uYU24pLq8oVGJJSTFNMDVJS08zSkk3SDIwSDYyMTIxTTSzMLc0NjUxSrIXrUxoCGRm2bwxnZWRgZWAEQhBfhSHF0CzN1MzUQNfAOMlM19AwNVXXMs3ETNckyTLZ2NLM0Mw02RwAUzomHg=='
    // '007eJxTYEg7teGHUcGR3Vu+a6/R8P3p5yTn+nVKO7PO1ycXFbfatpxRYEhKMU0xNUhJTTNLSzZJMzBKNDAyMjFONbEwtzQ3NDJJYRapT2kIZGSw7+dhZmRgZWAEQhBfhcHM2MTQKNnAQNfAxNRS19AwNVU3KS3NRDfZMtHAPC0lzSLRLA0AymcnbQ=='
    // '007eJxTYPht9VVp8up3jIsWHZ8dK/RMhvuZeYeQaOO8imjBjdGzJNcrMCSlmKaYGqSkppmlJZukGRglGhgZmRinmliYW5obGpmk7NKoT2kIZGSY9+A+IyMDKwMjEIL4KgzmZpapaabmBroGJqapuoaGqam6icaGprpmlilAk5IszBONDABZ0icS'
    //user6
    '007eJxTYEj/JDD3HVOF5MaVdzln1Nvc7Lz5o/RKFqdcU1deiqIQX6cCQ1KKaYqpQUpqmllaskmagVGigZGRiXGqiYW5pbmhkUnKOcPmlHv2zSmT31iwMDKwMjAyMDGA+AwMAJOtH38=',
    // 'Test@123'
  );
  const [targetId, setTargetId] = React.useState('');

  // '75b1654382d34921ba118ae8b2e3bb5d',
  const [content, setContent] = React.useState('');
  const [logText, setWarnText] = React.useState('Show log area');
  const chatClient = ChatClient.getInstance();
  const chatManager = chatClient.chatManager;
  // Outputs console logs.
  useEffect(() => {
    logText.split('\n').forEach((value, index, array) => {
      if (index === 0) {
        console.log(value);
      }
    });
  }, [logText]);

  // Outputs UI logs.
  const rollLog = text => {
    setWarnText(preLogText => {
      let newLogText = text;

      preLogText
        .split('\n')
        .filter((value, index, array) => {
          if (index > 8) {
            return false;
          }
          return true;
        })
        .forEach((value, index, array) => {
          newLogText += '\n' + value;
        });
      return newLogText;
    });
  };

  // Registers listeners for messaging.
  const setMessageListener = () => {
    let msgListener = {
      onMessagesReceived(messages) {
        for (let index = 0; index < messages.length; index++) {
          console.log(Platform.OS, messages[index], 'aaa');
          console.warn('received msgIda: ' + messages);
        }
        // ChatClient.getInstance()
        //   .chatManager.fetchConversationsFromServerWithPage(20, 1)
        //   .then(result => {
        //     console.log('test:success:', result);
        //   })
        //   .catch(error => {
        //     console.warn('test:error:', error);
        //   });
        // Specify the conversation ID.
        //ConvId are same and msgId are different
        const convId = 'bce66aba6dd34f15a0bf0466de41a32d'; // ios messages
        // const convId = '67c2bd7564944d26ab152113a192f01a';
        // Specify the conversation type. For details, see descriptions in  ChatConversationType.
        const convType = ChatConversationType.PeerChat;
        // Specify the maximum count of the retrieved messages.
        const pageSize = 10;
        // Specify the message ID from which to retrieve the historical messages.
        const startMsgId = ''; //ios id i think
        // const startMsgId = '1154315847120980932'; //android
        chatType = 0;
        ChatClient.getInstance()
          .chatManager.fetchHistoryMessages(
            convId,
            chatType,
            pageSize,
            startMsgId,
          )
          .then(messages => {
            console.log('get message success: ', messages.list[1].body);
            messages.list.map(listmsg => console.log('All Messages', listmsg));
          })
          .catch(reason => {
            console.log('load conversions fail.', reason);
          });

        ChatConversation()
          .then(result => {
            console.log('test:success:', result);
          })
          .catch(error => {
            console.warn('test:error:', error);
          });
      },

      onCmdMessagesReceived: messages => {
        console.log('onCmdMessagesReceived', messages);
      },
      onMessagesRead: messages => {
        console.log('onMessagesRead', messages);
      },
      onGroupMessageRead: groupMessageAcks => {
        console.log('onGroupMessageRead', messages);
      },
      onMessagesDelivered: messages => {
        console.log('onMessagesDelivered', messages);
      },
      onMessagesRecalled: messages => {
        console.log('onMessagesRecalled', messages);
      },
      onConversationsUpdate: messages => {
        console.log('onConversationsUpdate', messages);
      },
      onConversationRead: (from, to) => {
        console.log('onConversationRead', from, to);
      },
    };
    chatManager.removeAllMessageListener();
    chatManager.addMessageListener(msgListener);
  };
  useEffect(() => {
    // Initializes the SDK.
    // Initializes any interface before calling it.
    const init = () => {
      let o = new ChatOptions({
        autoLogin: true,
        appKey: appKey,
      });
      chatClient.removeAllConnectionListener();
      chatClient
        .init(o)

        .then(() => {
          rollLog('init success');
          this.isInitialized = true;
          let listener = {
            onTokenWillExpire(res) {
              rollLog('token expire.');
            },
            onTokenDidExpire() {
              rollLog('token did expire');
            },
            onConnected() {
              rollLog('onConnected');
              setMessageListener();
            },
            onDisconnected(errorCode) {
              rollLog('onDisconnected:' + errorCode);
            },
          };
          chatClient.addConnectionListener(listener);
        })
        .catch(error => {
          rollLog(
            'init fail: ' +
              (error instanceof Object ? JSON.stringify(error) : error),
          );
        });
    };
    init();
    setMessageListener();
  }, [chatClient, chatManager, appKey, setMessageListener]);

  // Logs in with an account ID and a token.
  const login = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start login ...');
    // chatClient
    //   // .loginWithAgoraToken(username, chatToken)
    //   .loginWithAgoraToken(
    //     userData?.agoraId,
    //     '007eJxTYFhm2Kl3/8+kv01TveYr8+/u/+/JdfKYkJ7rPQOxntkf7pkpMCSlmKaYGqSkppmlJZukGRglGhgZmRinmliYW5obGpmkrBFoTtkj15xi/vgBCyMDKwMjEIL4CgzmKWZmycYWiWYpxsYmScmGlikpaamJxqbGZskGJmmmhgCHOylj',
    //   )
    //   .then(res => {
    //     console.log('login operation success.', res);

    //     rollLog('login operation success.', res);
    //   })
    //   .catch(reason => {
    //     rollLog('login fail: ' + JSON.stringify(reason));
    //   });
  };
  // Logs out from server.
  const logout = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }
    rollLog('start logout ...');
    chatClient
      .logout()
      .then(() => {
        rollLog('logout success.');
      })
      .catch(reason => {
        rollLog('logout fail:' + JSON.stringify(reason));
      });
  };
  // Sends a text message to somebody.
  const sendmsg = () => {
    if (this.isInitialized === false || this.isInitialized === undefined) {
      rollLog('Perform initialization first.');
      return;
    }
    let msg = ChatMessage.createTextMessage(
      targetId,
      content,
      ChatMessageChatType.PeerChat,
    );
    const callback = new (class {
      onProgress(locaMsgId, progress) {
        rollLog(`send message process: ${locaMsgId}, ${progress}`);
      }
      onError(locaMsgId, error) {
        rollLog(`send message fail: ${locaMsgId}, ${JSON.stringify(error)}`);
      }
      onSuccess(message) {
        rollLog('send message success: ' + message.localMsgId);
      }
    })();
    rollLog('start send message ...');
    chatClient.chatManager
      .sendMessage(msg, callback)
      .then(() => {
        rollLog('send message: ' + msg.localMsgId);
      })
      .catch(reason => {
        rollLog('send fail: ' + JSON.stringify(reason));
      });
  };
  // Renders the UI.
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter chatToken"
            onChangeText={text => setChatToken(text)}
            value={chatToken}
          />
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.eachBtn} onPress={login}>
            SIGN IN
          </Text>
          <Text style={styles.eachBtn} onPress={logout}>
            SIGN OUT
          </Text>
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter the username you want to send"
            onChangeText={text => setTargetId(text)}
            value={targetId}
          />
        </View>
        <View style={styles.inputCon}>
          <TextInput
            multiline
            style={styles.inputBox}
            placeholder="Enter content"
            onChangeText={text => setContent(text)}
            value={content}
          />
        </View>
        <View style={styles.buttonCon}>
          <Text style={styles.btn2} onPress={sendmsg}>
            SEND TEXT
          </Text>
        </View>
        <View>
          <Text style={styles.logText} multiline={true}>
            {logText}
          </Text>
        </View>
        <View>
          <Text style={styles.logText}>{}</Text>
        </View>
        <View>
          <Text style={styles.logText}>{}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
// Sets UI styles.
const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: '#6200ED',
  },
  title: {
    lineHeight: 60,
    paddingLeft: 15,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  inputCon: {
    marginLeft: '5%',
    width: '90%',
    height: 60,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputBox: {
    marginTop: 15,
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonCon: {
    marginLeft: '2%',
    width: '96%',
    flexDirection: 'row',
    marginTop: 20,
    height: 26,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eachBtn: {
    height: 40,
    width: '28%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  btn2: {
    height: 40,
    width: '45%',
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#6200ED',
    borderRadius: 5,
  },
  logText: {
    padding: 10,
    marginTop: 10,
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
export default App;
