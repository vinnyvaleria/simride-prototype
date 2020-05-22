import React from 'react';
import {
  View,
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
import StartScreen from './StartScreen';

// functions
import { COLORS } from '../../constants/colors';

export default class ForgotPasswordScreen extends React.Component {
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
      wallet: ''
    };
  }

  // reset password for user
  submitForgotPassword = (e) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      alert("Reset link has been sent to your email!")
    }).catch((error) => {
      alert("Uh-oh! Something went wrong")
    });
  }

  render () {
    return (
      <View style={pageStyle.formwrap}>
        <Image style={pageStyle.logo} source={logo} />
        <Text style={pageStyle.title}>Reset Your Password</Text>

        <Text style={pageStyle.header}>E-mail</Text>
        <TextInput 
          style={pageStyle.textinput} 
          placeholder='Your e-mail'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />

        <View style={pageStyle.equalspace}>
          <SubmitButton title='Submit' onPress={this.submitForgotPassword}/>
          <SubmitButton title='Cancel' onPress={() => {{this.props.navigation.navigate('Start')}}} />
        </View>
      
      </View>
    )
  }
}

