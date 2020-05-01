
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
import { signup } from './signup';
import { submitForgotPassword } from './submitForgotPass';

var countArr = new Array(1); // account
var unameArr = [];
var emailArr = [];

// login
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    // checkEmailLogin = checkEmailLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // signup = signup.bind(this);
    // submitForgotPass = submitForgotPass.bind(this);
    //this.forgotPass = () => forgotPass;
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      repassword: '',
      wallet: ''
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
      .ref('admin')
      .orderByChild('acct')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          countArr[0] = child.val().acct;
        })
      });

    // loads accounts
    firebase.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        var i = 0;
        snapshot.forEach((child) => {
          unameArr[i] = child.val().uname;
          emailArr[i] = child.val().email;
          i++;
        })
      });
    
    if (user[6] === "no") {
      document.getElementById('checkOutTab').style.display = 'none';
    }
  }

  // login
  login(e) {
    e.preventDefault();

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
        <Text style={{ color: '#fff', fontSize: 30, fontFamily: 'Helvetica', fontWeight: '600' }}>Welcome to SIMRide</Text>
        <Image source={logo} />
        <div>
          <form>
            <div id="signinblock">
              <br />
              <br />
              <input id="signinemail" value={this.state.email} onChange={this.handleChange} onBlur={checkEmailLogin} type="email" name="email"
                placeholder="E-Mail (test@this.com)" />
              <input value={this.state.password} onChange={this.handleChange} type="password"
                name="password" placeholder="Password (shafiq)" style={{ marginLeft: '15px' }} />
              <br />
              <a onClick={forgotPass}>Forgot password?</a>
              <br />
              <br />
              <div id="div_SubmitSignIn" style={{ textAlign: 'center' }}>
                <button type="submit" onClick={this.login}>Sign In</button>
                <button onClick={extendSignUp} style={{ marginLeft: '25px' }}>Sign Up</button>
              </div>
            </div>

            <div id="forgotpasswordblock" style={{ display: 'none' }}>
              <br />
              <br />
              <input id="forgotemail" value={this.state.email} onChange={this.handleChange} onBlur={checkEmailLogin} type="email" name="email"
                placeholder="E-Mail (test@this.com)" />
              <br />
              <br />
              <div style={{ textAlign: 'center' }}>
                <button type="submit" onClick={submitForgotPassword}>Reset Password</button>
                <button type="submit" onClick={cancel}>Back</button>
              </div>
            </div>

            <div id="signupblock" style={{ display: 'none' }}>
              <table>
                <tbody>
                  <tr>
                    <td>First Name</td>
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
                    <td><input value={this.state.username} onChange={this.handleChange} type="text" name="username" />
                    </td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td><input value={this.state.password} onChange={this.handleChange} type="password"
                      name="password" /></td>
                  </tr>
                  <tr>
                    <td>Re-Enter Password</td>
                    <td><input value={this.state.repassword} onChange={this.handleChange} type="password"
                      name="repassword" /></td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div style={{ textAlign: 'center' }}>
                <button onClick={signup}>Submit</button>
                <button onClick={cancel} style={{ marginLeft: '25px' }}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </View>
    );
  }
}

export default Login;
export { user }
    