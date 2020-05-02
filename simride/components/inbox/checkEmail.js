import firebase from '../../../base';
import 'firebase/firestore';

var allchats = [];
var chats = [];
var unameArr = [];
var user = new Array(10); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id

// checks email and signs user out if no such email found
export const checkEmail = (e) => {
    const email = firebase.auth().currentUser.email;
    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
            snapshot.forEach((child) => {
                user[0] = child.val().fname;
                user[1] = child.val().lname;
                user[2] = child.val().uname;
                user[3] = child.val().email;
                user[4] = child.val().phone;
                user[5] = child.val().isDriver;
                user[6] = child.val().isAdmin;
                user[7] = child.val().isBanned;
                user[8] = child.val().wallet;
                user[9] = child.key;
            });
        }).then(() => {
            if (typeof user[3] === 'undefined') {
                firebase.auth().signOut();
            } else {
                if (user[6] !== "") {
                    // loads accounts
                    firebase.database()
                        .ref('accounts')
                        .orderByChild('email')
                        .once('value')
                        .then((snapshot) => {
                            var i = 0;
                            snapshot.forEach((child) => {
                                unameArr[i] = child.val().uname;
                                i++;
                            })
                        });

                    firebase.firestore().collection("chat").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            allchats.push(doc.id);
                            chats = Array.from(new Set(allchats))
                        });
                    });
                }
            }
        });
        alert(user)
}

export {user, chats, unameArr};