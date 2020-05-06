import firebase from '../../../base';
import 'firebase/firestore';
import {user} from './checkEmailDashboard';

export const validateAccount = () => {
    document.getElementById("signinemail").focus();

    // counts current total account registered
    firebase.database()
        .ref('admin')
        .orderByChild('acct')
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                countArr[0] = child.val().acct;
            })
        });

    // loads accounts
    firebase.database().ref('accounts')
        .orderByChild('email')
        .once('value')
        .then((snapshot) => {
            var i = 0;
            snapshot.forEach((child) => {
                unameArr[i] = child.val().uname;
                emailArr[i] = child.val().email;
                i++;
            })
        });

    if (user[6] === "no") {
        document.getElementById('checkOutTab').style.display = 'none';
    }
}