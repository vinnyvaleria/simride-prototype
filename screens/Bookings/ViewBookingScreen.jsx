import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import * as moment from 'moment';
import {bookingID} from './BookingMainScreen';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton, BookingBox } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';
import icon from '../../assets/images/all-bookings.png';

var prevBooking = [];
var userDetails = [];
var schedulebutton =[]

let Driver;
let Area;
let DateTime;
let Going; 
let Slots;
let Passengers;

export default class ViewBookingScreen extends React.Component {
  constructor (props) {
    super(props);
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
        id: '',
        image: null,
        frontURL: '',
        backURL: '',
        progress: 0,
        license: '',
        carplate: '',
        status: '',
        dateApplied: '',
        binded: false,
        displayPrevBooking: [],
        checkDriverStatus: [],
        bookingArea: '',
        bookingDate: '',
        bookingDriver: '',
        bookingTowards: '',
        bookingLeft: '',
        bookingPassengers:'',
        bookingID: ''
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.loadBooking();
  }

  // bind user data
  bindUserData = () => {
    const accountsRef = fire.database().ref('accounts');
    accountsRef
      .orderByChild('email')
      .equalTo(user[3])
      .on('value', snapshot => {
        snapshot.forEach((child) => {
          user[0] = child.val().fname;
          user[1] = child.val().lname;
          user[2] = child.val().uname;
          user[4] = child.val().phone;
          user[5] = child.val().isDriver;
          user[6] = child.val().isAdmin;
          user[7] = child.val().isBanned;
          user[8] = child.val().wallet;
          user[9] = child.key;
          user[10] = child.val().rating;
          user[11] = child.val().ratedBy;

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
          })
      });
    })
    this.setState({ binded: true });
  }

  loadBooking = () => {
      const database = fire.database().ref('bookings').orderByChild('date').startAt(Date.now());
      database.on('value', (snapshot) => {
          if (snapshot.exists()) {
              snapshot.forEach((data) => {
                  if (data.key === bookingID) {
                      let ppl = [];

                      if (data.val().currPassengers !== "") {
                          ppl = data.val().currPassengers.split(',')
                      }

                      const driverID = data.val().driverID;
                      let username;
                      let passengers = ppl.length + "/" + data.val().maxPassengers;
                      const user = fire.database().ref('accounts').orderByChild('uname');
                      user.once('value', (snapshot) => {
                        if (snapshot.exists()) {
                            snapshot.forEach((userdata) => {
                                if (userdata.key === driverID) {
                                    username = userdata.val().uname

                                    this.setState({
                                        bookingArea: data.val().area,
                                        bookingDate: moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a"),
                                        bookingPassengers: ppl,
                                        bookingTowards: data.val().towards,
                                        bookingDriver: username,
                                        bookingID: bookingID,
                                        bookingLeft: passengers
                                    }, function () {
                                        Area = this.state.bookingArea;
                                        DateTime = this.state.bookingDate;
                                        Going = this.state.bookingTowards;
                                        Slots = this.state.bookingLeft;
                                        Driver = this.state.bookingDriver;
                                        Passengers = data.val().currPassengers
                                    }
                                    )
                                }
                            })
                        }
                      }) 
                  }
              });
          }
      });
  }

  render () {
    if (this.state.binded) {
      return (
          <ScrollView style={screenStyle}>
              <View style={pageStyle.wrapper}>
                  <Text style={pageStyle.header}>Booking ID</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingID}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Driver Username</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingDriver}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Date & Time</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingDate}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Area</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingArea}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Going Towards</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingTowards}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Slots Left</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingLeft}
                      editable='false'
                  />

                  <Text style={pageStyle.header}>Passengers</Text>
                  <TextInput
                      style={pageStyle.textinput}
                      value={this.state.bookingPassengers}
                      editable='false'
                  />

                  <View style={pageStyle.equalspace}>
                      <SubmitButton title='Join' onPress={() => { this.props.navigation.navigate('Join Booking') }} />
                      <SubmitButton title='Cancel' onPress={() => { this.props.navigation.navigate('Bookings') }} />
                  </View>
              </View>
          </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

export {bookingID, Slots, Driver, Area, DateTime, Going, Passengers}