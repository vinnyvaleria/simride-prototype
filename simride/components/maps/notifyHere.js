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
                //notificationRef.push(notification);

                document.getElementById('div_' + users[u]).style.display = 'block';
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

            document.getElementById('div_' + username).style.display = 'block';
        }
        
        document.getElementById('userAttendance').style.display = 'block';
    })
}