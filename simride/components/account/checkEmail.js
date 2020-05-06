import firebase from '../../../base';
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';
import { bindUser as user } from '../../functions/bindUserData';

// checks email and signs user out if no such email found
export const checkEmail = () => {
    const email = firebase.auth().currentUser.email;
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                user[0] = child.val().fname;
                user[1] = child.val().lname;
                user[2] = child.val().uname;
                user[3] = child.val().email;
                user[4] = child.val().phone;
                user[5] = child.val().isDriver;
                user[6] = child.val().isAdmin;
                user[7] = child.val().isBanned;
                user[8] = child.val().wallet;
                user[9] = child.key;
            });
        }).then(() => {
            if (typeof email === 'undefined') {
                firebase.auth().signOut();
            } else {
                if (user[6] === "yes") {
                    document.getElementById('btnApplyDriver').style.display = "none";
                } else {
                    if (user[5] === "no") {
                        checkDriverApplicationStatus();
                    }
                }
            }
        });

    if (user[7] === "yes") {
        firebase.auth().signOut();
    }
}

export {user};