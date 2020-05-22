import React from 'react';
import {
  StyleSheet,
  View,
  //Button,
} from 'react-native';
import { 
  Container, 
  Button, 
  Text 
} from 'native-base';

import { COLORS } from '../constants/colors';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <Container style={styles.buttonContainer}>
        <Button 
          rounded 
          light
          full
          style={styles.buttonstyle}
          onPress={this.props.onPress}
        >
          <Text style={{
            color: COLORS.GREEN_PRI, 
            fontFamily: 'notoSans',
            textTransform: 'uppercase',
          }}>{this.props.title}</Text>
        </Button>
      </Container>
    );  
  }
}

const styles=StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'nowrap',
    flex: 0,
    maxHeight: 100,
  },

  buttonstyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    alignSelf: 'center',
    minWidth: 160,
  },
});