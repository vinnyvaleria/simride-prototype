import { db } from '../../config';

getLastFiveBookings(() => {
    document.getElementById('tb_LastFiveTransactions').innerHTML = '';

    // get all accounts
    db.ref('accounts')
        .orderByChild('email')
        .once('value')
        .then((snapshot) => {
            let i = 0;
            snapshot.forEach((child) => {
                userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
                i++;
            })
        });

    const database = db.ref('bookings').orderByChild('date').limitToFirst(5).endAt(Date.now());
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            let content = '';
            snapshot.forEach((data) => {
                console.log(data.val().currPassengers, data.val().driverID, 'haha')
                if (data.val().currPassengers.includes(user[2]) || data.val().driverID === user[9]) {
                    console.log('fuck you');
                    let area = data.val().area;
                    let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");

                    let id = data.val().driverID;
                    let driver = '';

                    for (let i = 0; i < userDetails.length; i++) {
                        let key = [];
                        key = userDetails[i].split(':');
                        if (key[0] === id) {
                            driver = key[1];
                        }
                    }

                    content += '<tr id=\'' + data.key + '\'>';
                    content += '<td>' + area + '</td>'; //column1
                    content += '<td>' + date + '</td>'; //column2
                    content += '<td>' + driver + '</td>';
                    content += '</tr>';
                }
            });
            document.getElementById('tb_LastFiveTransactions').innerHTML += content;
        }
    });
})

module.exports.getLastFiveBookings = getLastFiveBookings;