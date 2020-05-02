import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

const util = require('./util')
    
// submits password change and stores into realtime db
export const submitPassword = (newpass, conpass) => {
    if (newpass === conpass) {
        var user = firebase.auth().currentUser;

        user.updatePassword(conpass).then(() => {
            alert("Password updated successfully!");
        }).catch((error) => {
            alert(error);
        });

        util.profilePageReset();
    } else {
        alert("Passwords do not match!");
    }
}