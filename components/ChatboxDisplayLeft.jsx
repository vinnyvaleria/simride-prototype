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

export default class ChatboxDisplayLeft extends React.Component {
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
    padding: 15,
    margin: 15,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    minHeight: 10,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 16,
    textAlign: 'center',
  },
});