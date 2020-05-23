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

export default class DashboardBox extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
        <ImageBackground source={this.props.source} style={styles.logo} />
        <Text style={styles.label}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    padding: 15,
    margin: 15,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    height: 140,
    width: 140,
    justifyContent: 'center',
  },

  logo: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },

  label: {
    color: COLORS.GREEN_SEC,
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
  },
});