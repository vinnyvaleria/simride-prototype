import * as firebase from 'firebase';
import 'firebase/firestore';

export default function ForgotPassword(email) {
  try {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('A new reset password link has been sent to your email');
        console.log('reset password suceeds');
      })
  } catch (error) {
    console.log(error.toString(error));
    alert('Uh-oh! Something went wrong');
  }  
}