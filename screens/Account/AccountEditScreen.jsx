import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

// components
import SubmitButton from '../../components/SubmitButton';

//styling
import { pageStyle, screenStyle } from'./styles';

// images
import profilepicture from '../../assets/images/picture.jpg';

export default class AccountEditScreen extends React.Component {
  constructor (props) {
    super(props);

    this.firstName = 'Vinny';
    this.lastName = 'Zhong';
    this.email = 'abc@yahoo.com';
    this.phoneNumber = 97328177;
    this.driverstatus = 'no';
  }

  render () {
    return (
      <ScrollView style={screenStyle}>
        <View style={pageStyle.wrapper}>
          <Image style={pageStyle.image} source={profilepicture} />

          <Text style={pageStyle.header}>First Name</Text>
          <TextInput style={pageStyle.textinput} placeholder={this.firstName} />

          <Text style={pageStyle.header}>Last Name</Text>
          <TextInput style={pageStyle.textinput} placeholder={this.lastName} />

          <Text style={pageStyle.header}>Phone Number</Text>
          <TextInput style={pageStyle.textinput} placeholder={this.phoneNumber.toString()} />

          <View style={pageStyle.equalspace}>
            <SubmitButton title='Update Profile' />
            <SubmitButton title='Change Password' />
          </View>
        </View>
        
      </ScrollView>
    );
  }
}

