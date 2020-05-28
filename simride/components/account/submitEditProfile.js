import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import { user } from './checkEmail';

const util = require('./util')

// submits the edited profile and updates the realtime db
export const submitEditProfile = (fname, lname, phone) => {
    const rg = new RegExp("^((8|9)[0-9]{7}$)");
    if (fname !== "" && lname !== "" && phone !== "" && rg.test(phone)) {
        user[0] = fname;
        user[1] = lname;
        user[4] = phone;

        const accountsRef = firebase.database().ref('accounts/' + user[9]);
        accountsRef.orderByChild('email')
            .equalTo(user[3])
            .once('value')
            .then((snapshot) => {
                snapshot.ref.update({
                    fname: user[0]
                })
                snapshot.ref.update({
                    lname: user[1]
                })
                snapshot.ref.update({
                    phone: user[4]
                })
            });
        alert("Account is updated.")
    } else {
        alert("Account was not updated.")
    }
    document.getElementById('lblfName').innerHTML = user[0];
    document.getElementById('lbllName').innerHTML = user[1];
    document.getElementById('lblPhone').innerHTML = user[4];

    util.profilePageReset();

    document.getElementById('editfName').value = "";
    document.getElementById('editlName').value = "";
    document.getElementById('editPhone').value = "";
}