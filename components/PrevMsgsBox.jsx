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
    minHeight: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
  },

  label: {
    color: COLORS.GREEN_SEC,
    fontSize: 15,
    fontFamily: 'notoSansBold',
    textAlign: 'center',
    width: '99%',
    margin: 'auto',
  }
});