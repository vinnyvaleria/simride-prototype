import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../base';
 
 // display create booking information, binds area from db
 createBooking(() => {
     document.getElementById('div_availBookings').style.display = "none";
     document.getElementById('div_createBooking').style.display = "block";
     document.getElementById('div_myBookings').style.display = "none";
     document.getElementById('div_viewSelectedBooking').style.display = "none";
     document.getElementById('div_viewCreatedBooking').style.display = "none";

     document.getElementById('driverID').innerHTML = user[9];

     const database = firebase.database().ref().child('admin/area');
     database.once('value', (snapshot) => {
         if (snapshot.exists()) {
             let content = '';

             snapshot.forEach((child) => {
                 let newarea = [];
                 newarea = child.val().split(',');

                 content += "<option value=\"";
                 content += newarea[0];
                 content += "\">" + newarea[0];
                 content += "</option>";
             });
             document.getElementById('ddArea').innerHTML += content;
         }
     });
 })

 module.exports.createBooking = createBooking;