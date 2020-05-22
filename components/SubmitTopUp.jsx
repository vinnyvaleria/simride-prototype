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

import StripeCheckout from 'react-stripe-checkout'

import { COLORS } from '../constants/colors';

export default class SubmitTopUp extends React.Component {
  render() {
    return (
      <Container>
        <TextInput 
          style={styles.textinput} 
          name='send'
          placeholder='Enter amount' 
          value={this.props.value} 
          onChangeText={this.props.onChangeText}
        />

        <StripeCheckout
          stripeKey='pk_test_K5hyuKJAvnl8PNzfuwes3vn400X0HYzEvv'
          token={this.props.token}
          amount={this.props.amount}
          name="E-Wallet Top-Up"
          currency="SGD"
          email={this.props.email}
        />
      </Container>
    );  
  }
}

const styles=StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.GREEN_SEC,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: '100%',
    maxHeight: 70,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
  },

  buttonstyle: {
    backgroundColor: COLORS.PALE_WHITE,
    height: 40,
    borderRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  
  textinput: {
    padding: 10,
    fontFamily: 'notoSans',
    width: 300,
    backgroundColor: COLORS.WHITE,
    height: 40,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});