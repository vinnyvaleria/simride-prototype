import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import {viewMyBookings} from './viewMyBookings';
import {user} from './checkEmail'

// cancel booking
export const cancelBooking = () => {
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

                    const accountsRef = firebase.database().ref('bookings/' + bookingID);
                    const bookingDetails = {
                        currPassengers: passengerToPush,
                        payMethod: payToPush,
                        postal: meetToPush
                    }

                    accountsRef.update(bookingDetails);
                }
            });
        }
    }) 

    viewMyBookings();
}