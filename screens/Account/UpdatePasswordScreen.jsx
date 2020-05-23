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
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

//styling
import { pageStyle, screenStyle } from './styles';
import { COLORS } from '../../constants/colors';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class UpdatePasswordScreen extends React.Component {
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
      wallet: '',
      id: '',
      rating: '',
      ratedBy: '',
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: '',
      balance: '',
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
  handleImgChange  = () => {
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;
      });
    })
    this.setState({ binded: true });
  }

  // real time update profile
  updatePassword = () => {
    if (this.state.newPassword === this.state.confirmPassword) {
      var user = fire.auth().currentUser;

      user.updatePassword(this.state.confirmPassword).then(() => {
        alert("Password updated successfully!");
      }).catch((error) => {
        alert(error);
      });

      this.setState({
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      alert("Passwords do not match!");
    }
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Image style={pageStyle.image} source={profilepicture} />

            <Text style={pageStyle.header}>New Password</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Please enter your new password'
              value={this.state.newPassword} 
              onChangeText={(newPassword) => this.setState({ newPassword })}
              secureTextEntry
            />

            <Text style={pageStyle.header}>Re-enter New Password</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Please re-enter your new password'
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              secureTextEntry
            />
            
            <View style={pageStyle.equalspace}>
              <SubmitButton title='Save' onPress={this.updatePassword} />
            </View>
          </View>
          
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

