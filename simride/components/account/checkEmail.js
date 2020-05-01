import firebase from '../../../base';
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';
import { bindUser as user } from '../../functions/bindUserData';

// checks email and signs user out if no such email found
export const checkEmail = (email) => {
    if (typeof email === 'undefined') {
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
}

export {user};