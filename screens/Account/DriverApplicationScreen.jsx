import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

import DateTimePicker from 'react-datetime-picker'

// components
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

//styling
import { pageStyle, screenStyle } from './styles';
import { COLORS } from '../../constants/colors';

// images
import profilepicture from '../../assets/images/picture.jpg';

let value;

export default class DriverApplicationScreen extends React.Component {
  constructor (user) {
    super(user);
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
      wallet: '',
      id: '',
      rating: '',
      ratedBy: '',
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: '',
      balance: '',
      binded: false,
      issuedDate: ''
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

  // logout
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

    fire.auth().signOut();
  }

  // handles textbox change
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // submits driver details into realtime db
  submitDriverDetails() {
    const rg = new RegExp("^((S|T)[0-9]{7}[A-Z]{1}$)");

    var date = new Date;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear() - 2;
    var yy = date.getFullYear();
    var issuedDate = new Date(document.getElementById('txtIssueDate').value);
    var today = new Date(y, m, d);
    var now = new Date(yy, m, d)

    if (this.state.license !== "" && this.state.carplate !== "" && rg.test(this.state.license.toUpperCase()) && today > issuedDate) {
      const accountsRef = fire.database().ref('driverDetails/' + this.state.id);
      const driverDetails = {
        driverUname: this.state.username,
        carplate: this.state.carplate,
        license: this.state.license,
        issueDate: document.getElementById('txtIssueDate').value,
        completed: "no",
        status: "pending",
        dateApplied: now
      }

      accountsRef.update(driverDetails);
      this.state = {
        carplate: '',
        license: '',
        status: '',
        dateApplied: ''
      };

    } else {
      if (this.state.license === "" || this.state.carplate === "") {
        alert('One or more fields are empty');
      } else if (!rg.test(this.state.license.toUpperCase())) {
        alert('Please enter a valid license number');
      } else if (issuedDate > today) {
        alert('You must be a driver for at least 2 years');
      }
    }
  }

  render () {
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.wrapper}>
          <Image style={pageStyle.image} source={profilepicture} />

          <Text style={pageStyle.header}>License Number</Text>
          <TextInput style={pageStyle.textinput} value={this.state.license} name='license' onChange={this.handleChange} />

          <Text style={pageStyle.header}>Issue Date</Text>
          <DateTimePicker disableClock ='true' />

          <Text style={pageStyle.header}>Car Plate Number</Text>
          <TextInput style={pageStyle.textinput} value={this.state.carplate} name='carplate' onChange={this.handleChange} />

          <Text
            style={{color: COLORS.GREY, marginBottom: 15, fontSize: 12}}
          />

          <View style={pageStyle.equalspace}>
            <SubmitButton title='Submit' value={value} onPress={this.submitDriverDetails} />
          </View>
        </View>
        
      </ScrollView>
    );
  }
}

