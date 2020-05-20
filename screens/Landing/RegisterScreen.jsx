import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';


import logo from '../../assets/images/logo.png';

// components
import SubmitButton from '../../components/individuals/SubmitButton';

// styling
import { pageStyle, screenStyle } from './styles';


export default class RegisterScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  pressHandler = () => {
    this.props.navigation.pop();
  }

  render (){  
    return (
      <View style={pageStyle.formwrap, screenStyle}>
        <Image style={pageStyle.logo} source={logo} />
        <Text style={pageStyle.title}>Registration Form</Text>

        <Text style={pageStyle.header}>First Name</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your first name' />

        <Text style={pageStyle.header}>Last Name</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your last name' />

        <Text style={pageStyle.header}>E-mail</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your e-mail' />

        <Text style={pageStyle.header}>Phone Number</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your phone number' />

        <Text style={pageStyle.header}>Username</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your preferred username' />

        <Text style={pageStyle.header}>Password</Text>
        <TextInput style={pageStyle.textinput} placeholder='Your password' />

        <Text style={pageStyle.header}>Re-enter Password</Text>
        <TextInput style={pageStyle.textinput} placeholder='Please re-enter your password' />
      
        <View style={pageStyle.equalspace}>
          <SubmitButton title='Submit' />
          <SubmitButton title='Cancel' onPress={this.pressHandler()} />
        </View>
      </View>
    );
  }
}
