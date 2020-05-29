import firebase from '../../../base';
import 'firebase/firestore';
import * as moment from 'moment';
import {user} from './checkEmailDashboard';
import {acknowledgeNotif} from './acknowledgeNotif';
var userDetails = [];
import notif from '../../assets/images/notification.png';

export const notifications = (tb) => {
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
    database.on('value', (snapshot) => {
        if (snapshot.exists()) {
            if (document.getElementById(tb) !== null) {
                document.getElementById(tb).innerHTML = '';
            }
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                if (data.val().uname === user[2]) {
                    let notification = data.val().notification;
                    let reason = data.val().reason;
                    let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY");


                    content += '<div class=admin-box id=' + data.key + '>';
                    content += '<img src=' + notif + ' class=admin-icon />';
                    content += '<div><p class=admin-label>' + notification + '</p>';
                    content += '<p class=admin-footer>' + reason + '</p>';
                    content += '<p class=admin-footer>' + date + '</p>';
                    content += '<div id=\'btnNotification' + rowCount + '\'></div>';
                    content += '</div></div>';

                    /*
                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + notification + '</td>'; //column1
                    content += '<td>' + reason + '</td>'; //column2
                    content += '<td>' + date + '</td>';
                    content += '<td id=\'btnNotification' + rowCount + '\'></td>';
                    content += '</tr>';*/

                    rowCount++;
                }
            });

            if (document.getElementById(tb) !== null) {
                document.getElementById(tb).innerHTML += content;
            }
            
            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'OK');
                btn.onclick = acknowledgeNotif;

                if (document.getElementById('btnNotification' + v) !== null) {
                    document.getElementById('btnNotification' + v).appendChild(btn);
                }
            }
        }
    });
}