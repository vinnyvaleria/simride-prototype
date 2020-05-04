/* eslint-disable no-alert */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */

import 'firebase/firestore';
import React from 'react';
import { View } from 'react-native';
import { approveApplicant } from './approveApplicant'
import { back } from './back'
import { banUser } from './banUser'
import { unBanUser } from './unBanUser'
import { checkEmailDashboard, user } from './checkEmailDashboard'
import { frontimg, backimg } from './viewApplicant'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frontURL: frontimg,
            backURL: backimg
        };
    }

    componentWillMount() {
      checkEmailDashboard();
    }

render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div id='homePage'>
          <div>
            <h1>{"Ready for a ride, " + user[2] + "?"}</h1>
          </div>
          <div id="adminDB" style={{display: 'none'}}>
            <div id="div_driverApplication">
              <h4>Notifications</h4>
              <table>
                <tbody id="tb_AdminNotifications"></tbody>
              </table>
              <h4>Driver Applicants List</h4>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date Applied</th>
                  </tr>
                </thead>
                <tbody id="tb_driverApplication">
                </tbody>
              </table>
            </div>

            <div id='div_ReportedUsers'>
              <h4>Reported User List</h4>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Latest Reported Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="tb_ReportedUsers">
                </tbody>
              </table>
            </div>

            <div id='div_ViewApplicant' style={{display: 'none'}}>
              <table id="tbl_ViewApplicant">
                <tbody>
                  <tr id='uploadedFront'>
                    <td>
                      {this.state.frontURL && <img src={this.state.frontURL} onLoad={alert(this.state.frontURL, frontimg)} height='150' width='200' />}
                    </td>
                    <td>
                      {this.state.backURL && <img src={this.state.backURL} height='150' width='200' />}
                    </td>
                  </tr>
                  <tr>
                    <td>Driver ID:</td>
                    <td id='td_ViewApplicant_driverID'></td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td id='td_ViewApplicant_username'></td>
                  </tr>
                  <tr>
                    <td>Date Applied:</td>
                    <td id='td_ViewApplicant_dateApplied'></td>
                  </tr>
                  <tr>
                    <td>License no:</td>
                    <td id='td_ViewApplicant_license'></td>
                  </tr>
                  <tr>
                    <td>License Issued:</td>
                    <td id='td_ViewApplicant_issuedDate'></td>
                  </tr>
                </tbody>
              </table>
              <br />
              <button onClick={ approveApplicant }>Approve Applicant</button>
              <button onClick={ back }>Back</button>
            </div>

            <div id='div_ViewReportedUser' style={{display: 'none'}}>
              <table id="tbl_ViewReportedUser">
                <tbody>
                  <tr>
                    <td>User ID:</td>
                    <td id='td_ViewReportedUser_userID'></td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td id='td_ViewReportedUser_username'></td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td id='td_ViewReportedUser_status'></td>
                  </tr>
                  <tr>
                    <td>Last Reported Date:</td>
                    <td id='td_ViewReportedUser_lastreport'></td>
                  </tr>
                  <tr>
                    <td>Fake Profile:</td>
                    <td id='td_ViewReportedUser_fakeprofile'></td>
                  </tr>
                  <tr>
                    <td>Threatened Safety:</td>
                    <td id='td_ViewReportedUser_safety'></td>
                  </tr>
                  <tr>
                    <td>Inappropriate Behaviour:</td>
                    <td id='td_ViewReportedUser_inappropriate'></td>
                  </tr>
                  <tr>
                    <td>Uncivil, Rude or Vulgar:</td>
                    <td id='td_ViewReportedUser_vulgar'></td>
                  </tr>
                </tbody>
              </table>
              <br />
              <button id="btnBanUser" onClick={ banUser }>Ban User</button>
              <button id="btnUnBanUser" onClick={ unBanUser }>Un-Ban User</button>
              <button onClick={ back }>Back</button>
            </div>
          </div>

          <div id="driverDB" style={{display: 'none'}}>
            <div id='div_DriverNotifications'>
              <h4>Notifications</h4>
              <table>
                <tbody id="tb_DriverNotifications"></tbody>
              </table>
            </div>
            <div id='div_DriverUpcomingRides'>
              <h4>Upcoming Rides</h4>
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Date & Time</th>
                    <th>Driver</th>
                    <th>No. of Passengers</th>
                  </tr>
                </thead>
                <tbody id="tb_DriverUpcomingRides"></tbody>
              </table>
            </div>
            <div id='div_DriverUpcomingDrives'>
              <h4>Upcoming Drives</h4>
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Date & Time</th>
                    <th>Driver</th>
                    <th>No. of Passengers</th>
                  </tr>
                </thead>
                <tbody id="tb_DriverUpcomingDrives"></tbody>
              </table>
            </div>
          </div>

          <div id="riderDB" style={{display: 'none'}}>
            <div id='div_RiderNotifications'>
              <h4>Notifications</h4>
              <table>
                <tbody id="tb_RiderNotifications"></tbody>
              </table>
            </div>
            <h4>Upcoming Rides</h4>
            <div id='div_RiderUpcomingRides'>
              <table>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Date & Time</th>
                    <th>Driver</th>
                    <th>No. of Passengers</th>
                  </tr>
                </thead>
                <tbody id="tb_RiderUpcomingRides"></tbody>
              </table>
            </div>
          </div>
        </div>
      </View>
      );
    }
  }

export default Dashboard;
