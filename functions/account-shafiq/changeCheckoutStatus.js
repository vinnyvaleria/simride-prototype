import { db } from '../../config';
import 'firebase/firestore';

import { db } from '../../config';

changeCheckoutStatus((e) => {
    var checkoutID = e.target.parentElement.parentElement.id;

    const accountsRef = db.ref('cashcheckout/' + checkoutID);
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