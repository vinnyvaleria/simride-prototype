import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import { Button } from 'native-base'

import { COLORS } from '../constants/colors';

export default class NotifBox extends React.Component {
  render() {
    return (
      <View style={styles.wrapperstyle}>
        <Text style={styles.title}>Notifications</Text>
        <ScrollView>
          <View style={styles.equalspace}>
            <View>
              <Text style={styles.label}>{this.props.id} - {this.props.label}</Text>
              <Text style={styles.content}>{this.props.content}</Text>
            </View>
            
            <Button
              style={styles.buttonstyle}
              onPress={this.props.onPress}
            >
              <Text style={styles.buttontext}>Acknowledge</Text>
            </Button>
          </View>
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

  title: {
    color: COLORS.GREEN_SEC,
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    textAlign: 'center',
    marginBottom: 5,
    marginBottom: 20,
    textDecorationLine: 'underline'
  },

  buttonstyle: {
    backgroundColor: COLORS.GREEN_PRI,
    width: 100,
    borderRadius: 10,
    textTransform: 'capitalize',
    alignSelf: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center'
  },

  buttontext: {
    color: COLORS.WHITE, 
    fontFamily: 'notoSansMedium',
    fontSize: 10,
    paddingVertical: 2,
    textTransform: 'uppercase',
  },

  label: {
    color: COLORS.GREEN_PRI,
    fontSize: 14,
    fontFamily: 'notoSansMedium',
    textAlign: 'left',
    textTransform: 'capitalize',
  },

  content: {
    color: COLORS.GREY,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'left',
  },

  equalspace: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});