import firebase from '../../base';
import 'firebase/firestore';

acknowledgeNotif((e) => {
    const notifID = e.target.parentElement.parentElement.id;
    console.log(notifID);
    const notifRef = firebase.database().ref('notification/' + notifID);
    notifRef.remove();

    if (user[6] === 'yes') {
        this.Notifications('tb_AdminNotifications');
    } else {
        if (user[5] === 'no') {
            this.Notifications('tb_RiderNotifications');
        } else {
            this.Notifications('tb_DriverNotifications');
        }
    }
})

module.export.acknowledgeNotif = acknowledgeNotif;