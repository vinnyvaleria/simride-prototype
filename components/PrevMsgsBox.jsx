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

export default class PrevMsgsBox extends React.Component {
  render() {
    return (
      <View style={styles.wrapperstyle}>
        <ScrollView>
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
            }}>{this.props.user}</Text>
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
    backgroundColor: COLORS.GREEN_PRI,
    width: 100,
    borderRadius: 10,
    textTransform: 'capitalize',
    alignSelf: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center'
  },

  content: {
    color: COLORS.GREEN_PRI,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'center',
  },
});