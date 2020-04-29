import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

// change to remove passenger view
removePassenger(() => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    const database = firebase.database().ref().child('bookings/' + bookingID);
    document.getElementById('ddRemovePassenger').innerHTML = "";
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            if (snapshot.val().currPassengers !== "") {
                let content = '';
                let passengers = [];
                passengers = snapshot.val().currPassengers.split(', ');

                for (let ct = 0; ct < passengers.length; ct++) {
                    content += "<option value=\"";
                    content += passengers[ct];
                    content += "\">" + passengers[ct];
                    content += "</option>";
                }
                document.getElementById('ddRemovePassenger').innerHTML += content;
            } else {
                document.getElementById('ddRemovePassenger').innerHTML += "<option value='none'>No passengers available</option>";
            }
        }
    });
    document.getElementById('btnRemovePassenger').style.display = "none";
    document.getElementById('btnDeleteBooking').style.display = "none";
    document.getElementById('tbl_removePassengerExtend').style.display = "block";
})