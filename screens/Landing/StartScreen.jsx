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
import { COLORS } from '../../constants/colors';

// components
import SubmitButton from '../../components/individuals/SubmitButton';
import DashboardNav from '../../navigation/DashboardNav';

// functions
import { Login, Registration, ForgotPassword } from '../../functions/Landing';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { TabActions } from '@react-navigation/native';

export default class StartScreen extends React.Component {
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

  pressHandler = () => {
    this.props.navigation.navigate('Register');
  }

  render () {
    return (
      <View style={screenStyle}>
        <Image style={pageStyle.logo} source={logo} />
        <Text style={pageStyle.title}>Welcome to SIMRide</Text>

        <Text style={pageStyle.header}>E-mail</Text>
        <TextInput 
          style={pageStyle.textinput} 
          name='e-mail'
          placeholder='Your e-mail' 
          value={this.state.email}
        />

        <Text style={pageStyle.header}>Password</Text>
        <TextInput 
          style={pageStyle.textinput} 
          name='password'
          placeholder='Your password' 
          secureTextEntry
          value={this.state.password}         
        />

        <SubmitButton 
          style={{color: COLORS.GREY, marginTop: -10, marginBottom: 15, fontSize: 12}}
          onPress={this.props.navigation.navigate(ForgotPasswordScreen)}
        >Forgot Password?</SubmitButton>

        <View style={pageStyle.equalspace}>
          <SubmitButton 
            title='Login' 
            type='submit'
            onBlur={Login(this.state.email, this.state.password)}
            onClick={DashboardNav} />
          <SubmitButton title='Register' onPress={this.pressHandler()} />
          {console.log('works')}
        </View>        
      </View>
    );
  }
}

