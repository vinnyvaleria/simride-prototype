import firebase from '../../../base';
import {viewAllBookings} from '../booking/viewAllBookings'


export const updateBooking = (bookingID) => {
    const reportRef = firebase.database().ref('bookings/' + bookingID);
    reportRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            reportRef.update({
                completed: 'yes'
            });
        }
    });

    alert('We hope you enjoyed your ride!')
    viewAllBookings();
}