import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class ScheduleRideScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      isDriver: '',
      isAdmin: '',
      id: '',
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: '',
      binded: false,
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

  // handles image change
  handleImgChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
        image
      }));
    }
  }

  // bind user data
  bindUserData = () => {
    const accountsRef = fire.database().ref('accounts');
    accountsRef
      .orderByChild('email')
      .equalTo(user[3])
      .on('value', snapshot => {
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
      });
    })
    this.setState({ binded: true });
  }

  // logout
  logout = () => {
    user[0] = '';
    user[1] = '';
    user[2] = '';
    user[3] = '';
    user[4] = '';
    user[5] = '';
    user[6] = '';
    user[7] = '';
    user[8] = '';
    user[9] = '';

    fire.auth().signOut();
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Text>Lorem Ipsum</Text>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

