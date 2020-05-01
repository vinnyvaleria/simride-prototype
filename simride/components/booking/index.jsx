import React from 'react';
import { View } from 'react-native';
import 'firebase/firestore';
import * as Datetime from "react-datetime";
import { GoogleApiWrapper } from "google-maps-react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

import {cancelBooking} from './cancelBooking';
import {checkEmail} from './checkEmail'
import {confirmRemovePassenger} from './confirmRemovePassenger';
import {createBooking} from './createBooking';
import {deleteBooking} from './deleteBooking';
import {extendJoinBooking} from './extendJoinBooking';
import {filterChange} from './filterChange';
import {joinBooking} from './joinBooking';
import {removePassenger} from './removePassenger';
import {showRecurring} from './showRecurring';
import {submitCreateBooking} from './submitCreateBooking';
import {valid} from './valid';
import {viewAllBookings} from './viewAllBookings';
import {viewCreatedBooking} from './viewCreatedBooking';
import {viewMyBookings} from './viewMyBookings';

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
            createMaxPassengers: '1'
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
        //alert(this.state.createMaxPassengers);
    }

render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <div id='bookPage'>
          <div>
            <button id='btnViewAllBookings' onClick={ viewAllBookings }>View All Rides</button>
            <button id='btnViewMyBookings' onClick={ viewMyBookings }>View My Rides</button>
            <button id='btnCreateBooking' onClick={ createBooking }>Create A Ride</button>
            <button id='btnViewCreatedBooking' onClick={ viewCreatedBooking }>View My Created Rides</button>
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
                      placeholder='Search' 
                      onSelect={({ description }) => (
                        this.setState({ postal: description })
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
            <button id='btnSubmitJoinBooking' onClick={ joinBooking } style={{display: 'none'}}>Submit Booking</button>
            <button id='btnCancelBooking' onClick={ cancelBooking }>Cancel Booking</button>
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
            <button id='btnConfirmRemovePassenger' onClick={ confirmRemovePassenger } style={{display: 'none'}}>Confirm Remove Passenger</button>
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
              <button onClick={submitCreateBooking}>Submit</button>
              <button onClick={viewAllBookings} style={{marginLeft: '25px'}}>Cancel</button>
            </div>
          </div>
        </div>
      </View>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: "AIzaSyARHBw1DzEQDE0auV06gUQRI8iNUKmwHaY",
  libraries: ["places"]
})(Booking);