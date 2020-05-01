import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../base';

let bindUser = new Array(10); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id

// bind user data
export const bindUserData = (email) => {
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                bindUser[0] = child.val().fname;
                bindUser[1] = child.val().lname;
                bindUser[2] = child.val().uname;
                bindUser[3] = child.val().email;
                bindUser[4] = child.val().phone;
                bindUser[5] = child.val().isDriver;
                bindUser[6] = child.val().isAdmin;
                bindUser[7] = child.val().isBanned;
                bindUser[8] = child.val().wallet;
                bindUser[9] = child.key;
            });
        })
}

export {bindUser}