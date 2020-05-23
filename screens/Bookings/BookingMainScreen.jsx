import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import * as moment from 'moment';

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

export default class BookingMainScreen extends React.Component {
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
      checkDriverStatus: []
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
    this.checkDriverStatus();
    this.loadAllBookings();
  }

  // handles image change
  handleImgChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
        image
      }));
    }
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

  loadAllBookings = () => {
    fire.database().ref('accounts')
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        var i = 0;
        snapshot.forEach((child) => {
          userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
          i++;
        })
      }).then(() => {
        const database = fire.database().ref('bookings').orderByChild('date').startAt(Date.now());
        database.on('value', (snapshot) => {
          if (snapshot.exists()) {
            let content = '';
            let rowCount = 0;
            snapshot.forEach((data) => {
              if (data.val().date > moment.now()) {
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

                area.replace('$ ', '');
                this.displayPrevBooking(driver, area, date, passengers);
                rowCount++;
              }
            });
          }
        }
      );
    });
  }

  checkDriverStatus = () => {
    schedulebutton.push(
      <SubmitButton 
        title='Schedule ride' 
        onPress={() => {{this.props.navigation.navigate('Schedule a Ride')}}} 
      />
    )

    this.setState({
      checkDriverStatus: schedulebutton
    })
  }

  displayPrevBooking = (label, area, date, passenger) => {
    prevBooking.push(<BookingBox label={label} area={area} date={date} passenger={passenger} icon={icon} />)
    this.setState({
      displayPrevBooking: prevBooking
    })
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <View style={pageStyle.equalspace}>
              <SubmitButton 
                title='my bookings' 
                onPress={() => {this.props.navigation.navigate('View My Bookings')}} 
              />
              {(this.state.isDriver === 'yes') ? this.state.checkDriverStatus : null}
              </View>
            </View>
          <View style={pageStyle.wrapper}>
            <Text style={pageStyle.header}>Available Rides</Text>
            {this.state.displayPrevBooking}
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

