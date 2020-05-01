import firebase from '../../../base';
import checkDriverApplicationStatus from './checkDriverApplicationStatus';

// checks email and signs user out if no such email found
checkEmail((e) => {
    if (typeof user[3] === 'undefined') {
        firebase.auth().signOut();
    } else {
        if (user[6] !== "") {
            document.getElementById('btnApplyDriver').style.display = "none";
        } else {
            if (user[5] === "no") {
                checkDriverApplicationStatus();
            }
        }
    }
})

module.exports.checkEmail = checkEmail;