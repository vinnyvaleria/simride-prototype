import firebase from '../../../base';
import * as moment from 'moment';
import {viewBooking} from './viewBooking';

export const filterChange = () => {
    let areaNames = [];
    let userDetails = [];
    document.getElementById('tb_AllBookings').innerHTML = '';

    document.getElementById('div_availBookings').style.display = "block";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "none";

    // get all accounts
    firebase.database().ref('accounts')
        .orderByChild('email')
        .once('value')
        .then((snapshot) => {
            var i = 0;
            snapshot.forEach((child) => {
                userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
                i++;
            })
        });

    // get all area
    const areadatabase = firebase.database().ref().child('admin/area');
    areadatabase.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                let newarea = [];
                newarea = child.val().split(',');
                if (document.getElementById('ddFilterArea').value === "All") {
                    areaNames.push(newarea[0]);
                } else if (document.getElementById('ddFilterArea').value === newarea[1]) {
                    areaNames.push(newarea[0]);
                }
            });
        }
    });

    const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.on('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
                for (var v = 0; v < areaNames.length; v++) {
                    if (areaNames[v] === data.val().area && data.val().completed === 'no' && data.val().date > moment.now()) {
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
                        content += '<td id=\'btnViewBooking' + rowCount + '\'></td>';
                        content += '</tr>';

                        rowCount++;
                    }
                }
            });

            document.getElementById('tb_AllBookings').innerHTML += content;

            for (let v = 0; v < rowCount; v++) {
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button')
                btn.setAttribute('value', 'View');
                btn.onclick = viewBooking;
                document.getElementById('btnViewBooking' + v).appendChild(btn);
            }
        }
    });
}