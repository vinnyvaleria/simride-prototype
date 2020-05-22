import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Button,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default class CHeckProfile extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
        <Text style={styles.label}>{this.props.label}</Text>
        <ImageBackground style={styles.logo} source={this.props.source} />
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    padding: 15,
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});