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

// components
import { SubmitButton } from '../../components';
import { user } from '../Landing/StartScreen';

//styling
import { pageStyle, screenStyle } from './styles';
import { COLORS } from '../../constants/colors';

// images
import profilepicture from '../../assets/images/picture.jpg';

var phoneArr = []

export default class AccountEditScreen extends React.Component {
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
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();

    fire.database().ref('accounts')
      .orderByChild('email')
      .once('value', snapshot => {
        var i = 0;
        snapshot.forEach((child) => {
          phoneArr[i] = child.val().phone;
          i++;
        })
      });
    }

  // handles image change
  handleImgChange  = () => {
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
      });
    })
    this.setState({ binded: true });
  }

  // real time update profile
  submitEditProfile = () => {
    var phoneCheck = false;
    const rg = new RegExp("^((8|9)[0-9]{7}$)");

    while (i < phoneArr.length) {
      if (this.state.phone === phoneArr[i]) {
        alert('Phone number has already been registered!');
        phoneCheck = false;
        break;
      } else {
        phoneCheck = true;
      }
      i++;
    };

    if (rg.test(this.state.phone)) {
      phoneCheck = true;
    } else {
      alert('Phone number is invalid')
      phoneCheck = false;
    }

    if (phoneCheck) {
      if (this.state.firstName !== "" && this.state.lastName !== "" && this.state.phone !== "") {
        user[0] = this.state.firstName;
        user[1] = this.state.lastName;
        user[4] = this.state.phone;

        const accountsRef = fire.database().ref('accounts/' + user[9]);
        accountsRef
          .orderByChild('email')
          .equalTo(user[3])
          .on('value', snapshot => {
            snapshot.ref.update({
              fname: user[0],
            })
            snapshot.ref.update({
              lname: user[1],
            })
            snapshot.ref.update({
              phone: user[4],
            })
          });
      } else {
        alert("Your profile is updated!")
      }
    }
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            <Image style={pageStyle.image} source={profilepicture} />

            <Text style={pageStyle.header}>First Name</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder={user[0]} 
              value={this.state.firstName} 
              onChangeText={(firstName) => this.setState({ firstName })}
            />

            <Text style={pageStyle.header}>Last Name</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder={user[1]} 
              value={this.state.lastName} 
              onChangeText={(lastName) => this.setState({ lastName })}
            />

            <Text style={pageStyle.header}>Phone Number</Text>
            <TextInput 
              style={pageStyle.textinput} 
              placeholder={user[4].toString()} 
              value={this.state.phone}
              onChangeText={(phone) => this.setState({ phone })}
            />

            <Text
              style={{color: COLORS.GREY, marginBottom: 15, fontSize: 12}}
              onPress={() => this.props.navigation.navigate('Driver Application')}
            >Applying to be a driver?</Text>

            <View style={pageStyle.equalspace}>
              <SubmitButton title='Update Profile' onPress={this.submitEditProfile} />
              <SubmitButton title='Update Password' onPress={() => this.props.navigation.navigate('Update Password')} />
            </View>
          </View>
          
        </ScrollView>
      );
    } else {
      return null && console.log('There is a problem with binging user data');
    }
  }
}

