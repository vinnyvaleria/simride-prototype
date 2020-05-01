import firebase from '../../../base';
import { bindUser as user } from '../../functions/bindUserData';

export const checkDriverApplicationStatus = () => {
    firebase.database().ref('driverDetails')
        .once('value')
        .then((snapshot) => {
            var i = 0;
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
                    document.getElementById('btnApplyDriver').style.display = "inline-block";
                }
            })
        });
}