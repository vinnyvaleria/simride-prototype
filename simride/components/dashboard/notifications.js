import firebase from '../../../base';
import 'firebase/firestore';
import * as moment from 'moment';
var userDetails = [];

export const notifications = (tb) => {
    const self = this;
    document.getElementById(tb).innerHTML = '';

    // get all accounts
    firebase.database().ref('accounts')
        .orderByChild('email')
        .once('value')
        .then((snapshot) => {
            let i = 0;
            snapshot.forEach((child) => {
                userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
                i++;
            })
        });

    const database = firebase.database().ref('notification').orderByChild('date');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                if (data.val().uname === user[2]) {
                    let notification = data.val().notification;
                    let reason = data.val().reason;
                    let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY");

                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + notification + '</td>'; //column1
                    content += '<td>' + reason + '</td>'; //column2
                    content += '<td>' + date + '</td>';
                    content += '<td id=\'btnNotification' + rowCount + '\'></td>';
                    content += '</tr>';

                    rowCount++;
                }
            });

            document.getElementById(tb).innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'Ack');
                btn.onclick = self.acknowledgeNotif;
                document.getElementById('btnNotification' + v).appendChild(btn);
            }
        }
    });
}