import firebase from '../../../base';
import 'firebase/firestore';

// reset password for user
export const submitForgotPassword = (email) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("Reset link has been sent to your email!")
    }).catch((error) => {
        alert("Uh-oh! Something went wrong")
    });
}

