import firebase from '../../../base';
import {walletHomePage} from './walletHomePage';

let user = new Array(12); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id, 10rating, 11ratedby
// checks email and signs user out if no such email found
export const checkEmailWallet = (e) => {
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
                user[10] = child.val().rating;
                user[11] = child.val().ratedBy;
            });
        }).then(() => {
            if (typeof user[3] === 'undefined') {
                firebase.auth().signOut();
            } else {
                if (user[6] !== "") {
                    walletHomePage();
                    if (user[6].toLowerCase() === 'yes') {
                        document.getElementById("btnTopUpPage").style.display = "none";
                        document.getElementById("tbl_last5").style.display = "none";
                    }
                }
            }
        });
    if (user[7] === "yes") {
        firebase.auth().signOut();
    }
}

export {user};