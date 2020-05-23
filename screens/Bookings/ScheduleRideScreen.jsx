import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Picker,
  CheckBox
} from 'react-native';
import * as Datetime from 'react-datetime';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';
import icon from '../../assets/images/confirm-bookings.png';

export default class ScheduleRideScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      currPassengers: '',
      payMethod: '',
      date: Datetime.moment(),
      postal: '',
      removeReason: '',
      recurringWeeks: 1,
      createArea: 'Admiralty',
      createTowards: 'School',
      createMaxPassengers: '1',
      bookingID: '',
      ddArea: [],
      selectArea: '',
      selectTowards: '',
      selectRecurring: '',
      selectPassengers: ''
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.bindArea();
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
          });
      });
    })
    this.setState({ binded: true });
  }

  bindArea = () => {
    let newarea = [];
    const database = fire.database().ref().child('admin/area');
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          let ar = [];
          ar = child.val().split(',');
          newarea.push(<Picker.Item label={ar[0]} value={ar[0]} />);
        });
        this.setState({
          ddArea: newarea
        });
      }
    });
  }

  valid = (current) => {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  // submits created booking into realtime db
  submitCreateBooking = (e) => {
    // checks for duplicate booking
    let dates = [];
    let check = false;
    const database = fire.database().ref('bookings').orderByChild('date').startAt(Date.now());
    database.once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((data) => {
          if (data.val().driverID === this.state.id) {
            dates.push(data.val().date);
          }
        });
      }
    }).then(() => {
      var i = 0;
      if (dates.length === 0) {
        check = true;
      }
      else {
        while (i < dates.length) {
          if (this.state.date < moment.unix(dates[i] / 1000).add(2, 'hours') && this.state.date > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
            alert("You have another booking set 2 hours before/after this time");
            check = false;
            break;
          } else {
            check = true;
          }
          i++;
        }

        if (check) {
          const date = new Date(this.state.date);
          const weeks = this.state.selectRecurring;
          let x = 0;
          const bookingsRef = fire.database().ref('bookings');
          while (x < weeks) {
            const booking = {
              driverID: this.state.id,
              date: date.setDate(date.getDate() + (7 * x)),
              area: this.state.selectArea,
              maxPassengers: this.state.selectPassengers,
              currPassengers: '',
              payMethod: '',
              postal: '',
              towards: this.state.selectTowards
            }

            console.log(booking)
            //bookingsRef.push(booking);
            x++;
          }
          
          this.state = {
            date: Datetime.moment()
          };
        }
      }
    });
  }

  showRecurring = () => {
    if (this.state.checked === true) {
      document.getElementById('txtRecurringWeeks').style.display = 'block';
    }
    else {
      document.getElementById('txtRecurringWeeks').style.display = 'none';
    }
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>

            <Text style={pageStyle.header}>Driver ID</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your first name' 
              value={this.state.id}
              editable='false'
            />

            <Text style={pageStyle.header}>Date & Time</Text>
            <Datetime 
              isValidDate={this.valid} 
              locale="en-sg" 
              id='datepicker' 
              onChange={this.onChange} 
              value={this.state.date} 
              required 
            />

            <Text style={pageStyle.header}>Area</Text>
            <Picker onValueChange={(selectArea) => this.setState({ selectArea })}>
              {this.state.ddArea}
            </Picker>

            <Text style={pageStyle.header}>Where are you going?</Text>
            <Picker onValueChange={(selectTowards) => this.setState({ selectTowards })}>
              <Picker.Item label="Home" value="Home" />
              <Picker.Item label="School" value="School" />
            </Picker>

            <Text style={pageStyle.header}>No. of Passengers</Text>
            <Picker onValueChange={(selectPassengers) => this.setState({ selectPassengers })}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
            </Picker>

            <Text style={pageStyle.header}>Recurring? (No. of weeks)</Text>
            <Picker onValueChange={(selectRecurring) => this.setState({ selectRecurring })}>
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </Picker>
          
            <View style={pageStyle.equalspace}>
              <SubmitButton title='Submit' onPress={() => { this.submitBookingCreated }} />
              <SubmitButton title='Cancel' onPress={() => {this.props.navigation.navigate('Bookings')}} />
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

