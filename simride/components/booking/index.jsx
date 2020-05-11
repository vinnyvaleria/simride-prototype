//import 'react-google-places-autocomplete/dist/index.min.css';
import 'firebase/firestore';
import firebase from '../../../base';
import React from 'react';
import { View } from 'react-native';
import * as Datetime from "react-datetime";
import { GoogleApiWrapper } from "google-maps-react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import {cancelBooking} from './cancelBooking';
import {checkEmail, user} from './checkEmail'
import {confirmRemovePassenger} from './confirmRemovePassenger';
import {createBooking} from './createBooking';
import {deleteBooking} from './deleteBooking';
import {extendJoinBooking} from './extendJoinBooking';
import {joinBooking} from './joinBooking';
import {removePassenger} from './removePassenger';
import {showRecurring} from './showRecurring';
import {submitCreateBooking} from './submitCreateBooking';
import {valid} from './valid';
// import {viewPastBooking} from './viewPastBooking';
import {viewMyBookings} from './viewMyBookings';
import {viewAllBookings} from './viewAllBookings'
import {filterChange} from './filterChange'
import {viewBooking} from './viewBooking';
import Rating from '../rating';

import * as moment from 'moment';
import Map from '../maps/map';
import 'react-google-places-autocomplete/dist/index.min.css';

class Booking extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.onChange = this.onChange.bind(this);
      this.state = {
          currPassengers: '',
          payMethod: '',
          date: Datetime.moment(),
          postal: '',
          removeReason: '',
          recurringWeeks: 1,
          createArea: 'Admiralty',
          createTowards: 'School',
          createMaxPassengers: '1',
          bookingID: ''
      }
  }

  // goes back to login page if stumble upon another page by accident without logging in
  componentDidMount() {
    checkEmail();
  }

  onChange(date) {
    this.setState({
        date: date
    })
  }

  // handles change
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  joinBooking_click = () => {
    joinBooking(this.state.postal);

    this.state = {
      currPassengers: '',
      payMethod: ''
    };
  }

  submitCreateBooking_click = () => {
    submitCreateBooking(this.state.date, this.state.createArea, this.state.createMaxPassengers, this.state.createTowards, this.state.recurringWeeks);
    this.state = {
      date: Datetime.moment(),
      recurringWeeks: 1
    };
  }

  viewCreatedBooking = () => {
    let userDetails = [];
    document.getElementById('tb_CreatedBookings').innerHTML = '';
    document.getElementById('div_availBookings').style.display = "none";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "none";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "block";
    document.getElementById('btnSubmitJoinBooking').style.display = "none";
    document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";

    // get all accounts
    firebase.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        let i = 0;
        snapshot.forEach((child) => {
          userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
          i++;
        })
      });

    const database = firebase.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let content = '';
        let rowCount = 0;
        snapshot.forEach((data) => {
          if (data.val().driverID === user[9] && data.val().completed === 'no') {
            let area = data.val().area;
            let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
            let ppl = [];

            if (data.val().currPassengers !== "") {
              ppl = data.val().currPassengers.split(',')
            }

            let passengers = ppl.length + "/" + data.val().maxPassengers;
            let id = data.val().driverID;
            let driver = '';

            for (let i = 0; i < userDetails.length; i++) {
              let key = [];
              key = userDetails[i].split(':');
              if (key[0] === id) {
                driver = key[1];
              }
            }

            content += '<tr id=\'' + data.key + '\'>';
            content += '<td>' + area + '</td>'; //column1
            content += '<td>' + date + '</td>'; //column2
            content += '<td>' + driver + '</td>';
            content += '<td>' + passengers + '</td>';
            content += '<td id=\'btnViewCreatedBooking' + rowCount + '\'></td>';
            content += '<td id=\'btnStartCreatedBooking' + rowCount + '\'></td>';
            content += '</tr>';

            rowCount++;
          }
        });

        document.getElementById('tb_CreatedBookings').innerHTML += content;

        for (let v = 0; v < rowCount; v++) {
          let view = document.createElement('input');
          view.setAttribute('type', 'button')
          view.setAttribute('value', 'View');
          view.onclick = viewBooking;
          document.getElementById('btnViewCreatedBooking' + v).appendChild(view);

          let start = document.createElement('input');
          start.setAttribute('type', 'button')
          start.setAttribute('value', 'Start');
          start.onclick = this.startBooking;
          document.getElementById('btnStartCreatedBooking' + v).appendChild(start);
        }
      }
    });
  }

  viewPastBooking = () => {
    let userDetails = [];
    document.getElementById('tb_myBookings').innerHTML = '';
    document.getElementById('tbl_MyBookings').style.display = 'block';
    document.getElementById('showRating').style.display = 'none';

    document.getElementById('div_availBookings').style.display = "none";
    document.getElementById('div_createBooking').style.display = "none";
    document.getElementById('div_myBookings').style.display = "block";
    document.getElementById('div_viewSelectedBooking').style.display = "none";
    document.getElementById('div_viewCreatedBooking').style.display = "none";
    document.getElementById('btnSubmitJoinBooking').style.display = "none";
    document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";

    // get all accounts
    firebase.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        let i = 0;
        snapshot.forEach((child) => {
          userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
          i++;
        })
      });

    const database = firebase.database().ref('bookings').orderByChild('date');
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let content = '';
        let rowCount = 0;
        snapshot.forEach((data) => {
          if (data.val().currPassengers !== "") {
            if ((data.val().currPassengers.includes(user[2]) || data.val().driverID === user[9]) && data.val().completed === 'yes') {
              let area = data.val().area;
              let date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
              let ppl = [];

              if (data.val().currPassengers !== "") {
                ppl = data.val().currPassengers.split(',')
              }

              let passengers = ppl.length + "/" + data.val().maxPassengers;
              let id = data.val().driverID;
              let driver = '';

              for (let i = 0; i < userDetails.length; i++) {
                let key = [];
                key = userDetails[i].split(':');
                if (key[0] === id) {
                  driver = key[1];
                }
              }

              content += '<tr id=\'' + data.key + '\'>';
              content += '<td>' + area + '</td>'; //column1
              content += '<td>' + date + '</td>'; //column2
              content += '<td>' + driver + '</td>';
              content += '<td>' + passengers + '</td>';
              content += '<td id=\'btnViewMyBooking' + rowCount + '\'></td>';
              content += '<td id=\'btnRate' + rowCount + '\'></td>';
              content += '</tr>';

              rowCount++;
            }
          }
        });

        document.getElementById('tb_myBookings').innerHTML += content;

        for (let v = 0; v < rowCount; v++) {
          let btn = document.createElement('input');
          btn.setAttribute('type', 'button')
          btn.setAttribute('value', 'View');
          btn.onclick = viewBooking;
          document.getElementById('btnViewMyBooking' + v).appendChild(btn);

          let rate = document.createElement('input');
          rate.setAttribute('type', 'button')
          rate.setAttribute('value', 'Rate');
          rate.onclick = this.rateUsers;
          document.getElementById('btnRate' + v).appendChild(rate);
        }
      }
    });
  }

  startBooking = (e) => {
    this.setState({ bookingID: e.target.parentElement.parentElement.id});

    document.getElementById('bookPage').style.display = 'none';
    document.getElementById('maps').style.display = 'block';
  }

  rateUsers = (e) => {
    this.setState({ bookingID: e.target.parentElement.parentElement.id });
    
    document.getElementById('tbl_MyBookings').style.display = 'none';
    document.getElementById('showRating').style.display = 'block';
  }

  confirmRemovePassenger_click = () => {
    confirmRemovePassenger(this.state.removeReason);

    this.state = {
      currPassengers: '',
      payMethod: '',
      removeReason: '',
      date: Datetime.moment()
    };
  }

  cancelBooking_click = () => {
    cancelBooking();
    this.state = {
      currPassengers: '',
      payMethod: ''
    };
  }

render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div id='bookPage'>
          <div>
            <button id='btnViewAllBookings' onClick={ viewAllBookings }>View All Rides</button>
            <button id='btnViewMyBookings' onClick={ viewMyBookings }>View My Rides</button>
            <button id='btnCreateBooking' onClick={ createBooking }>Create A Ride</button>
            <button id='btnViewCreatedBooking' onClick={ this.viewCreatedBooking }>View My Created Rides</button>
            <button id='btnViewPastBooking' onClick={this.viewPastBooking}>View Past Rides</button>
            <br />
            <br />
          </div>

          <div id='div_myBookings' style={{display: 'none'}}>
            <table id="tbl_MyBookings">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Date & Time</th>
                  <th>Driver</th>
                  <th>No. of Passengers</th>
                </tr>
              </thead>
              <tbody id="tb_myBookings"></tbody>
            </table>
            <div id='showRating' style={{ display: 'none' }}>
              <Rating bookingID={this.state.bookingID} />
            </div>
          </div>

          <div id='div_viewCreatedBooking' style={{display: 'none'}}>
            <table id="tbl_CreatedBookings">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Date & Time</th>
                  <th>Driver</th>
                  <th>No. of Passengers</th>
                </tr>
              </thead>
              <tbody id="tb_CreatedBookings"></tbody>
            </table>
          </div>

          <div id='div_availBookings'>
            <select id="ddFilterArea" onChange={filterChange} style={{width: '5em'}} required>
              <option>All</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>Central</option>
            </select>  
            <br/>
            <br/>
            <table id="tbl_AllBookings">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Date & Time</th>
                  <th>Driver</th>
                  <th>No. of Passengers</th>
                </tr>
              </thead>
              <tbody id="tb_AllBookings"></tbody>
            </table>
          </div>

          <div id='div_viewSelectedBooking' style={{display: 'none'}}>
            <table id="tbl_AllBookings">
              <tbody>
                <tr>
                  <td>Booking ID:</td>
                  <td id='td_viewSelectedBooking_bookingID'></td>
                </tr>
                <tr>
                  <td>Driver Username:</td>
                  <td id='td_viewSelectedBooking_driverName'></td>
                </tr>
                <tr>
                  <td>Date & Time:</td>
                  <td id='td_viewSelectedBooking_date'></td>
                </tr>
                <tr>
                  <td>Area:</td>
                  <td id='td_viewSelectedBooking_area'></td>
                </tr>
                <tr>
                  <td>Going:</td>
                  <td id='td_viewSelectedBooking_towards'></td>
                </tr>
                <tr>
                  <td>Slots left:</td>
                  <td id='td_viewSelectedBooking_slotsLeft'></td>
                </tr>
                <tr id='tr_viewSelectedBooking_currPassengers'>
                  <td>Passengers:</td>
                  <td id='td_viewSelectedBooking_currPassengers'></td>
                </tr>
              </tbody>
            </table>
            <table id='tbl_viewSelectedBooking_ExtendBooking' style={{display: 'none'}}>
              <tbody>
                <tr>
                  <td>Postal Code of Meeting/Drop-Off Point:</td>
                  <td>
                    <GooglePlacesAutocomplete 
                      id='postal'
                      placeholder='Search address' 
                      onSelect={({ description }) => (
                        geocodeByAddress(description)
                          .then(results => getLatLng(results[0]))
                          .then(({
                            lat,
                            lng
                          }) => this.setState({
                            postal: description + ":" + lat + ":" + lng
                          }))
                          .catch(error => console.error(error))
                      )}
                      required 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Choose Payment Method:</td>
                  <td>
                    <select id='ddPayBy' required>
                      <option value="wallet">Pay by E-Wallet</option>
                      <option value="cash">Pay by cash</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <button id='btnJoinBooking' onClick={ extendJoinBooking }>Join Booking</button>
            <button id='btnSubmitJoinBooking' onClick={ this.joinBooking_click } style={{display: 'none'}}>Submit Booking</button>
            <button id='btnCancelBooking' onClick={ this.cancelBooking_click }>Cancel Booking</button>
            <button id='btnRemovePassenger' onClick={ removePassenger }>Remove Passenger</button>
            <button id='btnDeleteBooking' onClick={ deleteBooking }>Delete Booking</button>
            <table id='tbl_removePassengerExtend' style={{display: 'none'}}>
              <tbody>
                <tr>
                  <td>Choose a passenger to remove:</td>
                  <td><select id="ddRemovePassenger"></select></td>
                </tr>
                <tr>
                  <td>Reason for removing: </td>
                  <td><input id='txtRemoveReason' value={this.state.removeReason} onChange={this.handleChange} type="text" name="removeReason" required /></td>
                </tr>
              </tbody>
            </table>
            <br/>
            <button id='btnConfirmRemovePassenger' onClick={ this.confirmRemovePassenger_click } style={{display: 'none'}}>Confirm Remove Passenger</button>
          </div>

          <div id='div_createBooking' style={{display: 'none'}}>
            <table>
              <tbody>
                <tr>
                  <td>Driver ID</td>
                  <td><label id="driverID" /></td>
                </tr>
                <tr>
                  <td>Date & Time</td>
                  <Datetime isValidDate={valid} locale="en-sg" id='datepicker' onChange={this.onChange} value={this.state.date} required />
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    <select id="ddArea" style={{width: '13em'}} name='createArea' onChange={this.handleChange} required ></select>
                  </td>
                </tr>
                <tr>
                  <td>Where are you going?</td>
                  <td>
                    <select id="ddTowards" name='createTowards' onChange={this.handleChange} required >
                      <option value="School">School</option>
                      <option value="Home">Home</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>No. of Passengers</td>
                  <td>
                    <select id="ddPassengers" name='createMaxPassengers' onChange={this.handleChange} required >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Recurring?</td>
                  <td>
                    <input type='checkbox' id='cbRecurring' onChange={showRecurring} />
                  </td>
                </tr>
                </tbody>
            </table>
            <table id='tr_showRecurring' style={{display:'none'}}>
              <tbody>
                <tr>
                  <td>No. of weeks&emsp;&emsp;&emsp;&nbsp;&nbsp;</td>
                  <td>
                    <input type='number' id='txtRecurringWeeks' name='recurringWeeks' value={this.state.recurringWeeks} onChange={this.handleChange} required />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div style={{textAlign: 'center'}}>
              <button onClick={this.submitCreateBooking_click}>Submit</button>
              <button onClick={viewAllBookings} style={{marginLeft: '25px'}}>Cancel</button>
            </div>
          </div>
        </div>
        <div id='maps' style={{ display: 'none' }}>
          <Map bookingID={this.state.bookingID} />
        </div>
      </View>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: "AIzaSyARHBw1DzEQDE0auV06gUQRI8iNUKmwHaY",
  libraries: ["places"]
})(Booking);