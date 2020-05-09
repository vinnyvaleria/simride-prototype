import firebase from '../../../base';
import {user} from '../booking/checkEmail'

export const userBoard = (username, payMethod) => {
    let userID = '';
    let currBalance = '';

    if (payMethod === "wallet") {
        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('uname')
            .equalTo(username)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    userID = child.key;
                    currBalance = child.val().wallet;
                });

                const newBalancePassenger = parseFloat(currBalance) - 5;
                const accountsRefUpdatePassenger = firebase.database().ref('accounts/' + userID);
                accountsRefUpdatePassenger.orderByChild('uname')
                    .equalTo(username)
                    .once('value')
                    .then((snapshot) => {
                        snapshot.ref.update({
                            wallet: newBalancePassenger.toFixed(2)
                        })
                    });

                const newBalanceDriver = parseFloat(user[8]) + 5;
                const accountsRefUpdateDriver = firebase.database().ref('accounts/' + user[9]);
                accountsRefUpdateDriver.orderByChild('email')
                    .equalTo(user[3])
                    .once('value')
                    .then((snapshot) => {
                        snapshot.ref.update({
                            wallet: newBalanceDriver.toFixed(2)
                        })
                    });

                user[8] = newBalanceDriver;
            })
    }
    document.getElementById('btnBoard').style.display = 'none';
    document.getElementById('btnNoShow').style.display = 'none';
    document.getElementById('btnHere').style.display = 'none';
}