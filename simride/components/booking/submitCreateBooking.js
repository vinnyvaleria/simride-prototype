import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

// submits created booking into realtime db
submitCreateBooking((e) => {
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
                if (this.state.date < moment.unix(dates[i] / 1000).add(2, 'hours') && this.state.date > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
                    alert("You have another booking set 2 hours before/after this time");
                    check = false;
                    break;
                } else {
                    check = true;
                }
                i++;
            }

            if (check) {
                const date = new Date(this.state.date);
                const weeks = this.state.recurringWeeks;
                let x = 0;
                const bookingsRef = firebase.database().ref('bookings');
                while (x < weeks) {
                    const booking = {
                        driverID: user[9],
                        date: date.setDate(date.getDate() + (7 * x)),
                        area: this.state.createArea,
                        maxPassengers: this.state.createMaxPassengers,
                        currPassengers: '',
                        payMethod: '',
                        postal: '',
                        towards: this.state.createTowards
                    }

                    bookingsRef.push(booking);
                    x++;
                }
                document.getElementById('tr_showRecurring').style.display = 'none';
                document.getElementById('cbRecurring').checked = false;
                this.state = {
                    date: Datetime.moment(),
                    recurringWeeks: 1
                };
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
})

module.exports.submitCreateBooking = submitCreateBooking;