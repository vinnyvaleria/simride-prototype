import firebase from '../../../base';
import 'firebase/firestore';

// reset password for user
export const submitForgotPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        alert("Reset link has been sent to your email!")
    }).catch(function (error) {
        alert("Uh-oh! Something went wrong: " + error)
    });
}


