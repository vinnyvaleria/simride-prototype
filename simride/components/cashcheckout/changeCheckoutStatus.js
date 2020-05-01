import firebase from '../../../base';
import 'firebase/firestore';
import { bindUser as user } from '../../functions/bindUserData';
import {loadCashout} from './loadCashout';
import {loadCashoutHistory} from './loadCashoutHistory';
import { bindUser as user } from '../../functions/bindUserData';

export const changeCheckoutStatus = (e) => {
    var checkoutID = e.target.parentElement.parentElement.id;

    const accountsRef = firebase.database().ref('cashcheckout/' + checkoutID);
    accountsRef.orderByChild('requesterID')
        .equalTo(user[3])
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                disbursed: 'yes'
            })
        });

    loadCashout();
    loadCashoutHistory();
}