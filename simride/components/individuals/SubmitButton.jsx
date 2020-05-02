import React from 'react';
import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

import { COLORS } from '../../constants/colors';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <View style={styles.buttonstyle}>
        <Button 
          color={COLORS.GREEN_PRI}
          onclick={this.props.onPress}
          title={this.props.title}
        />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  buttonstyle: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    fontSize: 50,
    alignSelf: 'center',
  },
});