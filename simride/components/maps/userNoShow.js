import firebase from '../../../base';

export const userNoShow = (username) => {
    const date = new Date();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let y = date.getFullYear();
    const today = new Date(y, m, d);
    let userID = '';

    alert(username)

    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('uname')
        .equalTo(username)
        .once('value')
        .then((snapshot) => {
                snapshot.forEach((child) => {
                    userID = child.key;
                });

        // const reportRef = firebase.database().ref('reportedUsers/' + userID);
        // reportRef.once('value', (snapshot) => {
        //     if (snapshot.exists()) {
        //         reportRef.update({
        //             lastReportDate: today * -1,
        //             fake: snapshot.val().fake += 0,
        //             safety: snapshot.val().safety += 0,
        //             vulgar: snapshot.val().vulgar += 0,
        //             inappropriate: snapshot.val().inappropriate += 0,
        //             noshow: snapshot.val().inappropriate += 1
        //         });
        //     } else {
        //         reportRef.set({
        //             username: username,
        //             status: "not banned",
        //             lastReportDate: today * -1,
        //             fake: 0,
        //             safety: 0,
        //             vulgar: 0,
        //             inappropriate: 0,
        //             noshow: 1
        //         });
        //     }
        //});
    })

    alert("Report has been sent");
    document.getElementById('btnBoard').style.display = 'none';
    document.getElementById('btnNoShow').style.display = 'none';
    document.getElementById('btnHere').style.display = 'none';
}