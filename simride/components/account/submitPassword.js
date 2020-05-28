import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
import { user } from './checkEmail';
import {checkDriverApplicationStatus} from './checkDriverApplicationStatus';

const util = require('./util')
    
// submits password change and stores into realtime db
export const submitPassword = (newpass, conpass) => {
    if (newpass === conpass) {
        var users = firebase.auth().currentUser;

        users.updatePassword(conpass).then(() => {            
            alert("Password updated successfully!");  
            util.profilePageReset();
            if (user[5] === 'no') {
                checkDriverApplicationStatus();
            }
        }).catch((error) => {
            alert(error);
        });
    } else {
        alert("Passwords do not match!");
    }
}