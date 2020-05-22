import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import * as firebase from 'firebase';

// styling
import { pageStyle, screenStyle } from './styles';
import logo from '../../assets/images/logo.png';

// components
import { SubmitButton } from '../../components';
import { user } from './StartScreen';

var unameArr = [];

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

  signup = (e) => {
    e.preventDefault();

    // checks for duplicate username
    var i = 0;
    var unameCheck = false;
    while (i < unameArr.length) {
      if (this.state.username === unameArr[i]) {
        alert('Username has already been taken!');
        unameCheck = false;
        break;
      } else {
        unameCheck = true;
      }
      i++;
    };

    // checks confirm password
    if (this.state.password !== this.state.repassword) {
      alert('Passwords do not match!');
    } else {
      console.log(unameCheck);
      if (unameCheck) {
        firebase.auth().createUserWithEmailAndPassword(this.state.email.toString().toLowerCase(), this.state.password).then((u) => {}).then((u) => {
          const accountsRef = db.ref('accounts');
          const account = {
            fname: this.state.firstName,
            lname: this.state.lastName,
            uname: this.state.username,
            phone: this.state.phone,
            email: this.state.email.toString().toLowerCase(),
            isDriver: 'no',
            isAdmin: 'no',
            isBanned: 'no',
            wallet: 0.00,
            rating: 0,
            ratedBy: 0
          }
          user = [];
          // after signup, stores user data into user
          user[0] = account.fname;
          user[1] = account.lname;
          user[2] = account.uname;
          user[3] = account.email;
          user[4] = account.phone;
          user[5] = account.isDriver;
          user[6] = account.isAdmin;
          user[7] = account.isBanned;
          user[8] = account.wallet;
          user[9] = account.key;
          user[10] = account.rating;
          user[11] = account.ratedBy;

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
          db.ref('admin/counter')
            .on('value', snapshot => {
              countArr[0] = emailArr.length+1;
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
