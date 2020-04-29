import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import viewMyBookings from './viewMyBookings';

// join booking
joinBooking(() => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    let currPassengers = document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML;
    let bookingDate = document.getElementById('td_viewSelectedBooking_date').innerHTML;

    if (payMethod === "") {
        payMethod += document.getElementById('ddPayBy').value;
    } else {
        payMethod += (", " + document.getElementById('ddPayBy').value);
    }

    if (currPassengers === "") {
        currPassengers += user[2];
    } else {
        currPassengers += (", " + user[2]);
    }
    if (PostalCode === "") {
        PostalCode += this.state.postal;
    } else {
        PostalCode += (", " + this.state.postal);
    }

    // checks for duplicate booking
    let dates = [];
    let check = false;
    const zip = PostalCode;

    const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.val().currPassengers.includes(user[2])) {
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
                if (Date.parse(bookingDate) < moment.unix(dates[i] / 1000).add(2, 'hours') && Date.parse(bookingDate) > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
                    alert("You have another booking set 2 hours before/after this time");
                    check = false;
                    break;
                } else {
                    check = true;
                }
                i++;
            }
        }

        if (check) {
            if (user[8] < 5.00 && document.getElementById('ddPayBy').value === "wallet") {
                alert("You do not have sufficient funds in your e-wallet");
            } else {
                const accountsRef = firebase.database().ref('bookings/' + bookingID);
                const bookingDetails = {
                    currPassengers: currPassengers,
                    payMethod: payMethod,
                    postal: zip
                }
                accountsRef.update(bookingDetails);
                this.state = {
                    currPassengers: '',
                    payMethod: '',
                    postal: ''
                };

                payMethod = '';
                currPassengers = '';
                document.getElementById('btnSubmitJoinBooking').style.display = "none";
                document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";
                viewMyBookings();
            }
        }
    });

    PostalCode = '';
})

module.exports = joinBooking = joinBooking;