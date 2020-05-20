import { db } from '../../config';
import 'firebase/firestore';

// login
export default function login(e) {
    if (typeof user[9] !== 'undefined') {
        var i = 0;
        var email = this.state.email.toString().toLowerCase();

        if (!validate(email)) {
            alert("Email not valid bro");
        } else {
            while (i < emailArr.length) {
                console.log(emailArr[i], email, i);
                if (emailArr[i].toString() === email) {
                    if (user[7].toString() === "yes") {
                        alert("Account is banned. Please contact administrator.")
                    } else {
                        firebase.auth().signInWithEmailAndPassword(email, this.state.password).then((u) => {}).catch((error) => {
                            alert(error.message)
                        })
                        break;
                    }
                } else if (i === emailArr.length - 1) {
                    alert("Email not found yo");
                    i++;
                } else {
                    i++;
                }
            }
        }
    }
};