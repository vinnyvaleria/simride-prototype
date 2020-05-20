import * as firebase from 'firebase';
import 'firebase/firestore';

export default function Registration(email, password) {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      });
  } catch (error) {
    console.log(error.toString(error));
  }
}