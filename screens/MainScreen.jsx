import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import fire from '../config';
import 'firebase/firestore';
import 'firebase/storage';

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
import { user } from './Landing/StartScreen';

export default class MainScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      isDriver: '',
      isAdmin: '',
      id: '',
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: '',
      binded: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

  // bind user data
  bindUserData = () => {
    const accountsRef = fire.database().ref('accounts');
    accountsRef
      .orderByChild('email')
      .equalTo(user[3])
      .on('value', snapshot => {
        snapshot.forEach((child) => {
          user[0] = child.val().fname;
          user[1] = child.val().lname;
          user[2] = child.val().uname;
          user[4] = child.val().phone;
          user[5] = child.val().isDriver;
          user[6] = child.val().isAdmin;
          user[7] = child.val().isBanned;
          user[8] = child.val().wallet;
          user[9] = child.key;
      });
    })
    this.setState({ binded: true });
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView>
          <View style={styles.formwrap}>
            <View style={styles.equalspace}>
              <View>
                <Text style={styles.opening}>Welcome back, {user[0]}</Text>
                <Text style={styles.balance}>Current Balance: ${user[8]}</Text>
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
    } else {
      return null && console.log('There is a problem with binging user data');
    }
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
    maxWidth: 280,
    textTransform: 'capitalize',
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

