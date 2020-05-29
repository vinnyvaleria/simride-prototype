import firebase from '../../../base';
import 'firebase/firestore';
import { bindUser as user } from '../../functions/bindUserData';
import {loadCashout} from './loadCashout';
import {loadCashoutHistory} from './loadCashoutHistory';

export const changeCheckoutStatus = (e) => {
    var checkoutID = e.target.parentElement.parentElement.parentElement.id;
    const email = firebase.auth().currentUser.email;

    const accountsRef = firebase.database().ref('cashcheckout/' + checkoutID);
    accountsRef.orderByChild('requesterID')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                disbursed: 'yes'
            })
        });

    loadCashout();
    loadCashoutHistory();
}