import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
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
      bookingID: ''
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
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
          });
      });
    })
    this.setState({ binded: true });
  }

  loadAllAccounts = () => {
    const accountsRef = fire.database.ref('accounts');
    accountsRef
      .orderByChild('email')
      .once('value')
      .then((snapshot) => {
        let i = 0;
        snapshot.forEach((child) => {
          userDetails[i] = child.key + ":" + child.val().uname + ":" + child.val().fname + ":" + child.val().lname;
          i++;
        })
      })
      .then(() => {
        var bookingsRef = fire.database().ref('bookings');
        bookingsRef
          .on('value', snapshot => {
            if (snapshot.exists()) {
              // document.getElementById('tb_CreatedBookings').innerHTML = '';
              let content = [];
              let rowCount = 0;
              snapshot.forEach((data) => {
                if (data.val().driverID === user[9] && data.val().date > moment.now()) {
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
                  /*
                  content += '<tr id=\'' + data.key + '\'>';
                  content += '<td>' + area + '</td>'; //column1
                  content += '<td>' + date + '</td>'; //column2
                  content += '<td>' + driver + '</td>';
                  content += '<td>' + passengers + '</td>';
                  content += '<td id=\'btnViewCreatedBooking' + rowCount + '\'></td>';
                  content += '<td id=\'btnStartCreatedBooking' + rowCount + '\'></td>';
                  content += '</tr>';
                  */
                  rowCount++;
                }
              });

              //document.getElementById('tb_CreatedBookings').innerHTML += content;

              /*for (let v = 0; v < rowCount; v++) {
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
              }*/
            }
          });
      });
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

            <Text style={pageStyle.header}>Driver ID</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your first name' 
              value={this.state.firstName}
              onChangeText={(firstName) => this.setState({ firstName })}
            />

            <Text style={pageStyle.header}>Last Name</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your last name'
              value={this.state.lastName} 
              onChangeText={(lastName) => this.setState({ lastName })}
            />

            <Text style={pageStyle.header}>E-mail</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your e-mail'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
            />

            <Text style={pageStyle.header}>Phone Number</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your phone number'
              value={this.state.phone}
              onChangeText={(phone) => this.setState({ phone })} 
            />

            <Text style={pageStyle.header}>Username</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Your preferred username'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}  
            />

            <Text style={pageStyle.header}>Password</Text>
            <TextInput 
              style={pageStyle.textinput}
              placeholder='Your password' 
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />

            <Text style={pageStyle.header}>Re-enter Password</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder='Please re-enter your password'
              value={this.state.repassword}
              onChangeText={(repassword) => this.setState({ repassword })}
              secureTextEntry 
            />
          
            <View style={pageStyle.equalspace}>
              <SubmitButton title='Submit' />
              <SubmitButton title='Cancel' onPress={() => {{this.props.navigation.navigate('Bookings')}}} />
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

