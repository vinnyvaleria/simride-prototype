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

var transactions = [];

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
      displayTransactions: [],
      
    };
  }

  componentDidMount = () => {
    this.setState({ displayTransactions: [] });
    transactions = [];
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.getTransactions();
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

  getTransactions = () => {
    let i = 0;
    const database = fire.database().ref('transaction').orderByChild('date');
    database.on('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data) => {
          if (data.val().email === this.state.email) {
            let amount = data.val().amount;
            let date = moment.unix((data.val().date * -1) / 1000).format("DD MMM YYYY hh:mm a");
            let action = data.val().action;
            this.displayTransactions(action, amount, date);
            i++;
          }
        });
      }
    });
}

  displayTransactions = (label, amount, date, i) => {
    transactions.push(<TransactionBox label={label} amount={amount} date={date} />)
    //transactions.push(label, amount, user, i);
    this.setState({
      displayTransactions: transactions,
    });
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Text style={pageStyle.subtitle}>Your current balance:</Text>
            <Text style={pageStyle.title}>$ {this.state.wallet}</Text>
            
            <View style={pageStyle.equalspace}>
              <SubmitButton 
                title='Top Up' 
                onPress={() => {this.props.navigation.navigate('Top-Up')}} 
              />

              <SubmitButton 
                title='Withdraw' 
                onPress={() => {this.props.navigation.navigate('Withdraw')}} 
              />  
            </View>

            <Text style={pageStyle.header}>Past Transactions</Text>
            {this.state.displayTransactions}

          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

