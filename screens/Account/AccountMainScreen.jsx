import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

import fire from '../../config';
import 'firebase/firestore';
import 'firebase/storage';

// components
import { SubmitButton, Badge } from '../../components';
import { user } from '../Landing/StartScreen';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

var badgebutton = [];

export default class AccountMainScreen extends React.Component {
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
      checkDriverStatus: []
    };
  }

  componentDidMount = () => {
    const emailTemp = fire.auth().currentUser.email;
    user[3] = emailTemp;
    this.state.email = user[3];
    this.bindUserData();
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
          },
            function () {
              let c;
              if (this.state.ratedBy === 0) {
                c = 1;
              }
              else {
                c = this.state.ratedBy
              }

              const avg = parseInt(this.state.rating) / c;
              this.setState({ avgRating: avg })
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

  checkDriverStatus = () => {
    badgebutton.push(<Badge label='driver' />)

    this.setState({
      checkDriverStatus: badgebutton,
    })
  }

  render () {
    if (this.state.binded) {
      return (
        <ScrollView style={screenStyle}>
          <View style={pageStyle.wrapper}>
            {(this.state.isDriver === 'yes') ? this.state.checkDriverStatus : null}
            <Image style={pageStyle.image} source={profilepicture} />
            <Text style={pageStyle.title}>{this.state.firstName} {this.state.lastName}</Text>
            <Text style={pageStyle.subtitle}>Email: {this.state.email}</Text>
            <Text style={pageStyle.subtitle}>Phone Number: +65 {this.state.phone}</Text>
            <Text style={pageStyle.subtitle}>Rating: {this.state.avgRating}</Text>

            <View style={pageStyle.equalspace}>
              <SubmitButton 
                title='Edit Profile' 
                onPress={() => {{this.props.navigation.navigate('Edit Profile')}}} 
              />
              <SubmitButton title='Logout' onPress={() => this.logout()} />
            </View> 
          </View>
        </ScrollView>
      )
    } else {
      return null && console.log('There is a problem with binding user data');
    }
  }
}

