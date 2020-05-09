import firebase from '../../../base';

export const updateBooking = (bookingID) => {
    const reportRef = firebase.database().ref('bookings/' + bookingID);
    reportRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            reportRef.update({
                completed: 'yes'
            });
        }
    });
}