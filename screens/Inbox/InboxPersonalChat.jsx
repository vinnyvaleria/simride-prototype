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
import { SendMessageButton, ChatboxDisplayRight, CheckProfile } from '../../components';
import { user } from '../Landing/StartScreen';
import { chatName } from './InboxMainScreen';
import { search } from './InboxMainScreen';

//styling
import { pageStyle, screenStyle } from'./styles';

// images
import profilepicture from '../../assets/images/picture.jpg';


var unameArr = [];
var allchats = [];
var chats = [];
var msgsComponent = [];

export default class InboxPersonalChat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      binded: false,
      email: '',
      message: '',
      displayMsgs: [],
    };
  }

  componentDidMount = () => {
    this.setState({displayMsgs: []});
    msgsComponent = [];
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.getMessages();
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;
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

  getMessages = () => {
    fire.firestore().collection("chat/" + chatName + "/messages").orderBy("timestamp").onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((doc) => {
        var message = doc.doc.data();
        this.displayChatBox(message.text);
      });
    });
  }

  // open chat with searched user 
  displayChatBox = (text) => {
    msgsComponent.push(<ChatboxDisplayRight label={text} />)
    this.setState({
      displayMsgs: msgsComponent,
    })
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
      
    //this.displayChatBox(text);
  }

  render () {
    if (this.state.binded) {
      return (
        <View style={screenStyle}>
          <CheckProfile
            source={profilepicture}
            label={search}
          />
          <ScrollView 
            style={pageStyle.formwrap}
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            {this.state.displayMsgs}
          </ScrollView>
          <SendMessageButton
            value={this.state.message}
            onChangeText={(message) => this.setState({ message })}
            onPress={this.newChat}
            //onPress={() => this.props.navigation.navigate('Personal Chat')} 
          />
        </View>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

