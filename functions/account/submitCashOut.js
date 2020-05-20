import firebase from '../../base';

submitCashOut(() => {
    const notificationRef = firebase.database().ref('notification');
    const balance = parseFloat(user[8] - this.state.cashoutamount).toFixed(2);
    console.log(balance);
    const notification = {
        uname: 'admin',
        date: Date.now(),
        notification: 'Cash-out',
        reason: user[2] + ' has requested to cash-out $' + this.state.cashoutamount
    }

    const requestCheckOutRef = firebase.database().ref('cashcheckout');
    const requestForm = {
        requester: user[2],
        requesterID: user[9],
        date: Date.now(),
        amount: this.state.cashoutamount,
        disbursed: 'no'
    }

    const accountsRef = firebase.database().ref('accounts/' + user[9]);
    accountsRef.orderByChild('email')
        .equalTo(user[3])
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                wallet: balance
            })
        });

    notificationRef.push(notification);
    requestCheckOutRef.push(requestForm);
    this.state = {
        cashoutamount: ''
    };

    user[8] = balance;
    document.getElementById('cashOutInput').value = null;

    document.getElementById('div_WalletHome').style.display = "block";
    document.getElementById('div_WalletTopUp').style.display = "none";
    document.getElementById('div_WalletHistory').style.display = "none";
    document.getElementById('div_CashOut').style.display = "none";
})

module.exports.submitCashOut = submitCashOut;