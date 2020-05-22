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
          
          <Button
            light
            block
            style={styles.buttonstyle}
            onPress={this.props.onPress}
          >
            <Text style={{
              color: COLORS.GREEN_SEC,
              fontFamily: 'notoSans',
              textTransform: 'capitalize',
            }}>Acknowledged</Text>
          </Button>
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

  buttonstyle: {
    backgroundColor: COLORS.PALE_WHITE,
    height: 40,
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  content: {
    color: COLORS.GREEN_PRI,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'center',
  },
});