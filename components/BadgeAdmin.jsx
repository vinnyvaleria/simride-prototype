import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { COLORS } from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class BadgeAdmin extends React.Component {
  render() {
    return (
      <View style={styles.wrapperstyle}>
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    backgroundColor: COLORS.RED,
    borderRadius: 50,
    height: 30,
    width: 80,
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 14,
    fontFamily: 'notoSansBold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});