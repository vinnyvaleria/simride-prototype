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
import { ChatboxDisplay, SearchButton } from '../../components';
import { user } from '../Landing/StartScreen';

//styling
import { pageStyle, screenStyle } from'./styles';

var unameArr = [];
var allchats = [];
var chats = [];

var chatName;
var search;

export default class InboxMainScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchUname: '',
      email: '',
      userFound: false,
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;
        })
      })    
      .then(() => {
        if (typeof user[3] === 'undefined') {
          fire.auth().signOut();
        } else {
          if (user[6] !== '') {
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

            fire.firestore().collection('chat').get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                allchats.push(doc.id);
                chats = Array.from(new Set(allchats))
              });
            })
          }
        }})
    this.setState({ binded: true });
  }

  searchUser = () => {
    let i = 0;
    var currUser = user[2].toLowerCase();
    search = this.state.searchUname.toLowerCase();

    // creates chat based on usernames
    while (i < unameArr.length) {
      // checks if there is a valid account in the database
      if (search === unameArr[i].toLowerCase()) {
        //creates chat based on username length
        if (currUser.length !== search.length) {
          if (currUser.length < search.length) {
            chatName = (currUser + '-' + search)
          } else {
            chatName = (search + '-' + currUser)
          }
        }

        // if same length compare by alphabets
        else {
          if (currUser < search) {
            chatName = (currUser + '-' + search)
          } else {
            chatName = (search + '-' + currUser)
          }
        }
        console.log(chatName);     
        this.state.userFound = true;
      } else if (search != unameArr[i]) {
        console.log('User not found');
      }
      i++;
    }

    if (this.state.userFound) {
      this.props.navigation.navigate('Personal Chat');
    } else {
      alert('User not found');
    }
  }

  listAllChats = () => {
    for (var c = 0; c < chats.length; c++) {
      if (chats[c].includes(user[2])) {
        value = chats[c].toString().replace(user[2], '').replace('-', '');
        <ChatboxDisplay label={value} /> 
      }
    }
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.formwrap}>
            <SearchButton  
              value={this.state.searchUname}
              onChangeText={(searchUname) => this.setState({ searchUname })}
              onPress={this.searchUser}
            />
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  } 
}

export { chatName, search };
