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
            
        if (username.includes(', ')) {
            let users = [];
            users = username.split(', ');

            for (let u = 0; u<users.length; u++) {
                const notificationRef = firebase.database().ref('notification');
                const notification = {
                    uname: users[u],
                    date: Date.now(),
                    notification: 'Driver is here!',
                    reason: 'Please look for vehicle no. ' + carplate + '.'
                }
                console.log(notification)
                //notificationRef.push(notification);
            }
        }
        else {
            const notificationRef = firebase.database().ref('notification');
            const notification = {
                uname: username,
                date: Date.now(),
                notification: 'Driver is here!',
                reason: 'Please look for vehicle no. ' + carplate + '.'
            }
            //notificationRef.push(notification);
            console.log(notification)
        }
        
        document.getElementById('btnBoard').style.display = 'inline-block';
        document.getElementById('btnNoShow').style.display = 'inline-block';
    })
}