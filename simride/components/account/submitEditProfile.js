import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';

// submits the edited profile and updates the realtime db
submitEditProfile((e) => {
    e.preventDefault();
    if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.phone !== "") {
        user[0] = this.state.firstName;
        user[1] = this.state.lastName;
        user[4] = this.state.phone;

        const accountsRef = firebase.database().ref('accounts/' + user[9]);
        accountsRef.orderByChild('email')
            .equalTo(user[3])
            .once('value')
            .then((snapshot) => {
                snapshot.ref.update({
                    fname: user[0]
                })
                snapshot.ref.update({
                    lname: user[1]
                })
                snapshot.ref.update({
                    phone: user[4]
                })
            });
    } else {
        alert("Account was not updated.")
    }
    document.getElementById('lblfName').innerHTML = user[0];
    document.getElementById('lbllName').innerHTML = user[1];
    document.getElementById('lblPhone').innerHTML = user[4];

    Util.profilePageReset();

    document.getElementById('editfName').value = "";
    document.getElementById('editlName').value = "";
    document.getElementById('editPhone').value = "";
})
module.exports.submitEditProfile = submitEditProfile;