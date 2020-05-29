/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-alert */
import firebase from '../../../base';
import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';
import 'firebase/storage';

import { cancelEditProfile } from './cancelEditProfile';
import { checkEmail, user } from './checkEmail';
import { submitDriverDetails } from './submitDriverDetails';
import { submitEditProfile } from './submitEditProfile';
import { submitPassword } from './submitPassword';
import { cancelPassword } from './cancelPassword';
import { checkDriverApplicationStatus } from './checkDriverApplicationStatus';
const util = require('./util');
import '../../constants/custom.css';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      isDriver: '',
      isAdmin: '',
      isBanned: '',
      wallet: '',
      id: '',
      rating: '',
      ratedBy: '',
      avgRating: 0.00,
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: ''
    };
  }

  // handles textbox change
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleImgChange = (e) => {
      if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({
              image
          }));
      }
  }

  componentDidUpdate(prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.firstName !== prevState.firstName) {
      this.render();
    }
  }

  // goes back to login page if stumble upon another page by accident without logging in
  componentDidMount() {
    checkEmail();

    const accountsRef = firebase.database().ref('accounts');
    accountsRef.orderByChild('email')
      .equalTo(firebase.auth().currentUser.email)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          this.setState({
            firstName: child.val().fname,
            lastName: child.val().lname,
            username: child.val().uname,
            email: child.val().email,
            phone: child.val().phone,
            isDriver: child.val().isDriver,
            isAdmin: child.val().isAdmin,
            wallet: child.val().wallet,
            id: child.key,
            rating: child.val().rating,
            ratedBy: child.val().ratedBy
          }, (() => {
            if (this.state.ratedBy > 0) {
              const avg = (parseFloat(this.state.rating) / parseInt(this.state.ratedBy)).toFixed(2);
              this.setState({ avgRating: avg });
            }

            if (this.state.isDriver === 'yes') {
              document.getElementById('driverBadge').style.display = 'block';
            }

            if (this.state.isAdmin === 'yes') {
              document.getElementById('adminBadge').style.display = 'block';
            }

            if (this.state.isBanned === 'yes') {
              alert('Your account has been banned');
              firebase.auth().signOut();
            }
          })
        );
      })
    });
  }

  editProfile = () => {
    util.editProfile();
    document.getElementById('tblApplyDriver').style.display = 'none';
    document.getElementById('btnApplyDriver').style.display = 'none';
    document.getElementById('cancelApplyDriverButton').style.display = 'none';
    document.getElementById('btnImgFrontUpload').style.display = 'none';
    document.getElementById('btnImgBackUpload').style.display = 'none';
    document.getElementById('submitDriverDetails').style.display = 'none';
  }

  submitEditProfile_Click = () => {
    submitEditProfile(this.state.firstName, this.state.lastName, this.state.phone);
  }

  submitPassword_Click = () => {
    submitPassword(this.state.newPassword, this.state.confirmPassword);

    this.setState({
      newPassword: '',
      confirmPassword: ''
    });
  }

  submitDriverDetails_Click = () => {
    submitDriverDetails(this.state.license, this.state.carplate);
    this.state = {
      carplate: '',
      license: '',
      status: '',
      dateApplied: ''
    };
  }

  // uplaods front license pic
  handleUploadFront = () => {
    document.getElementById('cancelApplyDriverButton').disabled = true;
    const { image } = this.state;
    if (document.getElementById('file').value !== '') {
      const uploadTask = firebase.storage().ref().child(`license/${user[9]}/front`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({
            progress
          });
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          // Error function ...
          alert('Error: ' + error);
          console.log(error);
        }, () => {
          // complete function ...
          alert('Image is uploaded!');
          document.getElementById('cancelApplyDriverButton').disabled = false;
          document.getElementById('btnImgFrontUpload').style.display = 'none';
          document.getElementById('btnImgBackUpload').style.display = 'inline-block';
          document.getElementById('td_license').innerHTML = 'License Back:';
          document.getElementById('file').value = "";
          firebase.storage()
            .ref("license/" + user[9])
            .child("front")
            .getDownloadURL()
            .then(frontURL => {
              this.setState({
                frontURL
              });
            });
        });
    } else {
      alert('Error: No file selected');
      document.getElementById('cancelApplyDriverButton').disabled = false;
    }
  }

  // uploads back license pic
  handleUploadBack = () => {
    document.getElementById('cancelApplyDriverButton').disabled = true;
    var date = new Date;
    var m = date.getMonth();
    var d = date.getDate();
    var y = date.getFullYear();
    var today = new Date(y, m, d);

    const { image } = this.state;
    if (document.getElementById('file').value !== '') {
      const uploadTask = firebase.storage().ref().child(`license/${user[9]}/back`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({
            progress
          });
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          // Error function ...
          console.log(error);
        }, () => {
          // complete function ...
          document.getElementById('cancelApplyDriverButton').disabled = false;
          alert('Image is uploaded!')
          firebase.storage()
            .ref("license/" + user[9])
            .child("back")
            .getDownloadURL()
            .then(backURL => {
              this.setState({
                backURL
              });
            });

          const accountsRef = firebase.database().ref('driverDetails/' + user[9]);
          const driverDetails = {
            completed: "yes",
            dateApplied: today.toDateString()
          }

          accountsRef.update(driverDetails);
          alert('Your application has been submitted!');
          util.profilePageReset();
          util.cancelApplyDriver();
          checkDriverApplicationStatus();
        });
    } else {
      alert('Error: No file selected');
      document.getElementById('cancelApplyDriverButton').disabled = false;
    }
  }

  logout = () => {
      user[0] = '';
      user[1] = '';
      user[2] = '';
      user[3] = '';
      user[4] = '';
      user[5] = '';
      user[6] = '';
      user[7] = '';
      user[8] = '';
      user[9] = '';
      user[10] = '';
      user[11] = '';

      firebase.auth().signOut();
  }

render() {
  return (
    <View style={{ width: '100%',  justifyContent: "center", alignItems: "center" }}>
      <div id='acctPage'>
        <div id='accountPageCenter'>
          <div id='tblProfile' style={{ textAlign: 'center' }}>
            <h1>{this.state.firstName} {this.state.lastName}</h1>
            <div id='driverBadge' style={{ display: 'none' }}>SIMRide Driver</div>
            <div id='adminBadge' style={{ display: 'none' }}>SIMRide Admin</div>
            <br/>
            <table>
              <tr>
                <td><p class='profile'>Email:</p></td>
                <td><p class='profile'>&emsp;&emsp;{this.state.email}</p></td>
              </tr>
              <tr>
                <td><p class='profile'>Phone:</p></td>
                <td><p class='profile'>&emsp;&emsp;+65 {this.state.phone}</p></td>
              </tr>
              <tr>
                <td><p class='profile'>Rating:</p></td>
                <td><p class='profile'>&emsp;&emsp;{this.state.avgRating}</p></td>
              </tr>
            </table>
          </div>

          <div id='divEditProfile' style={{ display: 'none' }}>
            <h4>First Name</h4>
            <input id='editfName' placeholder={this.state.firstName} value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" />

            <h4>Last Name</h4>
            <input id='editlName' placeholder={this.state.lastName} value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" />

            <h4>Phone</h4>
            <input id='editPhone' placeholder={this.state.phone} value={this.state.phone} onChange={this.handleChange} type="phone" name="phone" />
          </div>
          
          <div id='tblPassword' style={{display: 'none'}}>
            <h4>New Password</h4>
            <input id='editNewPassword' value={this.state.newPassword} onChange={this.handleChange} type="password" name="newPassword" placeholder='New password' />

            <h4>Confirm Password</h4>
            <input id='editConfirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} type="password" name="confirmPassword" placeholder='Confirm password' />
          </div>

          <div id="tblApplyDriver" style={{display: 'none'}}>
            <div id='tblDriverDetails'>
              <h4>Carplate No.</h4>
              <input id='txtCarplate' value={this.state.carplate} placeholder="eg. SFG1234B" onChange={this.handleChange} type="text" name="carplate" placeholder='Carplate number' />

              <h4>Issue Date</h4>
              <input id='txtIssueDate' type="date" name="date"  />

              <h4>License No.</h4>
              <input id='txtLicenseNo' value={this.state.license} placeholder="eg. S1234567A" onChange={this.handleChange} type="text" name="license" placeholder='License number' />
            </div>

            <div id='tblDriverImage' style={{display: 'none'}}>
              <table>
                <tbody>
                  <tr id='uploadedFront'>
                    <td>
                      {this.state.frontURL && <img src={this.state.frontURL} height='150' width='200' />}
                    </td>
                    <td>
                      {this.state.backURL && <img src={this.state.backURL} height='150' width='200' />}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td id='td_license'>License Front:</td>
                    <td><input type="file" id='file' accept="image/*" onChange={this.handleImgChange} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
          <button id='submitDriverDetails' onClick={this.submitDriverDetails_Click} style={{display:'none'}}>Continue</button>
          <button id='btnImgFrontUpload' onClick={this.handleUploadFront} style={{display:'none'}}>Upload Front</button>
          <button id='btnImgBackUpload' onClick={this.handleUploadBack} style={{display:'none'}}>Upload Back</button>
          <button id='cancelApplyDriverButton' onClick={util.cancelApplyDriver} style={{display:'none'}}>Cancel</button>
          <button id='editButton' onClick={this.editProfile}>Edit Profile</button>
          <button id='changePasswordButton' onClick={util.changePassword}>Change Password</button>
          <button id='submitEditButton' onClick={this.submitEditProfile_Click} style={{display:'none'}}>Update</button>
          <button id='cancelEditButton' onClick={cancelEditProfile} style={{display:'none'}}>Cancel</button>
          <button id='submitPasswordButton' onClick={this.submitPassword_Click} style={{display:'none'}}>Update</button>
          <button id='cancelPasswordButton' onClick={cancelPassword} style={{ display: 'none' }}>Cancel</button>
          <div>
          <button id='btnApplyDriver' onClick={util.applyDriver} style={{ display: 'none' }}>Apply to be a driver</button>            
          </div>
          <br />
          <button id='btnLogout' onClick={this.logout}>Logout</button>
        </div>
      </div>
    </View>
    );
  }
}

export default Account;