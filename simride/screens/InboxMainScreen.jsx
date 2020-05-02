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
import profilepicture from '../assets/images/picture.jpg';

export default class MainScreen extends React.Component {
  constructor (props) {
    super(props);

    this.firstName = 'Vinny';
    this.balance = 10.00;
  }

  render () {
    return (
      <View style={styles.formwrap}>
        <Text style={styles.title}>Inbox</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formwrap: {
    alignSelf: 'center',
    paddingTop: 150,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  opening: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
    color: COLORS.YELLOW,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  balance: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    color: COLORS.GREY,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
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
    justifyContent: 'space-between',
  },
});

