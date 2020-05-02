import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import { COLORS } from '../constants/colors';
import logo from '../assets/images/logo.png';
import scheduleride from '../assets/images/schedule-a-ride.png';
import viewaccount from '../assets/images/view-account.png';
import viewbookings from '../assets/images/view-bookings.png';
import viewmessages from '../assets/images/view-messages.png';

import DashboardBox from '../components/individuals/DashboardBox';

export default class MainScreen extends React.Component {
  render () {
    return (
      <View style={styles.formwrap}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>This is main MainScreen</Text>

        <View style={styles.equalspace}>
          <DashboardBox source={scheduleride} label='Schedule a Ride' />
          <DashboardBox source={viewmessages} label='View Messages' />
        </View>

        <View style={styles.equalspace}>
          <DashboardBox source={viewbookings} label='Manage Bookings' />
          <DashboardBox source={viewaccount} label='Account Settings' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formwrap: {
    alignSelf: 'center',
    maxWidth: 500,
  },

  logo: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 30,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  header: {
    fontSize: 18,
    color: COLORS.WHITE,
    marginBottom: 2,
  },

  textinput: {
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: COLORS.WHITE,
    marginBottom:15,
  },

  equalspace: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

