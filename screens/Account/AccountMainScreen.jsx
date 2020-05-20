import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

// components
import SubmitButton from '../../components/SubmitButton';

// styling
import { pageStyle, screenStyle } from './styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

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
      id: '',
      image: null,
      frontURL: '',
      backURL: '',
      progress: 0,
      license: '',
      carplate: '',
      status: '',
      dateApplied: ''
    };
  }

  render () {
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.wrapper}>
          <Image style={pageStyle.image} source={profilepicture} />
          <Text style={pageStyle.title}>{this.firstName} {this.lastName}</Text>
          <Text style={pageStyle.subtitle}>Email : {this.email}</Text>
          <Text style={pageStyle.subtitle}>Phone Number : +65 {this.phoneNumber}</Text>
          <Text style={pageStyle.subtitle}>Driver Status : {this.driverstatus}</Text>

          <View style={pageStyle.equalspace}>
            <SubmitButton 
              title='Edit Profile' 
              onPress={() => {{this.props.navigation.navigate('Edit Profile')}}} />
            <SubmitButton title='Logout' />
          </View> 
        </View>
      </ScrollView>
    );
  }
}

