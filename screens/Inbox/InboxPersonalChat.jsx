import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';

// components
import SubmitButton from '../../components/SubmitButton';

//styling
import { pageStyle, screenStyle } from'./styles';

export default class InboxPersonalChat extends React.Component {
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
        <View style={pageStyle.formwrap}>
          <Text style={pageStyle.title}>Anjir</Text>
        </View>
      </ScrollView>
    );
  }
}

