import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { validate } from 'email-validator';
import firebase from 'firebase';

// styling
import { pageStyle, screenStyle } from './styles';
import logo from '../../assets/images/logo.png';
import { COLORS } from '../../constants/colors';

// components
import { SubmitButton } from '../../components';

// variables 
let user = new Array(10);
var countArr = new Array(1); //account
var unameArr = [];
var emailArr = [];

class StartScreen extends React.Component {
  constructor(props) {
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
      rating: '',
      ratedBy: '',
    };
  }

  componentDidMount = () => {
    // counts current total account registered
    firebase.database()
      .ref('admin')
      .orderByChild('acct')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          countArr[0] = child.val().acct;
        })
      });

    // loads accounts
    firebase.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        var i = 0;
        snapshot.forEach((child) => {
          unameArr[i] = child.val().uname;
          emailArr[i] = child.val().email;
          i++;
        })
      });
  }

  checkEmail =  () => {
      user = [];
      user[3] = this.state.email;
      user[3] = user[3].toString().toLowerCase();

      const accountsRef = firebase.database().ref('accounts');
      accountsRef.orderByChild('email')
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
          });
        })
  }

  // login
  login = () => {
    if (typeof user[9] !== 'undefined') {
      var i = 0;
      var email = this.state.email.toString().toLowerCase();

      if (!validate(email)) {
        alert('Invalid e-mail!');
      } else {
        while (i < emailArr.length) {
          console.log(emailArr[i], email, i);
          if (emailArr[i].toString() === email) {
            if (user[7].toString() === 'yes') {
              alert('Account is banned. Please contact administrator.')
            } else {
              firebase.auth().signInWithEmailAndPassword(email, this.state.password)
                .then((u) => {
                  {() => this.props.navigation.navigate('Home')};
                }).catch((error) => {
                  alert('Invalid password!');
              })
              break;
            }
          } else if (i === emailArr.length - 1) {
            alert('E-mail not found!');
            i++;
          } else {
            i++;
          }
        }
      }
    }
  }

  render() {
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.formwrap}>
          <Image style={pageStyle.logo} source={logo} />
          <Text style={pageStyle.title}>Welcome to SIMRide</Text>

          <Text style={pageStyle.header}>E-mail</Text>
          <TextInput 
            style={pageStyle.textinput} 
            placeholder='Your e-mail'
            value={this.state.email} 
            onBlur={this.checkEmail}
            onChangeText={(email) => this.setState({ email })}
          />

          <Text style={pageStyle.header}>Password</Text>
          <TextInput 
            style={pageStyle.textinput} 
            placeholder='Your password' 
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry      
          />

          <Text
            style={{color: COLORS.GREY, marginBottom: 15, fontSize: 12}}
            onPress={() => this.props.navigation.navigate('Forgot Password')}
          >Forgot Password?</Text>

          <View style={pageStyle.equalspace}>
            <SubmitButton 
              title='Login'
              onPress={() => this.login()} 
            />

            <SubmitButton title='Register' onPress={() => {{this.props.navigation.navigate('Register')}}} />
          </View>        
        </View>
      </ScrollView>
    );
  };
}

export default StartScreen;
export { user }