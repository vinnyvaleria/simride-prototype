import firebase from '../../base';
import 'firebase/firestore';

loadCashout(() => {
    const self = this;
    document.getElementById('tb_NotDisbursedCashout').innerHTML = '';

    const database = firebase.database().ref('cashcheckout').orderByChild('date');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                console.log(data.val().requester);
                if (data.val().disbursed === "no") {
                    console.log('fuck money');
                    let user = data.val().requester;
                    let userID = data.val().requesterID;
                    let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
                    let amount = data.val().amount;

                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + userID + '</td>'; //column1
                    content += '<td>' + user + '</td>'; //column2
                    content += '<td>' + amount + '</td>';
                    content += '<td>' + date + '</td>';
                    content += '<td id=\'btnUpdateRequest' + rowCount + '\'></td>';
                    content += '</tr>';

                    rowCount++;
                }
            });
            document.getElementById('tb_NotDisbursedCashout').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'Done');
                btn.onclick = self.changeCheckoutStatus;
                document.getElementById('btnUpdateRequest' + v).appendChild(btn);
            }
        }
    });
})

module.exports.loadCashout = loadCashout;