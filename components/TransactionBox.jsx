import React from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Image,
  Alert } 
from 'react-native';

import { COLORS } from '../constants/colors';
import car from '../assets/images/car.png';
 
export default class TransactionBox extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
        <Image source={car} style={styles.logo} />
        <View>
          <Text style={styles.label}>{this.props.label}</Text>
          <Text style={styles.amount}>$ {this.props.amount}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
        </View>
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

  logo: {
    height: 50,
    width: 50,
    alignItems: 'flex-start',
  },

  label: {
    color: COLORS.GREEN_SEC,
    fontSize: 16,
    fontFamily: 'notoSansBold',
    textAlign: 'right',
  },

  date: {
    color: COLORS.GREEN_SEC,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'right',
  },

  amount: {
    color: COLORS.GREEN_SEC,
    fontSize: 20,
    fontFamily: 'notoSans',
    textAlign: 'right',
  },
});
 