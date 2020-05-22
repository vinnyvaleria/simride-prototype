import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// styling
import { pageStyle } from './styles';
import scheduleride from '../../assets/images/schedule-a-ride.png';
import viewaccount from '../../assets/images/view-account.png';
import viewbookings from '../../assets/images/view-bookings.png';
import viewmessages from '../../assets/images/view-messages.png';
import viewWallet from '../../assets/images/wallets.png';
import profilepicture from '../../assets/images/picture.jpg';

// components
import { DashboardBox, NotifBox } from '../../components';
import { user } from '../Landing/StartScreen';

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
      balance: '',
      binded: false,
    };
  }

  componentDidMount = () => {
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
      .on('value', (snapshot) => {
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
          <View style={pageStyle.formwrap}>
            <View style={pageStyle.equalspace}>
              <View>
                <Text style={pageStyle.opening}>Welcome back, {user[0]}</Text>
                <Text style={pageStyle.balance}>Current Balance: $ {user[8]}</Text>
              </View>
              
              <Image style={pageStyle.image} source={profilepicture} />
            </View>
            
            <Text style={pageStyle.subtitle}>How can I help you today?</Text>

            <View style={pageStyle.equalspace}>
              <DashboardBox 
                source={scheduleride} 
                label='Schedule a Ride'
                onPress={() => this.props.navigation.navigate('Schedule a Ride')} 
                />

              <DashboardBox 
                source={viewmessages} 
                label='Send Messages' 
                onPress={() => this.props.navigation.navigate('Inbox Menu')}
                />
            </View>

            <View style={pageStyle.equalspace}>
              <DashboardBox 
                source={viewbookings} 
                label='Bookings' 
                onPress={() => this.props.navigation.navigate('Bookings')}
                />

              <DashboardBox 
                source={viewWallet} 
                label='View Wallet' 
                onPress={() => this.props.navigation.navigate('Wallet Menu')}
                />
            </View>

            <View style={pageStyle.equalspace}>
              <NotifBox 
                source={viewWallet} 
                label='Notification Bar'
                />
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

