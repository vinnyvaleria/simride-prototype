import { bindUserData, bindUser } from '../../functions/bindUserData'
import firebase from '../../../base';

let user = new Array(12); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id, 10rating, 11ratedby
export const checkEmailLogin = () => {
    user = [];
    let email;

    if (firebase.auth().currentUser != null) {
        email = firebase.auth().currentUser.email;
    }
    else {
        email = document.getElementById("signinemail").value.toLowerCase();
    }
   
    bindUserData(email);

    user = bindUser;

    if (bindUser[7] === "yes") {
        firebase.auth().signOut();
    }
}

export {user}