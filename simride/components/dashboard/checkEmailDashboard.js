import firebase from '../../../base';
import 'firebase/firestore';
import {viewApplication} from './viewApplication';
import {viewReportedList} from './viewReportedList';
import {notifications} from './notifications';
import {walletBalanceCheck} from './walletBalanceCheck';
import {viewCreatedBooking} from './viewCreatedBooking';
import {viewMyBookings} from './viewMyBookings';

let user = new Array(12); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id, 10rating, 11ratedby
export const checkEmailDashboard = () => {
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
        .equalTo(firebase.auth().currentUser.email)
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
                    if (user[6] === "yes") { // admin
                        document.getElementById("adminDB").style.display = "block";
                        viewApplication();
                        viewReportedList();
                        notifications('tb_AdminNotifications');
                    } else if (user[6] === "no" && user[5] === "yes") { // driver
                        walletBalanceCheck();
                        viewCreatedBooking();
                        viewMyBookings('tb_DriverUpcomingRides');
                        notifications('tb_DriverNotifications');
                        if (document.getElementById("driverDB") !== null) {
                            document.getElementById("driverDB").style.display = "block";
                        }
                    } else if (user[6] === "no" && user[5] === "no") { // normal users
                        walletBalanceCheck();
                        viewMyBookings('tb_RiderUpcomingRides');
                        notifications('tb_RiderNotifications');
                        if (document.getElementById("riderDB") !== null) {
                            document.getElementById("riderDB").style.display = "block";
                        }
                    }
                }
            }
        });
    if (user[7] === "yes") {
        firebase.auth().signOut();
    }
}

export {user}