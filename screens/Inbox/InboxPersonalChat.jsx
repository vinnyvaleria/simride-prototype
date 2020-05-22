import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SendMessageButton } from '../../components';
import { user } from '../Landing/StartScreen';
import { chatName } from './InboxMainScreen';
import { search } from './InboxMainScreen';

//styling
import { pageStyle, screenStyle } from'./styles';

var unameArr = [];
var allchats = [];
var chats = [];

export default class InboxPersonalChat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      binded: false,
      email: '',
      message: '',
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

  // bind user data
  bindUserData = () => {
    const accountsRef = fire.database().ref('accounts');
    accountsRef
      .orderByChild('email')
      .equalTo(user[3])
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          user[0] = child.val().fname;
          user[1] = child.val().lname;
          user[2] = child.val().uname;
          user[4] = child.val().phone;
          user[5] = child.val().isDriver;
          user[6] = child.val().isAdmin;
          user[7] = child.val().isBanned;
          user[8] = child.val().wallet;
          user[9] = child.key;
        })
      })    
      .then(() => {
        if (typeof user[3] === 'undefined') {
          fire.auth().signOut();
        } else {
          if (user[6] !== "") {
            // loads accounts
            fire.database()
              .ref('accounts')
              .orderByChild('uname')
              .once('value')
              .then((snapshot) => {
                var i = 0;
                snapshot.forEach((child) => {
                  unameArr[i] = child.val().uname;
                  i++;
                })
              });

            fire.firestore().collection("chat").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                allchats.push(doc.id);
                chats = Array.from(new Set(allchats))
              });
            })
          }
        }})
    this.setState({ binded: true });
  }

  // open chat with searched user 
  openChat = () => {
    let chatsRef = fire.firestore().collection('chat');

    chatsRef
      .doc(chatName)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((doc) => {
          var message = doc.doc.data();
          var html = "";
          // give each message a unique ID
          html += "<li id='message-" + message.timestamp + "'>";
          html += message.from + ": " + message.text;
          html += "</li>";

          console.log(html);
        });
      });

  }

  newChat = () => {
    let chatsRef = fire.firestore().collection('chat').doc(chatName).collection('messages');

    let data = {
      from: user[2],
      to: search,
      text: this.state.message,
      timestamp: new Date(),
    }

    chatsRef
      .add(data)
      .then(ref => {
      console.log('Added document with ID: ', ref.id);
      })
      .catch((error) => {
        alert('Error sending message.', error);
      });
    /*chatsRef
      .get()
      .then((docSnapshot) => {
        if ((docSnapshot.exists)) {
          fire.firestore().collection('messages/' + chatName).add({data});
        }
      })
      .catch((error) => {
        alert('Error sending message.', error);
      });*/
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.formwrap}>
            <Text style={pageStyle.title}>Anjir</Text>
            <SendMessageButton
              value={this.state.message}
              onChangeText={(message) => this.setState({ message })}
              onPress={this.newChat}
              //onPress={() => this.props.navigation.navigate('Personal Chat')} 
            />
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

