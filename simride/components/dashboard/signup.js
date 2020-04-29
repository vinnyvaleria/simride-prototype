import firebase from '../../../base';
import 'firebase/firestore';

signup((e) => {
    e.preventDefault();

    // checks for duplicate username
    var i = 0;
    var unameCheck = false;
    while (i < unameArr.length) {
        if (this.state.username === unameArr[i]) {
            alert("Username has already been registered");
            unameCheck = false;
            break;
        } else {
            unameCheck = true;
        }
        i++;
    }

    // checks confirm password
    if (this.state.password !== this.state.repassword) {
        alert("Passwords do not match");
    } else {
        console.log(unameCheck);
        if (unameCheck) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email.toString().toLowerCase(), this.state.password).then((u) => {}).then((u) => {
                    const accountsRef = firebase.database().ref('accounts');
                    const account = {
                        fname: this.state.firstName,
                        lname: this.state.lastName,
                        uname: this.state.username,
                        phone: this.state.phone,
                        email: this.state.email.toString().toLowerCase(),
                        isDriver: "no",
                        isAdmin: "no",
                        isBanned: "no",
                        wallet: "0.00"
                    }
                    user = [];
                    // after signup, stores user data into user
                    user[0] = account.fname;
                    user[1] = account.lname;
                    user[2] = account.uname;
                    user[3] = account.email;
                    user[4] = account.phone;
                    user[5] = account.isDriver;
                    user[6] = account.isAdmin;
                    user[7] = account.isBanned;
                    user[8] = account.wallet;
                    user[9] = account.key;

                    accountsRef.push(account);
                    this.state = {
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                        repassword: '',
                        isDriver: '',
                        isAdmin: '',
                        isBanned: '',
                        wallet: ''
                    };

                    // writing
                    firebase.database().ref('admin/counter')
                        .once('value')
                        .then((snapshot) => {
                            countArr[0] = emailArr.length + 1;
                            console.log("rewrite: ", countArr[0]);
                            snapshot.ref.update({
                                acct: countArr[0]
                            });
                        });
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    }
})

module.exports.signup = signup;