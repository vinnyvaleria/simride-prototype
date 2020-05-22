import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import * as Datetime from 'react-datetime';

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
      email: '',
      currPassengers: '',
      payMethod: '',
      date: Datetime.moment(),
      postal: '',
      removeReason: '',
      recurringWeeks: 1,
      createArea: 'Admiralty',
      createTowards: 'School',
      createMaxPassengers: '1',
      bookingID: ''
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;
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

            <Text style={pageStyle.header}>First Name</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your first name' 
              value={this.state.firstName}
              onChangeText={(firstName) => this.setState({ firstName })}
            />

            <Text style={pageStyle.header}>Last Name</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your last name'
              value={this.state.lastName} 
              onChangeText={(lastName) => this.setState({ lastName })}
            />

            <Text style={pageStyle.header}>E-mail</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your e-mail'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
            />

            <Text style={pageStyle.header}>Phone Number</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your phone number'
              value={this.state.phone}
              onChangeText={(phone) => this.setState({ phone })} 
            />

            <Text style={pageStyle.header}>Username</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your preferred username'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}  
            />

            <Text style={pageStyle.header}>Password</Text>
            <TextInput 
              style={pageStyle.textinput}
              placeholder='Your password' 
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />

            <Text style={pageStyle.header}>Re-enter Password</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Please re-enter your password'
              value={this.state.repassword}
              onChangeText={(repassword) => this.setState({ repassword })}
              secureTextEntry 
            />
          
            <View style={pageStyle.equalspace}>
              <SubmitButton title='Submit' onPress={this.signup} />
              <SubmitButton title='Cancel' onPress={() => {{this.props.navigation.navigate('Start')}}} />
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

