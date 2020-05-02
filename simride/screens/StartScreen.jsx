import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import { COLORS } from '../constants/colors';
import logo from '../assets/images/logo.png';

import SubmitButton from '../components/individuals/SubmitButton';

import RegisterScreen from './RegisterScreen';

export default class StartScreen extends React.Component {
  render () {
    return (
      <View style={styles.formwrap}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Welcome to SIMRide</Text>

        <Text style={styles.header}>E-mail</Text>
        <TextInput style={styles.textinput} placeholder='Your e-mail' />

        <Text style={styles.header}>Password</Text>
        <TextInput style={styles.textinput} placeholder='Your password' />

        <View style={styles.equalspace}>
          <SubmitButton title='Sign In' />
          <SubmitButton title='Sign Up' />
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

