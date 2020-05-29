import firebase from '../../../base';
import {user} from "./checkEmailWallet";

export const submitCashOut = (cashamount) => {
    const notificationRef = firebase.database().ref('notification');
    const balance = parseFloat(user[8] - cashamount).toFixed(2);
    const notification = {
        uname: 'admin',
        date: Date.now(),
        notification: 'Cash-out',
        reason: user[2] + ' has requested to cash-out $' + cashamount
    }

    const requestCheckOutRef = firebase.database().ref('cashcheckout');
    const requestForm = {
        requester: user[2],
        requesterID: user[9],
        date: Date.now(),
        amount: cashamount,
        disbursed: 'no'
    }

    const accountsRef = firebase.database().ref('accounts/' + user[9]);
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
    
    user[8] = balance;
    document.getElementById('cashOutInput').value = null;

    document.getElementById('div_WalletHome').style.display = "block";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "none";
    document.getElementById('div_CashOut').style.display = "none";
}