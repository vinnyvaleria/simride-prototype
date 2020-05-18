import firebase from '../../../base';

export const submitRating = (username, rating, bookingID, currUser) => {
    let currRating;
    let currRatedBy;
    let id;
    let names = '';
    let driverID

    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('uname')
        .equalTo(username)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                currRating = child.val().rating;
                currRatedBy = child.val().ratedBy;
                id = child.key;
            });
            const updateRating = firebase.database().ref('accounts/' + id);
            updateRating.orderByChild('uname')
                .equalTo(username)
                .once('value')
                .then((snapshot) => {
                    snapshot.ref.update({
                        rating: parseInt(currRating) + parseInt(rating),
                        ratedBy: parseInt(currRatedBy) + 1
                    });
                });
        });

    const bookingsRef = firebase.database().ref().child('bookings');
        bookingsRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    if (child.key === bookingID) {
                        names = child.val().ratedBy;
                        driverID = child.val().driverID;
                    }
                });
                const updateBooking = firebase.database().ref('bookings/' + bookingID);
                updateBooking.orderByChild('driverID')
                    .equalTo(driverID)
                    .once('value')
                    .then((snapshot) => {
                        if (names === '') {
                            snapshot.ref.update({
                                ratedBy: currUser
                            });
                        }
                        else if (names !== '' && !(names.includes(currUser))) {
                            snapshot.ref.update({
                                ratedBy: names + ',' + currUser
                            });
                        }
                    });
            }
        });
        
        
    alert('Rating for ' + username + ' submitted!');
}