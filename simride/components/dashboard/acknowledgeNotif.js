import firebase from '../../../base';
import 'firebase/firestore';
import {notifications} from './notifications';
import {user} from './checkEmailDashboard';

export const acknowledgeNotif = (e) => {
    const notifID = e.target.parentElement.parentElement.parentElement.id;
    const notifRef = firebase.database().ref('notification/' + notifID);
    notifRef.remove();

    if (user[6] === 'yes') {
        notifications('tb_AdminNotifications');
    } else {
        if (user[5] === 'no') {
            notifications('tb_RiderNotifications');
        } else {
            notifications('tb_DriverNotifications');
        }
    }
}