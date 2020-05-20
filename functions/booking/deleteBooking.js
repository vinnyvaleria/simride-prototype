import 'firebase/firestore';
import "firebase/storage";
import { db } from '../../config';
import viewMyBookings from './viewMyBookings';

// delete booking
deleteBooking(() => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    const accountsRef = db.ref('bookings/' + bookingID);
    accountsRef.remove();
    viewMyBookings();
})

module.exports.deleteBooking = deleteBooking;