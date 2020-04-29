import firebase from '../../base';
import 'firebase/firestore';

changeCheckoutStatus((e) => {
    var checkoutID = e.target.parentElement.parentElement.id;

    const accountsRef = firebase.database().ref('cashcheckout/' + checkoutID);
    accountsRef.orderByChild('requesterID')
        .equalTo(user[3])
        .once('value')
        .then((snapshot) => {
            snapshot.ref.update({
                disbursed: 'yes'
            })
        });

    this.loadCashOut();
    this.loadCashoutHistory();
})

module.exports.changeCheckoutStatus = changeCheckoutStatus;