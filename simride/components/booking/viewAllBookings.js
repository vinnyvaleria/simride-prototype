import firebase from '../../../base';
import * as moment from 'moment';
import {viewBooking} from './viewBooking';
import all from '../../assets/images/all-bookings.png';

export const viewAllBookings = () => {
    let userDetails = [];
    document.getElementById('ddFilterArea').selectedIndex = 0;
    document.getElementById('div_availBookings').style.display = "block";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "none";
    document.getElementById('btnSubmitJoinBooking').style.display = "none";
    document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";

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
        }).then(() => {
            const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
            database.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    let content = '';
                    let rowCount = 0;
                    if (document.getElementById('tb_AllBookings') !== null) {
                        document.getElementById('tb_AllBookings').innerHTML = '';
                    }
                    snapshot.forEach((data) => {
                        if (data.val().date > moment.now() && data.val().completed === 'no') {
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

                            content += '<div class=booking-box id=' + data.key + '>';
                            content += '<img src=' + all + ' class=booking-icon />';
                            content += '<div><p class=booking-label>' + driver + '</p>';
                            content += '<p class=booking-area>' + area + '</p>';
                            content += '<p class=booking-footer>' + date + '</p>';
                            content += '<p class=booking-footer>Passengers : ' + passengers + '</p>';
                            content += '<div id=\'btnViewBooking' + rowCount + '\'></div>';
                            content += '</div></div>';
                            
                            /*
                            content += '<tr id=\'' + data.key + '\'>';
                            content += '<td>' + area + '</td>'; //column1
                            content += '<td>' + date + '</td>'; //column2
                            content += '<td>' + driver + '</td>';
                            content += '<td>' + passengers + '</td>';
                            content += '<td id=\'btnViewBooking' + rowCount + '\'></td>';
                            content += '</tr>';
                            */

                            rowCount++;
                        }
                    });

                    if (document.getElementById('tb_AllBookings') !== null) {
                        document.getElementById('tb_AllBookings').innerHTML += content;
                    }

                    for (let v = 0; v < rowCount; v++) {
                        let btn = document.createElement('input');
                        btn.setAttribute('type', 'button')
                        btn.setAttribute('value', 'View');
                        btn.onclick = viewBooking;
                        if (document.getElementById('btnViewBooking' + v) !== null) {
                            document.getElementById('btnViewBooking' + v).appendChild(btn);
                        }
                    }
                }
            });
        });
}