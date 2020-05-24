import 'firebase/firestore';
import firebase from '../../../base';
import React from 'react';
import logo from '../../assets/images/logo.png';

import { Text, View, Image } from 'react-native';
import { validate } from 'email-validator';
import { forgotPass } from './forgotPass';
import { cancel } from './cancel';
import { checkEmailLogin, user } from './checkEmailLogin';
import { extendSignUp } from './extendSignUp';
import { submitForgotPassword } from './submitForgotPass';

import '../../constants/custom.css';

var countArr = new Array(1); // account
var unameArr = [];
var emailArr = [];
var phoneArr = [];

// login
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      repassword: "",
      wallet: "",
      rating: "",
      ratedBy: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    document.getElementById("signinemail").focus();

    // counts current total account registered
    firebase.database()
      .ref("admin")
      .orderByChild("acct")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((child) => {
          countArr[0] = child.val().acct;
        })
      });

    // loads accounts
    firebase.database().ref("accounts")
      .orderByChild("email")
      .once("value")
      .then((snapshot) => {
        var i = 0;
        snapshot.forEach((child) => {
          unameArr[i] = child.val().uname;
          emailArr[i] = child.val().email;
          phoneArr[i] = child.val().phone;
          i++;
        })
      });
    
    if (user[6] === "no") {
      if (document.getElementById("checkOutTab") !== null) {
        document.getElementById("checkOutTab").style.display = "none";
      }
    }
  }

  signup = (e) => {
    e.preventDefault();
    // checks for duplicate username
    var i = 0;
    var check = false;
    const rg = new RegExp("^((8|9)[0-9]{7}$)");
    while (i < unameArr.length) {
      if (this.state.username === unameArr[i]) {
        alert("Username has already been registered");
        check = false;
        break;
      } else {
        if (this.state.phone === phoneArr[i]) {
          alert("Phone number has already been registered");
          check = false;
          break;
        } else {
          if (rg.test(this.state.phone)) {
            check = true;
          } else {
            alert("Phone number is invalid")
            check = false;
          }
        }
      }
      i++;
    }

    // checks confirm password
    if (this.state.password !== this.state.repassword) {
      alert("Passwords do not match");
    } else {
      if (check) {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
          alert(error.code + ": " + error.message);
        }).then(() => {

          const accountsRef = firebase.database().ref("accounts");
          const account = {
            fname: this.state.firstName,
            lname: this.state.lastName,
            uname: this.state.username,
            phone: this.state.phone,
            email: this.state.email.toLowerCase(),
            isDriver: "no",
            isAdmin: "no",
            isBanned: "no",
            wallet: 0,
            rating: 0,
            ratedBy: 0
          }
          let reg = new Array(10); // 0fname, 1lname, 2uname, 3email, 4phone, 5isDriver, 6isAdmin, 7isBanned, 8wallet, 9id

          // after signup, stores user data into user
          reg[0] = account.fname;
          reg[1] = account.lname;
          reg[2] = account.uname;
          reg[3] = account.email;
          reg[4] = account.phone;
          reg[5] = account.isDriver;
          reg[6] = account.isAdmin;
          reg[7] = account.isBanned;
          reg[8] = account.wallet;
          reg[9] = account.key;
          reg[10] = account.rating;
          reg[11] = account.ratedBy

          accountsRef.push(account);
          this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            repassword: "",
            isDriver: "",
            isAdmin: "",
            isBanned: "",
            wallet: "",
            rating: "",
            ratedBy: ""
          };
          // writing
          firebase.database().ref("admin/counter")
            .once("value")
            .then((snapshot) => {
              countArr[0] = emailArr.length + 1;
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
  }

  submitForgotPassword_click = () => {
    submitForgotPassword(this.state.email);
  }

  // login
  login(e) {
    e.preventDefault();

    if (typeof user[9] !== "undefined") {
      var i = 0;
      var email = this.state.email.toLowerCase();

      if (!validate(email)) {
        alert("Email not valid bro");
      } else {
        while (i < emailArr.length) {
          if (emailArr[i].toString() === email) {
            if (user[7].toString() === "yes") {
              alert("Account is banned. Please contact administrator.")
              break;
            } else {
              firebase.auth().signInWithEmailAndPassword(email, this.state.password).then((u) => { }).catch((error) => {
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
  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <img src={logo} alt="SIMRide Logo" />
        <br/>
        <br/>
        <br/>
        <h1 style={{ color: '#fff', fontSize: 50, fontFamily: 'Roboto', fontWeight: '600' }}>SIMRide</h1>
        <Image source={logo} />
        <div>
          <form>
            <div id="signinblock">
              <br/>
              <br/>
              <input id="signinemail" value={this.state.email} onChange={this.handleChange} onBlur={checkEmailLogin} type="email" name="email"
                placeholder="email" />
              <input value={this.state.password} onChange={this.handleChange} type="password"
                name="password" placeholder="password" style={{ marginLeft: '15px' }} />
              <br/>
              <a onClick={forgotPass}>&nbsp;Forgot password?</a>
              <br/>
              <br/>
              <div id="div_SubmitSignIn" style={{ textAlign: "center" }}>
                <button id="btnSignIn" type="submit" onClick={this.login}>Sign In</button>
                <button onClick={extendSignUp} style={{ marginLeft: "25px" }}>Sign Up</button>
              </div>
            </div>

            <div id="forgotpasswordblock" style={{ display: "none" }}>
              <br/>
              <br/>
              <input id="forgotemail" value={this.state.email} onChange={this.handleChange} onBlur={checkEmailLogin} type="email" name="email"
                placeholder="E-Mail (test@this.com)" />
              <br/>
              <br/>
              <div style={{ textAlign: "center" }}>
                <button type="submit" onClick={this.submitForgotPassword_click}>Reset Password</button>
                <button type="submit" onClick={cancel}>Back</button>
              </div>
            </div>

            <div id="signupblock" style={{ display: "none" }}>
              <table>
                <tbody>
                  <tr>
                    <td width='100'>First Name</td>
                    <td><input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" />
                    </td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td><input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" />
                    </td>
                  </tr>
                  <tr>
                    <td>E-Mail</td>
                    <td><input value={this.state.email} onChange={this.handleChange} type="email" name="email" /></td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td><input value={this.state.phone} onChange={this.handleChange} type="phone" name="phone" /></td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td><input value={this.state.username} onChange={this.handleChange} type="text" name="username" /></td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td><input value={this.state.password} onChange={this.handleChange} type="password" name="password" /></td>
                  </tr>
                  <tr>
                    <td>Re-Enter<br/>Password</td>
                    <td><input value={this.state.repassword} onChange={this.handleChange} type="password" name="repassword" /></td>
                  </tr>
                </tbody>
              </table>
              <br/>
              <div style={{ textAlign: "center" }}>
                <button onClick={this.signup}>Submit</button>
                <button onClick={cancel} style={{ marginLeft: "25px" }}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </View>
    );
  }
}

export default Login;
export { user, unameArr }
    