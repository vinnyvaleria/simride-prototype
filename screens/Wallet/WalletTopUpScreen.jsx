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
import { SubmitTopUp } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

import StripeCheckout from 'react-stripe-checkout'

const checkoutUrl = "https://us-central1-carpool-world-5uck5.cloudfunctions.net/charge";

export default class WalletTopUpScreen extends React.Component {
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
      token: '',
      amount: ''
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

    gotoWalletPage = () => {
        const transaction = firebase.database().ref('transaction');
        const transactionForm = {
            user: this.state.username,
            email: this.state.email,
            token: this.state.token,
            amount: this.state.amount,
            date: Date.now() * -1,
            action: 'top-up'
        }

        transaction.push(transactionForm);
        const balance = parseFloat(this.state.wallet) + parseFloat(this.state.amount);
        this.state.wallet = balance;

        const accountsRef = firebase.database().ref('accounts/' + this.state.id);
        accountsRef.orderByChild('email')
            .equalTo(this.state.email)
            .once('value')
            .then((snapshot) => {
                snapshot.ref.update({
                    wallet: balance
                })
            });

        alert('Wallet topped-up!')
        this.props.navigation.navigate('Wallet');
    }

    handleToken = (token) => {
        this.setState({ token: token.id });
        fetch(checkoutUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token,
                charge: {
                    amount: parseInt(10 * 100),
                    currency: 'SGD'
                }
            }),
        })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(result => {
                if (result.statusCode === 200) {
                    this.gotoWalletPage()
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    // sets amount in text box to two decimal places on blur and sets to this.state.amount
    setTwoNumberDecimal = (e) => {
        e.target.value = parseFloat(e.target.value).toFixed(2);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
          {/* <SubmitTopUp
            value={this.state.amount}
            onChange={(amount) => this.setState({ amount })}
           /> */}
           <input type='number' step='0.01' min='0.01' value={this.state.amount} onBlur={this.setTwoNumberDecimal} onChange={this.handleChange} name='amount' style={{ width: '9em' }} /><br /><br />
           <StripeCheckout
            stripeKey='pk_test_K5hyuKJAvnl8PNzfuwes3vn400X0HYzEvv'
            token={this.handleToken}
            amount={parseInt(10 * 100)}
            name="E-Wallet Top-Up"
            currency="SGD"
            email={this.state.email}
            />
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

