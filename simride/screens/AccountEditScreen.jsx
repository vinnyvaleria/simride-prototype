import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from '../constants/colors';
import logo from '../assets/images/logo.png';

import profilepicture from '../assets/images/picture.jpg';
import SubmitButton from '../components/individuals/SubmitButton';

export default class AccountEditScreen extends React.Component {
  constructor (props) {
    super(props);

    this.firstName = 'Vinny';
    this.lastName = 'Zhong';
    this.email = 'abc@yahoo.com';
    this.phoneNumber = 97328177;
    this.driverstatus = 'no';
  }

  render () {
    return (
      <View style={styles.formwrap}>
        <Image style={styles.image} source={profilepicture} />

        <Text style={styles.header}>First Name</Text>
        <TextInput style={styles.textinput} placeholder={this.firstName} />

        <Text style={styles.header}>Last Name</Text>
        <TextInput style={styles.textinput} placeholder={this.lastName} />

        <Text style={styles.header}>Phone Number</Text>
        <TextInput style={styles.textinput} placeholder={this.phoneNumber.toString()} />

        <View style={styles.equalspace}>
          <SubmitButton title='Update Profile' />
          <SubmitButton title='Change Password' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formwrap: {
    alignSelf: 'center',
  },

  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: COLORS.WHITE,
    textAlign: 'left',
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
    marginTop: 50,
  },
});

