import 'firebase/firestore';
import "firebase/storage";
import { db } from '../../config';
import viewMyBookings from './viewMyBookings';

// cancel booking
cancelBooking(() => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    let currPassengers = document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML;
    let passengers = [];
    passengers = currPassengers.split(', ');
    let payby = [];
    payby = payMethod.split(', ');
    let meet = [];
    meet = PostalCode.split(', ');
    let pos = passengers.indexOf(user[2]);
    let payToPush = '';
    let passengerToPush = '';
    let meetToPush = '';

    passengers[pos] = '';
    let temppassengers = [];
    passengers.forEach((p) => {
        if (p !== '') {
            temppassengers.push(p);
        }
    });

    payby[pos] = '';
    let temppay = [];
    payby.forEach((p) => {
        if (p !== '') {
            temppay.push(p);
        }
    });

    meet[pos] = '';
    let tempmeet = [];
    meet.forEach((p) => {
        if (p !== '') {
            tempmeet.push(p);
        }
    });

    for (let p = 0; p < temppay.length; p++) {
        if (temppay[p] !== '') {
            if (p !== temppay.length - 1) {
                payToPush += temppay[p] + ", ";
                passengerToPush += temppassengers[p] + ", ";
                meetToPush += tempmeet[p] + ", ";
            } else {
                payToPush += temppay[p];
                passengerToPush += temppassengers[p];
                meetToPush += tempmeet[p];
            }
        }
    }

    const accountsRef = db.ref('bookings/' + bookingID);
    const bookingDetails = {
        currPassengers: passengerToPush,
        payMethod: payToPush,
        postal: meetToPush
    }

    accountsRef.update(bookingDetails);
    this.state = {
        currPassengers: '',
        payMethod: '',
        postal: ''
    };

    currPassengers = '';
    viewMyBookings();
})

module.exports.cancelBooking = cancelBooking;