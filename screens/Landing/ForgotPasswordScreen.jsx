import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

// styling
import { pageStyle, screenStyle } from './styles';
import logo from '../../assets/images/logo.png';

// components
import SubmitButton from '../../components/individuals/SubmitButton';

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

  render () {
    return (
      <View style={{display: 'none'}}>
        <Image style={pageStyle.logo} source={logo} />
        <Text style={pageStyle.title}>Reset Your Password</Text>

        <Text style={pageStyle.header}>E-mail</Text>
        <TextInput 
          style={pageStyle.textinput} 
          name='e-mail'
          placeholder='Your e-mail' 
          value={this.state.email}
        />
      
      </View>
    )
  }
}

