import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import * as moment from 'moment';

// view created bookings by driver
export const viewCreatedBooking = () => {
    let userDetails = [];
    const self = this;
    document.getElementById('tb_CreatedBookings').innerHTML = '';

    document.getElementById('div_availBookings').style.display = "none";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "block";
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

    const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                if (data.val().driverID === user[9]) {
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
                    content += '<td id=\'btnViewCreatedBooking' + rowCount + '\'></td>';
                    content += '</tr>';

                    rowCount++;
                }
            });

            document.getElementById('tb_CreatedBookings').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = self.viewBooking;
                document.getElementById('btnViewCreatedBooking' + v).appendChild(btn);
            }
        }
    });
}