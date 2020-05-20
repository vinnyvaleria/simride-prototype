import { db } from '../../config';

// checks email and signs user out if no such email found
checkEmailAccount((e) => {
    if (typeof user[3] === 'undefined') {
        firebase.auth().signOut();
    } else {
        if (user[6] !== "") {
            document.getElementById('btnApplyDriver').style.display = "none";
        } else {
            if (user[5] === "no") {
                this.checkDriverApplicationStatus();
            }
        }
    }
})

module.exports.checkEmailAccount = checkEmailAccount;