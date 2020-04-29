import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import viewAllBookings from './viewAllBookings'

// checks email and signs user out if no such email found
checkEmail((e) => {
    const email = firebase.auth().currentUser.email;
    user[3] = email;

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
        }).then(() => {
            if (typeof user[3] === 'undefined') {
                firebase.auth().signOut();
            } else {
                if (user[6] !== "") {
                    if (user[6] === "no" && user[5] === "no") { //not admin, not driver
                        document.getElementById('btnCreateBooking').style.display = "none";
                        document.getElementById('btnViewCreatedBooking').style.display = "none";
                    }

                    if (user[6] === "yes") { //isAdmin
                        document.getElementById('btnViewMyBookings').style.display = "none";
                        document.getElementById('btnCreateBooking').style.display = "none";
                        document.getElementById('btnViewCreatedBooking').style.display = "none";
                    }

                    viewAllBookings();
                }
            }
        });
})

module.exports.checkEmail = checkEmail;