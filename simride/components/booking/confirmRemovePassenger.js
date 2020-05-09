import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import index from './index';

export const confirmRemovePassenger = (removeReason) => {
    let payMethod;
    let PostalCode;
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;

    const database = firebase.database().ref('bookings');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.key === bookingID) {
                    payMethod = data.val().payMethod;
                    PostalCode = data.val().postal;
                    let currPassengers = data.val().currPassengers;
                    let passengers = [];
                    let payby = [];
                    let meet = [];

                    if (currPassengers !== "") {
                        passengers = currPassengers.split(', ');
                        payby = payMethod.split(', ');
                        meet = PostalCode.split(', ');
                    }

                    let pos = passengers.indexOf(document.getElementById('ddRemovePassenger').value);
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
                    const accountsRef = firebase.database().ref('bookings/' + bookingID);
                    const bookingDetails = {
                        currPassengers: passengerToPush,
                        payMethod: payToPush,
                        postal: meetToPush
                    }

                    const notificationRef = firebase.database().ref('notification');
                    const notification = {
                        uname: document.getElementById('ddRemovePassenger').value,
                        date: Date.now(),
                        notification: 'Removed from booking ' + bookingID,
                        reason: removeReason
                    }

                    notificationRef.push(notification);
                    accountsRef.update(bookingDetails);
                }
            });
        }
    });

    new index.viewCreatedBooking;
}