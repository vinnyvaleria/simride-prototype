import firebase from '../../../base';
import {user} from '../booking/checkEmail'

export const userBoard = (username, payMethod) => {
    let userID = '';
    let currBalance = '';
    let email = '';

    if (payMethod === "wallet") {
        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('uname')
            .equalTo(username)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    userID = child.key;
                    currBalance = child.val().wallet;
                    email = child.val().email;
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

                 const passengertransaction = firebase.database().ref('transaction');
                 const passengertransactionForm = {
                     user: username,
                     email: email,
                     token: null,
                     amount: '5.00',
                     date: Date.now() * -1,
                     action: 'cash-out for booking'
                 }

                 passengertransaction.push(passengertransactionForm);

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

                const drivertransaction = firebase.database().ref('transaction');
                const drivertransactionForm = {
                    user: user[2],
                    email: user[3],
                    token: null,
                    amount: '5.00',
                    date: Date.now() * -1,
                    action: 'cash-in for booking'
                }

                drivertransaction.push(drivertransactionForm);

                user[8] = newBalanceDriver;
            })
    }
    document.getElementById('div_' + username).style.display = 'none';
}