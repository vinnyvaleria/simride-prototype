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

import * as Datetime from 'react-datetime';
import DatePicker from 'react-native-datepicker';

// components
import { SubmitButton, ImagePickerComponent } from '../../components';
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
      issuedDate: '',
      licenseSide: '',
      response: '',
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
  }

  // handles textbox change
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  // submits driver details into realtime db
  submitDriverDetails = () => {
    const rg = new RegExp('^((S|T)[0-9]{7}[A-Z]{1}$)');

    var date = new Date;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear() - 2;
    var yy = date.getFullYear();
    var issuedDate = new Date(this.state.date);
    var today = new Date(y, m, d);
    var now = new Date(yy, m, d)
    

    if (this.state.license !== '' && this.state.carplate !== '' && rg.test(this.state.license.toUpperCase()) && today > issuedDate) {
      const accountsRef = fire.database().ref('driverDetails/' + this.state.id);
      const driverDetails = {
        driverUname: this.state.username,
        carplate: this.state.carplate,
        license: this.state.license,
        issueDate: this.state.date,
        completed: 'no',
        status: 'pending',
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
      if (this.state.license === '' || this.state.carplate === '') {
        alert('One or more fields are empty');
      } else if (!rg.test(this.state.license.toUpperCase())) {
        alert('Please enter a valid license number');
      } else if (issuedDate > today) {
        alert('You must be a driver for at least 2 years');
      }
    }
  }

  handleFrontUpload() {
    const {image} = this.state;
    if (image !== null) {
      const uploadTask = fire.storage().ref().child(`license/${user[9]}/front`).put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({
            progress
          });
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          // Error function ...
          alert('Error: ' + error);
          console.log(error);
        }, () => {
          // complete function ...
          alert('Image is uploaded!');
          fire.storage()
            .ref('license/' + user[9])
            .child('front')
            .getDownloadURL()
            .then(frontURL => {
              this.setState({
                frontURL
            });
          });
        });
    } else {
      alert('Error: No file selected');
    }
  }

  // uploads back license pic
  handleBackUpload() {
    var date = new Date;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    var today = new Date(y, m, d);

    const {image} = this.state;
    if (image !== null) {
      const uploadTask = fire.storage().ref().child(`license/${user[9]}/back`).put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({
            progress
          });
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          // Error function ...
          console.log(error);
        }, () => {
          // complete function ...
          alert('Image is uploaded!')
          fire.storage()
            .ref('license/' + user[9])
            .child('back')
            .getDownloadURL()
            .then(backURL => {
              this.setState({
                backURL
            });
          });
          console.log(backURL);
          const driverDetails = {
            completed: 'yes',
            dateApplied: today
          }

          accountsRef.update(driverDetails);
        });
    } else {
      alert('Error: No file selected');
    }
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Image style={pageStyle.image} source={profilepicture} />

            <Text style={pageStyle.header}>License Number</Text>
            <TextInput style={pageStyle.textinput} value={this.state.license} name='license' onChange={this.handleChange} />

            <Text style={pageStyle.header}>Issue Date</Text>
            <DatePicker
              style={pageStyle.textinput}
              date={this.state.date}
              mode='date'
              placeholder='Please select the date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  justifyContent: 'center',
                  borderColor: 'transparent',
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />

            <Text style={pageStyle.header}>Front View License</Text>
            <ImagePickerComponent onBlur={this.handleFrontUpload}/>

            <Text style={pageStyle.header}>Back View License</Text>
            <ImagePickerComponent onBlur={this.handleBackUpload}/>

            <Text style={pageStyle.header}>Car Plate Number</Text>
            <TextInput style={pageStyle.textinput} value={this.state.carplate} name='carplate' onChange={this.handleChange} />

            <View style={pageStyle.equalspace}>
              <SubmitButton title='Submit' value={value} onPress={this.submitDriverDetails} />
            </View>
          </View>
          
        </ScrollView>
      )
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }

}
/*<Datetime 
              locale='en-sg' 
              value={this.state.date} 
              required
              timeFormat={false}
            />*/
