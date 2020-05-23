import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default class PrevMsgsBox extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
        <Text style={styles.label}>{this.props.user}</Text>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  label: {
    color: COLORS.GREEN_SEC,
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
    width: '99%',
    margin: 'auto',
  }
});