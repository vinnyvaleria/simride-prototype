import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { 
  Container, 
  Button, 
  Text 
} from 'native-base';

import { COLORS } from '../constants/colors';

export default class SearchButton extends React.Component {
  render() {
    return (
      <Container style={styles.wrapper}>
        <TextInput 
          style={styles.textinput} 
          name='search'
          placeholder='Enter username to search' 
          value={this.props.value}         
        />

        <Button 
          light
          block
          style={styles.buttonstyle}
          onPress={this.props.onPress}
        >
          <Text style={{
            color: COLORS.GREEN_PRI, 
            fontFamily: 'notoSans',
            textTransform: 'capitalize',
          }}>Search</Text>
        </Button>
      </Container>
    );  
  }
}

const styles=StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },

  buttonstyle: {
    backgroundColor: COLORS.PALE_WHITE,
    height: 40,
    borderRadius: 0,
  },
  
  textinput: {
    padding: 10,
    fontFamily: 'notoSans',
    width: 300,
    backgroundColor: COLORS.WHITE,
    height: 40,
  },
});