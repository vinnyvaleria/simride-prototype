import 'firebase/firestore';
import "firebase/storage";
import firebase from '../../../base';
    
// submits password change and stores into realtime db
submitPassword((e) => {
    e.preventDefault();

    if (this.state.newPassword === this.state.confirmPassword) {
        var user = firebase.auth().currentUser;

        user.updatePassword(this.state.confirmPassword).then(() => {
            alert("Password updated successfully!");
        }).catch((error) => {
            alert(error);
        });

        Util.profilePageReset();

        this.setState({
            newPassword: '',
            confirmPassword: ''
        });
    } else {
        alert("Passwords do not match!");
    }
})

module.exports.submitPassword = submitPassword;