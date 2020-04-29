import firebase from '../../../base';
import 'firebase/firestore';

checkEmailDashboard((e) => {
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
                    if (user[6] === "yes") { // admin
                        document.getElementById("adminDB").style.display = "block";
                        this.viewApplication();
                        this.viewReportedUsers();
                        this.Notifications('tb_AdminNotifications');
                    } else if (user[6] === "no" && user[5] === "yes") { // driver
                        this.walletBalanceCheck();
                        document.getElementById("driverDB").style.display = "block";
                        this.viewCreatedBooking();
                        this.viewMyBookings('tb_DriverUpcomingRides');
                        this.Notifications('tb_DriverNotifications');
                    } else if (user[6] === "no" && user[5] === "no") { // normal users
                        this.walletBalanceCheck();
                        document.getElementById("riderDB").style.display = "block";
                        this.viewMyBookings('tb_RiderUpcomingRides');
                        this.Notifications('tb_RiderNotifications');
                    }
                }
            }
        });
})

module.exports.checkEmailDashboard = checkEmailDashboard;