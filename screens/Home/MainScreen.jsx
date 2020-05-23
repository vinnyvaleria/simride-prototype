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


var notifsComponent = [];

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
      wallet: '',
      id: '',
      rating: '',
      ratedBy: '',
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
      displayNotifs: []
    };
  }

  componentDidMount = () => {
    this.setState({ displayNotifs: [] });
    notifsComponent = [];
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.getNotifs();
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;

          this.setState({
            firstName: child.val().fname,
            lastName: child.val().lname,
            username: child.val().uname,
            email: child.val().email,
            phone: child.val().phone,
            isDriver: child.val().isDriver,
            isAdmin: child.val().isAdmin,
            wallet: child.val().wallet,
            id: child.key,
            rating: child.val().rating,
            ratedBy: child.val().ratedBy
          });
      });
    })
    this.setState({ binded: true });
  }

  getNotifs = () => {
    const database = fire.database().ref('notification').orderByChild('date');
    database.on('value', (snapshot) => {
      if (snapshot.exists()) {
        this.setState({ displayNotifs: [] });
        notifsComponent = [];
        snapshot.forEach((data) => {
          if (data.val().uname === user[2]) {
            this.displayNotifs(data.val().notification, data.val().reason, data.key);
          }
        });
      }
    });
  }

  ackNotifs = (id) => {
    const notifRef = fire.database().ref('notification/' + id);
    notifRef.remove();

    this.setState({ displayNotifs: [] });
    notifsComponent = [];
    this.getNotifs();
  }

  // display notifs
  displayNotifs = (label, content, id) => {
    notifsComponent.push(<NotifBox label={label} id={id} content={content} onPress={() => this.ackNotifs(id)} />)
    this.setState({
      displayNotifs: notifsComponent,
    })
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView>
          <View style={pageStyle.formwrap}>
            <View style={pageStyle.equalspace}>
              <View>
                <Text style={pageStyle.opening}>Welcome back, {this.state.username}</Text>
                <Text style={pageStyle.balance}>Current Balance: $ {this.state.wallet}</Text>
              </View>
              
              <Image style={pageStyle.image} source={profilepicture} />
            </View>

            <View style={pageStyle.equalspace}>
              {this.state.displayNotifs}
            </View>
            
            <View style={pageStyle.equalspace}>
              <DashboardBox 
                source={viewbookings} 
                label='Bookings' 
                onPress={() => this.props.navigation.navigate('Bookings')}
                />

              <DashboardBox 
                source={viewmessages} 
                label='Inbox' 
                onPress={() => this.props.navigation.navigate('Inbox Menu')}
                />
            </View>

            <View style={pageStyle.equalspace}>
              <DashboardBox 
                source={viewWallet} 
                label='Wallet' 
                onPress={() => this.props.navigation.navigate('Wallet Menu')}
                />

              <DashboardBox 
                source={viewaccount} 
                label='Settings'
                onPress={() => this.props.navigation.navigate('Account Settings')} 
                />
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

