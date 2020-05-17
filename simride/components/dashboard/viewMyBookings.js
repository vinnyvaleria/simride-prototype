import firebase from '../../../base';
import 'firebase/firestore';
import {user} from './checkEmailDashboard';
import * as moment from 'moment';

var userDetails = [];
export const viewMyBookings = (tb) => {
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
        }).then(() => {
            const database = firebase.database().ref('bookings').orderByChild('date').limitToFirst(3).startAt(Date.now());
            database.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    if (document.getElementById(tb) !== null) {
                        document.getElementById(tb).innerHTML = '';
                    }
                    let content = '';
                    snapshot.forEach((data) => {
                        if (data.val().currPassengers !== "") {
                            if (data.val().currPassengers.includes(user[2])) {
                                let area = data.val().area;
                                let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
                                let ppl = [];

                                if (data.val().currPassengers !== "") {
                                    ppl = data.val().currPassengers.split(',')
                                }

                                let passengers = ppl.length + "/" + data.val().maxPassengers;
                                let id = data.val().driverID;
                                let driver = '';

                                for (let i = 0; i < userDetails.length; i++) {
                                    let key = [];
                                    key = userDetails[i].split(':');
                                    if (key[0] === id) {
                                        driver = key[1];
                                    }
                                }

                                content += '<tr id=\'' + data.key + '\'>';
                                content += '<td>' + area + '</td>'; //column1
                                content += '<td>' + date + '</td>'; //column2
                                content += '<td>' + driver + '</td>';
                                content += '<td>' + passengers + '</td>';
                                content += '</tr>';
                            }
                        }
                    });
                    if (document.getElementById(tb) !== null) {
                        document.getElementById(tb).innerHTML += content;
                    }
                }
            });
        });
}

