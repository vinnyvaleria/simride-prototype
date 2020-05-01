import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import {viewMyBookings} from './viewMyBookings';

// delete booking
export const deleteBooking = () => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    const accountsRef = firebase.database().ref('bookings/' + bookingID);
    accountsRef.remove();
    viewMyBookings();
}