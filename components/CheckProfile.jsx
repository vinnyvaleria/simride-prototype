import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
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
        <Image style={styles.logo} source={this.props.source} />
        <Text style={styles.label}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    padding: 10,
    backgroundColor: COLORS.GREEN_SEC,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center',
  },

  logo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },

  label: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});