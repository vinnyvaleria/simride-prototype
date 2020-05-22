import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
  Button,
} from 'react-native';

import { COLORS } from '../constants/colors';

export default class NotifBox extends React.Component {
  render() {
    return (
      <View style={styles.wrapperstyle}>
        <Text style={styles.label}>{this.props.label}</Text>
        <ScrollView>
          <Text style={styles.content}>{this.props.content}</Text>
        </ScrollView>
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
    justifyContent: 'center',
    minWidth: 350,
    maxHeight: 200,
    alignSelf: 'stretch',
  },

  label: {
    color: COLORS.GREEN_SEC,
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
    marginBottom: 5,
  },

  content: {
    color: COLORS.GREEN_PRI,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'center',
  },
});