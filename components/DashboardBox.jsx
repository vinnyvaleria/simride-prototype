import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default class DashboardBox extends React.Component {
  render() {
    return (
      <View style={styles.wrapperstyle}>
        <ImageBackground source={this.props.source} style={styles.logo} />
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    padding: 15,
    margin: 15,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    height: 150,
    width: 150,
    justifyContent: 'center',
  },

  logo: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginBottom: 10,
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 16,
    textAlign: 'center',
  },
});