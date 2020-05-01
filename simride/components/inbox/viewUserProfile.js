import firebase from '../../../base';
import 'firebase/firestore';

let clickedUserID = '';
// view another user's profile
export const viewUserProfile = (clickedUser) => {
    if (document.getElementById('otherAcctPage') !== null) {
        document.getElementById('otherAcctPage').style.display = "block";
        document.getElementById('msgsPage').style.display = "none";

        const accountsRef = firebase.database().ref('accounts');
        accountsRef.orderByChild('uname')
            .equalTo(clickedUser)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((child) => {
                    lblotherfName.innerHTML = child.val().fname;
                    lblotherlName.innerHTML = child.val().lname;
                    lblotherEmail.innerHTML = child.val().email;
                    lblotherDriver.innerHTML = child.val().isDriver;
                    lblotherAdmin.innerHTML = child.val().isAdmin;
                    clickedUserID = child.key;
                    console.log(child.val().fname, child.val().email);
                });
            })
    }
}

export {clickedUserID};