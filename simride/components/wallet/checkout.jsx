import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import firebase from '../../../base';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

import {walletHomePage} from './walletHomePage';
import { user } from './checkEmailWallet';

const CURRENCY = 'SGD';

const fromDollarToCent = amount => parseInt(amount * 100);

const success = false;

const successPayment = data => {
  alert('Payment Successful');
  success = true;
};

const errorPayment = data => {
  alert('Payment Error');
  success = false;
};

const gotoWalletPage = (token, amount) => {
  if (success) {
    const transaction = firebase.database().ref('transaction');
    const transactionForm = {
        user: user[2],
        email: user[3],
        token: token.id,
        amount: amount,
        date: Date.now()
    }

    transaction.push(transactionForm);
    const balance = parseFloat(user[8]) + parseFloat(amount);
    user[8] = balance;

    const accountsRef = firebase.database().ref('accounts/' + user[9]);
    accountsRef.orderByChild('email')
      .equalTo(user[3])
      .once('value')
      .then((snapshot) => {
        snapshot.ref.update({
          wallet: balance
        })
      });
    
    walletHomePage();
  }
}

const onToken = (amount, description, email) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)
    .finally(gotoWalletPage(token, amount, email));

const Checkout = ({ name, description, amount, email }) =>
  <StripeCheckout
     name={name}
     description={description}
     amount={fromDollarToCent(amount)}
     token={onToken(amount, description)}
     currency={CURRENCY}
     stripeKey={STRIPE_PUBLISHABLE}
     email={email}
     allowRememberMe
  />

export default Checkout;