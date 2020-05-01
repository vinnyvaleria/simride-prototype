import firebase from '../../../base';
import 'firebase/firestore';

// reset password for user
export const submitForgotPassword = (e) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
        alert("Reset link has been sent to your email!")
    }).catch((error) => {
        alert("Uh-oh! Something went wrong")
    });
}

