import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

import { COLORS } from '../constants/colors';
import logo from '../assets/images/logo.png';

import SubmitButton from '../components/individuals/SubmitButton';

export default class RegisterScreen extends React.Component {
  render () {
    return (
      <View style={styles.formwrap}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Registration Form</Text>

        <Text style={styles.header}>First Name</Text>
        <TextInput style={styles.textinput} placeholder='Your first name' />

        <Text style={styles.header}>Last Name</Text>
        <TextInput style={styles.textinput} placeholder='Your last name' />

        <Text style={styles.header}>E-mail</Text>
        <TextInput style={styles.textinput} placeholder='Your e-mail' />

        <Text style={styles.header}>Phone Number</Text>
        <TextInput style={styles.textinput} placeholder='Your phone number' />

        <Text style={styles.header}>Username</Text>
        <TextInput style={styles.textinput} placeholder='Your preferred username' />

        <Text style={styles.header}>Password</Text>
        <TextInput style={styles.textinput} placeholder='Your password' />

        <Text style={styles.header}>Re-enter Password</Text>
        <TextInput style={styles.textinput} placeholder='Please re-enter your password' />
      
        <View style={styles.equalspace}>
          <SubmitButton title='Submit'/>
          <SubmitButton title='Cancel' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formwrap: {
    alignSelf: 'center',
    maxWidth: 500,
  },

  logo: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  header: {
    fontSize: 18,
    color: COLORS.WHITE,
    marginBottom: 2,
  },

  textinput: {
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: COLORS.WHITE,
    marginBottom:15,
  },

  equalspace: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});