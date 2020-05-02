import firebase from '../../../base';
import { user } from './checkEmail';

export const checkDriverApplicationStatus = () => {
    firebase.database().ref('driverDetails')
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                if (user[9] === child.key) {
                    if (child.val().completed === "yes") {
                        document.getElementById('btnApplyDriver').disabled = "true";
                        document.getElementById('btnApplyDriver').style.display = "inline-block";
                        document.getElementById('btnApplyDriver').innerHTML = "Application sent";
                    } else {
                        document.getElementById('btnApplyDriver').style.display = "inline-block";
                    }
                    if (user[6].toLowerCase() === "yes") {
                        document.getElementById('btnApplyDriver').style.display = "none";
                    }
                } else {
                    if (document.getElementById('btnApplyDriver') !== null) {
                        document.getElementById('btnApplyDriver').style.display = "inline-block";
                    }
                }
            })
        });
}