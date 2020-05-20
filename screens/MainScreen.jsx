import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

// styling
import { COLORS } from '../constants/colors';
import logo from '../assets/images/logo.png';
import scheduleride from '../assets/images/schedule-a-ride.png';
import viewaccount from '../assets/images/view-account.png';
import viewbookings from '../assets/images/view-bookings.png';
import viewmessages from '../assets/images/view-messages.png';
import viewWallet from '../assets/images/wallets.png';
import profilepicture from '../assets/images/picture.jpg';

// components
import DashboardBox from '../components/DashboardBox';

export default class MainScreen extends React.Component {
  constructor (props) {
    super(props);

    this.firstName = 'Vinny';
    this.balance = 10.00;
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.formwrap}>
          <View style={styles.equalspace}>
            <View>
              <Text style={styles.opening}>Welcome back, {'\n'}{this.firstName}</Text>
              <Text style={styles.balance}>Current Balance: {this.balance}</Text>
            </View>
            
            <Image style={styles.image} source={profilepicture} />
          </View>
          
          <Text style={styles.subtitle}>How can I help you today?</Text>

          <View style={styles.equalspace}>
            <DashboardBox source={scheduleride} label='Schedule a Ride' />
            <DashboardBox source={viewmessages} label='View Messages' />
          </View>

          <View style={styles.equalspace}>
            <DashboardBox source={viewbookings} label='Manage Bookings' />
            <DashboardBox source={viewaccount} label='Account Settings' />
          </View>

          <View style={styles.equalspace}>
            <DashboardBox source={viewWallet} label='Wallets' />
          </View>
        </View>
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  formwrap: {
    alignSelf: 'center',
    paddingTop: 80,
  },

  image: {
    height: 100,
    width: 100,
    alignSelf: 'flex-end',
    marginBottom: 40,
    borderRadius: 50,
  },

  opening: {
    fontSize: 30,
    fontFamily: 'notoSansBold',
    marginBottom: 10,
    color: COLORS.YELLOW,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  balance: {
    fontSize: 16,
    fontFamily: 'notoSansMedium',
    marginBottom: 20,
    color: COLORS.GREY,
  },

  subtitle: {
    fontSize: 20,
    fontFamily: 'notoSansMedium',
    marginBottom: 10,
    color: COLORS.WHITE,
    textAlign: 'center',
  },

  header: {
    fontSize: 18,
    fontFamily: 'notoSansMedium',
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
    justifyContent: 'space-around',
  },
});

