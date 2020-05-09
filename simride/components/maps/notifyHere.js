import firebase from '../../../base';
import {user} from '../booking/checkEmail'

export const notifyHere = (username) => {
    let carplate = '';
    const accountsRef = firebase.database().ref('driverDetails');
    accountsRef.orderByChild('driverUname')
        .equalTo(user[2])
        .once('value')
        .then((snapshot) => {
                snapshot.forEach((child) => {
                    carplate = child.val().carplate;
                });
    
        const notificationRef = firebase.database().ref('notification');
        const notification = {
            uname: username,
            date: Date.now(),
            notification: 'Driver is here!',
            reason: 'Please look for vehicle no. ' + carplate + '.'
        }
        
        document.getElementById('btnBoard').style.display = 'inline-block';
        document.getElementById('btnNoShow').style.display = 'inline-block';
        notificationRef.push(notification);
    })
}