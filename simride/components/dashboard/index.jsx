/* eslint-disable no-alert */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

import firebase from '../../../base';
import 'firebase/firestore';
import "firebase/storage";
import React from 'react';
import { View } from 'react-native';
import { approveApplicant } from './approveApplicant'
import { back } from './back'
import { banUser } from './banUser'
import { unBanUser } from './unBanUser'
import { checkEmailDashboard, user } from './checkEmailDashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isMounted: false,
      frontURL: null,
      backURL: null,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      isDriver: '',
      isAdmin: '',
      wallet: '',
      id: '',
      rating: '',
      ratedBy: '',
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }, (() => {
      console.log("MOUNTED: " + this.state.isMounted);
    }));
    checkEmailDashboard();
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
          }, () => {
              if (this.state.isBanned === 'yes') {
                alert('Your account has been banned');
                firebase.auth().signOut();
              }
          })
        });
      })
  }

  componentWillUnmount() {
    this.setState({ isMounted: false }, (() => {
      console.log("MOUNTED: " + this.state.isMounted);
    }));
  }

  getAndLoadHttpUrl = async (driverID) => {
    if (this.state.isMounted === false) {
      const fref = firebase.storage().ref("license/" + driverID).child('front');
      fref.getDownloadURL().then(data => {
        front = data;
        this.setState({ frontURL: data }, alert(this.state.frontURL));
        this.setState({ loading: false });
      }).catch(error => {
        this.setState({ frontURL: '' });
        this.setState({ loading: false });
      });

      const bref = firebase.storage().ref("license/" + driverID).child('back');
      bref.getDownloadURL().then(data => {
        this.setState({ backURL: data });
        this.setState({ loading: false });
      }).catch(error => {
        this.setState({ backURL: '' });
        this.setState({ loading: false });
      });
    }
  }

  viewApplicant = (e) => {
    var driverID = e.target.parentElement.parentElement.parentElement.id;
    
    const database = firebase.database().ref('driverDetails').orderByChild('dateApplied');
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data) => {
          if (data.key === driverID) {
            let driverUname = data.val().driverUname;
            let dateApplied = data.val().dateApplied;
            let license = data.val().license;
            let issuedDate = data.val().issueDate;

            document.getElementById('td_ViewApplicant_driverID').innerHTML = data.key;
            document.getElementById('td_ViewApplicant_username').innerHTML = driverUname;
            document.getElementById('td_ViewApplicant_dateApplied').innerHTML = dateApplied;
            document.getElementById('td_ViewApplicant_license').innerHTML = license;
            document.getElementById('td_ViewApplicant_issuedDate').innerHTML = issuedDate;
          }
        });
      }
    });

    firebase.storage()
      .ref("license/" + driverID)
      .child("front")
      .getDownloadURL()
      .then(frontURL => {
        this.setState({
          frontURL
        });
      }).catch(() => {
        alert('Front image could not be loaded')
      });

    firebase.storage()
      .ref("license/" + driverID)
      .child("back")
      .getDownloadURL()
      .then(backURL => {
        this.setState({
          backURL
        });
      }).catch(() => {
        alert('Back image could not be loaded')
      });

    //this.getAndLoadHttpUrl(driverID);

    document.getElementById('div_ViewApplicant').style.display = "block";
    document.getElementById('div_ViewReportedUser').style.display = "none";
    document.getElementById('div_driverApplication').style.display = "none";
    document.getElementById('div_ReportedUsers').style.display = "none";
  }

render() {
    return (
      <View style={{ width: '100%', justifyContent: "center", alignItems: "center" }}>
        <div id='homePage'>
          <div>
            <h1>{"Ready for a ride, " + this.state.username + "?"}</h1>
          </div>
          <div id="adminDB" style={{display: 'none'}}>
            <div id="div_driverApplication">
              <h4>Notifications</h4>
              <div id="tb_AdminNotifications"></div>
              <br />
              <h4>Driver Applicants List</h4>
              <div id="tb_driverApplication">
              <br />
            </div>
            </div>
            <br />
            <div id='div_ReportedUsers'>
              <h4>Reported User List</h4>
              <div id="tb_ReportedUsers">
              </div>
            </div>

            <div id='div_ViewApplicant' style={{display: 'none'}}>
              <div id="tbl_ViewApplicant">
                  <div id='uploadedFront'>
                    <div>
                      {this.state.frontURL && <img src={this.state.frontURL} height='150' width='200' />}
                    </div>
                    <div>
                      {this.state.backURL && <img src={this.state.backURL} height='150' width='200' />}
                    </div>
                    <br />
                    <div>
                      <h4>Driver ID:</h4>
                      <div id='td_ViewApplicant_driverID'></div>
                    </div>
                    <br />

                    <div>
                      <h4>Username:</h4>
                      <div id='td_ViewApplicant_username'></div>
                    </div>
                    <br />

                    <div>
                      <h4>Date Applied:</h4>
                      <div id='td_ViewApplicant_dateApplied'></div>
                    </div>
                    <br />

                    <div>
                      <h4>License no:</h4>
                      <div id='td_ViewApplicant_license'></div>
                    </div>
                    <br />

                    <div>
                      <h4>License Issued:</h4>
                      <div id='td_ViewApplicant_issuedDate'></div>
                    </div>
                  </div>
              </div>
              <br />
              <button onClick={ approveApplicant }>Approve Applicant</button>
              <button onClick={ back }>Back</button>
            </div>

            <div id='div_ViewReportedUser' style={{display: 'none'}}>
              <div id="tbl_ViewReportedUser">
                <div>
                  <h4>User ID:</h4>
                  <div id='td_ViewReportedUser_userID'></div>
                </div>
                <br />
                <div>
                  <h4>Username:</h4>
                  <div id='td_ViewReportedUser_username'></div>
                </div>
                <br />
                <div>
                  <h4>Status:</h4>
                  <div id='td_ViewReportedUser_status'></div>
                </div>
                <br />
                <div>
                  <h4>Last Reported Date:</h4>
                  <div id='td_ViewReportedUser_lastreport'></div>
                </div>
                <br />
                <div>
                  <h4>No Show:</h4>
                  <div id='td_ViewReportedUser_noshow'></div>
                </div>
                <br />
                <div>
                  <h4>Fake Profile:</h4>
                  <div id='td_ViewReportedUser_fakeprofile'></div>
                </div>
                <br />
                <div>
                  <h4>Threatened Safety:</h4>
                  <div id='td_ViewReportedUser_safety'></div>
                </div>
                <br />
                <div>
                  <h4>Inappropriate Behaviour:</h4>
                  <div id='td_ViewReportedUser_inappropriate'></div>
                </div>
                <br />
                <div>
                  <h4>Uncivil, Rude or Vulgar:</h4>
                  <div id='td_ViewReportedUser_vulgar'></div>
                </div>
              </div>
              <br />
              <button id="btnBanUser" onClick={ banUser }>Ban User</button>
              <button id="btnUnBanUser" onClick={ unBanUser }>Un-Ban User</button>
              <button onClick={ back }>Back</button>
            </div>
          </div>

          <div id="driverDB" style={{display: 'none'}}>
            <div id='div_DriverNotifications'>
              <h4>Notifications</h4>
              <div id="tb_DriverNotifications"></div>
              <br />
            </div>
            <div id='div_DriverUpcomingRides'>
              <h4>Upcoming Rides</h4>
              <div id="tb_DriverUpcomingRides"></div>
              <br />
            </div>
            <div id='div_DriverUpcomingDrives'>
              <h4>Upcoming Drives</h4>
              <div id="tb_DriverUpcomingDrives"></div>
              <br />
            </div>
          </div>

          <div id="riderDB" style={{display: 'none'}}>
            <div id='div_RiderNotifications'>
              <h4>Notifications</h4>
              <div id="tb_RiderNotifications"></div>
              <br />
            </div>
            <h4>Upcoming Rides</h4>
            <div id='div_RiderUpcomingRides'>
              <div id="tb_RiderUpcomingRides"></div>
              <br />
            </div>
          </div>
        </div>
      </View>
      );
    }
  }

export default Dashboard;
