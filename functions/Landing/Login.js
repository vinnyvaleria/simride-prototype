import * as firebase from 'firebase';
import 'firebase/firestore';

export default function Login(email, password) {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( res => {
        console.log(res.user.email);
      })
  } catch (error) {
    console.log(error.toString(error));
  }
}