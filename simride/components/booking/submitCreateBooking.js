import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import * as moment from 'moment';
import {user} from './checkEmail';

// submits created booking into realtime db
export const submitCreateBooking = (createDate, createArea, createMaxPassengers, createTowards, recurringWeeks) => {
    // checks for duplicate booking
    let dates = [];
    let check = false;
    const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.val().driverID === user[9]) {
                    dates.push(data.val().date);
                }
            });
        }
    }).then(() => {
        var i = 0;
        if (dates.length === 0) {
            check = true;
        } else {
            while (i < dates.length) {
                if (createDate < moment.unix(dates[i] / 1000).add(2, 'hours') && createDate > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
                    alert("You have another booking set 2 hours before/after this time");
                    check = false;
                    break;
                } else {
                    check = true;
                }
                i++;
            }

            if (check) {
                const date = new Date(createDate);
                const weeks = recurringWeeks;
                let x = 0;
                const bookingsRef = firebase.database().ref('bookings');
                while (x < weeks) {
                    const booking = {
                        driverID: user[9],
                        date: date.setDate(date.getDate() + (7 * x)),
                        area: createArea,
                        maxPassengers: createMaxPassengers,
                        currPassengers: '',
                        payMethod: '',
                        postal: '',
                        towards: createTowards,
                        completed: 'no',
                        ratedBy: ''
                    }
                    bookingsRef.push(booking);
                    x++;
                }
                document.getElementById('tr_showRecurring').style.display = 'none';
                document.getElementById('cbRecurring').checked = false;
                
            }
        }
    });

    document.getElementById('ddArea').selectedIndex = "0";
    document.getElementById('ddPassengers').selectedIndex = "0";
    document.getElementById('ddTowards').selectedIndex = "0";

    document.getElementById('div_availBookings').style.display = "block";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "none";
}