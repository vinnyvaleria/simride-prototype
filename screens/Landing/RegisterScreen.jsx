import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// styling
import { pageStyle, screenStyle } from './styles';
import logo from '../../assets/images/logo.png';

// components
import { SubmitButton } from '../../components';
import { user } from './StartScreen';

var unameArr = [];
var emailArr = [];
var phoneArr = [];
var countArr = [];

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      repassword: '',
      wallet: '',
      rating: '',
      ratedBy: ''
    };
  }

  componentDidMount = () => {
    // counts current total account registered
    fire.database()
    .ref('admin')
    .orderByChild('acct')
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((child) => {
        countArr[0] = child.val().acct;
      })
    });

  // loads accounts
  fire.database().ref('accounts')
    .orderByChild('email')
    .once('value', snapshot => {
      var i = 0;
      snapshot.forEach((child) => {
        unameArr[i] = child.val().uname;
        emailArr[i] = child.val().email;
        phoneArr[i] = child.val().phone;
        i++;
      })
    });
  }

  signup = () => {
    // checks for duplicate username
    var i = 0;
    var unameCheck = false;
    var phoneCheck = false;
    const rg = new RegExp("^((8|9)[0-9]{7}$)");
    while (i < unameArr.length) {
      if (this.state.username === unameArr[i]) {
        alert('Username has already been taken!');
        unameCheck = false;
        break;
      } else {
        unameCheck = true;
      }
      if (this.state.phone === phoneArr[i]) {
        alert('Phone number has already been registered!');
        phoneCheck = false;
        break;
      } else {
        phoneCheck = true;
      }
      i++;
    };

    if (rg.test(this.state.phone)) {
      phoneCheck = true;
    } else {
      alert('Phone number is invalid')
      phoneCheck = false;
    }

    // checks confirm password
    if (this.state.password !== this.state.repassword) {
      alert('Passwords do not match!');
    } else {
      if (unameCheck && phoneCheck) {
        fire.auth().createUserWithEmailAndPassword(this.state.email.toString().toLowerCase(), this.state.password).then((u) => {
          const accountsRef = fire.database().ref('accounts');
          const account = {
            fname: this.state.firstName,
            lname: this.state.lastName,
            uname: this.state.username,
            phone: this.state.phone,
            email: this.state.email.toString().toLowerCase(),
            isDriver: 'no',
            isAdmin: 'no',
            isBanned: 'no',
            wallet: 0,
            rating: 0,
            ratedBy: 0
          }

          accountsRef.push(account);

          this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            repassword: '',
            isDriver: '',
            isAdmin: '',
            isBanned: '',
            wallet: '',
            rating: '',
            ratedBy: ''
          };

          // writing
          fire.database().ref('admin/counter')
            .on('value', snapshot => {
              countArr[0] = emailArr.length + 1;
              console.log('rewrite: ', countArr[0]);
              snapshot.ref.update({
                acct: countArr[0]
              });
            });
          })
        .catch((error) => {
          alert(error.message);
        })
      }
    }
  }

  render (){  
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.formwrap}>
          <Image style={pageStyle.logo} source={logo} />
          <Text style={pageStyle.title}>Registration Form</Text>

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
  }
}
