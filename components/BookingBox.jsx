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
 
export default class BookingBox extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.wrapperstyle}
        onPress={this.props.onPress}
      >
        <Image source={this.props.icon} style={styles.icon} />
        <View>
          <Text style={styles.label}>{this.props.label}</Text>
          <Text style={styles.area}>{this.props.area}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
          <Text style={styles.date}>Passengers : {this.props.passenger}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  wrapperstyle: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    minHeight: 80,
    minWidth: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
  },

  icon: {
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
    color: COLORS.GREY,
    fontSize: 14,
    fontFamily: 'notoSans',
    textAlign: 'right',
  },

  area: {
    color: COLORS.GREEN_PRI,
    fontSize: 20,
    fontFamily: 'notoSans',
    textAlign: 'right',
  },
});
 