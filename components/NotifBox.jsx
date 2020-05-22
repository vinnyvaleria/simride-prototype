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

export default class NotifBox extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
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
    justifyContent: 'center',
    minWidth: 350,
    alignSelf: 'stretch',
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
  },
});