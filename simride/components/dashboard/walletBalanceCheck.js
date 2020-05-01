import firebase from '../../../base';
import 'firebase/firestore';
import {user} from './checkEmailDashboard';

export const walletBalanceCheck = () => {
    if (user[8] < 5.00) {
        const notificationRef = firebase.database().ref('notification');
        const notification = {
            uname: user[2],
            date: Date.now(),
            notification: 'E-Wallet balance is below $5.00. Current balance: $' + user[8] + '.',
            reason: 'Please top-up your wallet to continue using your e-wallet.'
        }

        notificationRef.push(notification);
    }
}