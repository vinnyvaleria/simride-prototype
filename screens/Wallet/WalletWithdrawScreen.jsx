import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitCashout } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class WalletWithdrawScreen extends React.Component {
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
      binded: false,
      cashoutamount: 0.00
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

    maxAmtCalc = () => {
        if (this.state.wallet > 5.00) {
            return parseFloat(this.state.wallet - 5).toFixed(2);
        } else {
            return 0;
        }
    }

    submitCashOut = () => {
        if (this.state.cashoutamount <= this.maxAmtCalc()) {
            const notificationRef = fire.database().ref('notification');
            const balance = parseFloat(this.state.wallet - this.state.cashoutamount).toFixed(2);
            console.log(balance);
            const notification = {
                uname: 'admin',
                date: Date.now(),
                notification: 'Cash-out',
                reason: this.state.username + ' has requested to cash-out $' + this.state.cashoutamount
            }

            const requestCheckOutRef = fire.database().ref('cashcheckout');
            const requestForm = {
                requester: this.state.username,
                requesterID: this.state.id,
                date: Date.now(),
                amount: parseFloat(this.state.cashoutamount).toFixed(2),
                disbursed: 'no'
            }

            const accountsRef = fire.database().ref('accounts/' + this.state.id);
            accountsRef.orderByChild('email')
                .equalTo(user[3])
                .once('value')
                .then((snapshot) => {
                    snapshot.ref.update({
                        wallet: balance
                    })
                });

            notificationRef.push(notification);
            requestCheckOutRef.push(requestForm);

            this.setState({ wallet: balance });
            alert('Cash-out submitted!')

            this.props.navigation.navigate('Wallet');
        }
        else {
            alert('Please withdraw an amount less than $' + this.maxAmtCalc());
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

  // logout
  logout = () => {
    user[0] = '';
    user[1] = '';
    user[2] = '';
    user[3] = '';
    user[4] = '';
    user[5] = '';
    user[6] = '';
    user[7] = '';
    user[8] = '';
    user[9] = '';
    user[10] = '';
    user[11] = '';

    fire.auth().signOut();
  }

    // // sets amount in text box to two decimal places on blur and sets to this.state.amount
    // setTwoNumberDecimal(e) {
    //     e.target.value = parseFloat(e.target.value).toFixed(2);
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <SubmitCashout 
                value={this.state.cashoutamount}
                onChange={(cashoutamount) => this.setState({ cashoutamount })}
                onPress={this.submitCashOut}
            />
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

