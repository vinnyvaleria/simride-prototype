import 'firebase/firestore';
import "firebase/storage";
import firebase from '../base';

// bind user data
bindUserData(() => {
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
        .equalTo(user[3])
        .once('value')
        .then((snapshot) => {
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
            });
        })
})
module.exports.bindUserData = bindUserData;