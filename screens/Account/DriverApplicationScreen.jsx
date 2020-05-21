import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import SubmitButton from '../../components/SubmitButton';
import { user } from '../Landing/StartScreen';

//styling
import { pageStyle, screenStyle } from './styles';
import { COLORS } from '../../constants/colors';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class DriverApplicationScreen extends React.Component {
  constructor (user) {
    super(user);
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
      binded: ''
    };
  }

  UNSAFE_componentWillMount = () => {
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
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.wrapper}>
          <Image style={pageStyle.image} source={profilepicture} />

          <Text style={pageStyle.header}>First Name</Text>
          <TextInput style={pageStyle.textinput} placeholder={user[0]} />

          <Text style={pageStyle.header}>Last Name</Text>
          <TextInput style={pageStyle.textinput} placeholder={user[1]} />

          <Text style={pageStyle.header}>Phone Number</Text>
          <TextInput style={pageStyle.textinput} placeholder={user[4].toString()} />

          <Text
            style={{color: COLORS.GREY, marginBottom: 15, fontSize: 12}}
          >Applying to be a driver?</Text>

          <View style={pageStyle.equalspace}>
            <SubmitButton title='Update Profile' />
            <SubmitButton title='Change Password' />
          </View>
        </View>
        
      </ScrollView>
    );
  }
}

