import firebase from '../../../base';

export const submitRating = (username, rating) => {
    let currRating;
    let currRatedBy;
    let id;

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

        
    

    alert('Rating for ' + username + ' submitted!');
}