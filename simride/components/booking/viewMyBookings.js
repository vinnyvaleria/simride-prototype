import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import {user} from './checkEmail';
import {viewBooking} from './viewBooking';
import * as moment from 'moment';

// view my bookings
export const viewMyBookings = () => {
    let userDetails = [];
    document.getElementById('tb_myBookings').innerHTML = '';

    document.getElementById('div_availBookings').style.display = "none";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "block";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "none";
    document.getElementById('btnSubmitJoinBooking').style.display = "none";
    document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";

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

    const database = firebase.database().ref('bookings').orderByChild('date');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
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
                        content += '<td id=\'btnViewMyBooking' + rowCount + '\'></td>';
                        content += '</tr>';

                        rowCount++;
                    }
                }
            });

            document.getElementById('tb_myBookings').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = viewBooking;
                document.getElementById('btnViewMyBooking' + v).appendChild(btn);
            }
        }
    });
}