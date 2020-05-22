import React from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import * as moment from 'moment';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton, TransactionBox } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class WalletMainScreen extends React.Component {
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

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

  // handles image change
  handleImgChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
        image
      }));
    }
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
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;
        });
      })
      .then(() => {
        if (typeof user[3] === 'undefined') {
          fire.auth().signOut();
        } else {
          if (user[6] !== "") {
            // loads transactions
            fire
              .database()
              .ref('bookings')
              .get()
          }
        }
      })
    this.setState({ binded: true });
  }

  getLastFiveBookings = () => {
    let userDetails = [];

    // get all accounts
    fire.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        let i = 0;
        snapshot.forEach((child) => {
          userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
          i++;
        })
      });

    const database = fire.database().ref('bookings').orderByChild('date').limitToFirst(5).endAt(Date.now());
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let content = '';
        snapshot.forEach((data) => {
          if ((data.val().currPassengers.includes(user[2]) || data.val().driverID === user[9]) && data.val().completed === 'yes') {
            let area = data.val().area;
            let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");

            let id = data.val().driverID;
            let driver = '';

            for (let i = 0; i < userDetails.length; i++) {
              let key = [];
              key = userDetails[i].split(':');
              if (key[0] === id) {
                driver = key[1];
              }
            }
            console.log(data.key + ';' + area + ';' + date + ';' + driver)
            /*content += '<tr id=\'' + data.key + '\'>';
            content += '<td>' + area + '</td>'; //column1
            content += '<td>' + date + '</td>'; //column2
            content += '<td>' + driver + '</td>';
            content += '</tr>';*/
          }
        });
      }
    });
}


  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Text style={pageStyle.subtitle}>Your current balance:</Text>
            <Text style={pageStyle.title}>$ {user[8]}</Text>
            
            <View style={pageStyle.equalspace}>
              <SubmitButton 
                title='Top Up' 
                onPress={() => {{this.props.navigation.navigate('Schedule a Ride')}}} 
              />

              <SubmitButton 
                title='Withdraw' 
                onPress={() => {{this.props.navigation.navigate('Schedule a Ride')}}} 
              />  
            </View>

            <Text style={pageStyle.header}>Past Transactions</Text>
            <TransactionBox />
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

