import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert,
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

export default class MyBookingsScreen extends React.Component {
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
    this.loadAllBookings();
    this.checkDriverStatus();
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
            let rowCount = 0;
            snapshot.forEach((data) => {
              if (data.val().date > moment.now()) {
                const area = data.val().area;
                const date = moment.unix(data.val().date / 1000).format("DD MMM YYYY hh:mm a");
                const ppl = [];

                if (data.val().currPassengers !== "") {
                  ppl = data.val().currPassengers.split(',')
                }

                const passengers = ppl.length + "/" + data.val().maxPassengers;
                const id = data.val().driverID;
                const driver = '';

                for (let i = 0; i < userDetails.length; i++) {
                  const key = [];
                  console.log(key);
                  key = userDetails[i].split(':');
                  if (key[0] === id) {
                    driver = key[1];
                  }
                }

                area.replace('$ ', '');
                this.displayPrevBooking(driver, area, date, passengers, key);
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
        title='Schedule a new ride' 
        onPress={() => {{this.props.navigation.navigate('Schedule a Ride')}}} 
      />
    )

    this.setState({
      checkDriverStatus: schedulebutton
    })
  }

  displayPrevBooking = (label, area, date, passenger, key) => {
    prevBooking.push(<BookingBox 
      label={label} 
      area={area} 
      date={date} 
      passenger={passenger} 
      icon={icon} 
      key={key} 
      onPress={this.alertConfirmBooking}
    />)
    this.setState({
      displayPrevBooking: prevBooking
    })
  }

  alertConfirmBooking = () => {
    Alert.alert (
      'Are you sure you want to book this ride?',
      'You may not cancel once joined',
      [
        {
          text: 'Yes, I am sure',
          onPress: this.joinBooking,
        },
        {
          text: 'No, cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { cancelable: false }
      ]
    )
  }

  joinBooking = () => {
    const bookingID = document.getElementById('td_viewSelectedBooking_bookingID').innerHTML;
    let currPassengers = document.getElementById('td_viewSelectedBooking_currPassengers').innerHTML;
    let bookingDate = document.getElementById('td_viewSelectedBooking_date').innerHTML;
    let PostalCode;
    let payMethod;

    const database = fire.database().ref('bookings');
    database.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.key === bookingID) {
                    payMethod = data.val().payMethod;
                    PostalCode = data.val().postal;
                
                    if (payMethod === "") {
                        payMethod += document.getElementById('ddPayBy').value;
                    } else {
                        payMethod += (", " + document.getElementById('ddPayBy').value);
                    }

                    if (currPassengers === "") {
                        currPassengers += user[2];
                    } else {
                        currPassengers += (", " + user[2]);
                    }
                    if (PostalCode === "") {
                        PostalCode += postal;
                    } else {
                        PostalCode += (", " + postal);
                    }
                }
            })
        }
    })

    // checks for duplicate booking
    let dates = [];
    let check = false;

    const join = fire.database().ref('bookings').orderByChild('date').startAt(Date.now());
    join.once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((data) => {
                if (data.val().currPassengers.includes(user[2])) {
                    dates.push(data.val().date);
                }
            });
        }
    }).then(() => {
        var i = 0;

        if (dates.length === 0) {
            check = true;
        } else {
            while (i < dates.length) {
                if (Date.parse(bookingDate) < moment.unix(dates[i] / 1000).add(2, 'hours') && Date.parse(bookingDate) > moment.unix(dates[i] / 1000).add(-2, 'hours')) {
                    alert("You have another booking set 2 hours before/after this time");
                    check = false;
                    break;
                } else {
                    check = true;
                }
                i++;
            }
        }

        if (check) {
            if (user[8] < 5.00 && document.getElementById('ddPayBy').value === "wallet") {
                alert("You do not have sufficient funds in your e-wallet");
            } else {
                const accountsRef = fire.database().ref('bookings/' + bookingID);
                const bookingDetails = {
                    currPassengers: currPassengers,
                    payMethod: payMethod,
                    postal: PostalCode
                }
                accountsRef.update(bookingDetails);

                payMethod = '';
                currPassengers = '';
                document.getElementById('btnSubmitJoinBooking').style.display = "none";
                document.getElementById('tbl_viewSelectedBooking_ExtendBooking').style.display = "none";
                viewMyBookings();
            }
        }
    });

    PostalCode = '';
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <SubmitButton 
              title='Schedule a new ride' 
              onPress={() => {{this.props.navigation.navigate('Schedule a Ride')}}} 
            />
            {(user[5] === 'yes') ? this.checkDriverStatus : null}
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

