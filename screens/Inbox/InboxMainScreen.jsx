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

export default class InboxMainScreen extends React.Component {
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
          <Text style={pageStyle.title}>Inbox</Text>

          <View style={pageStyle.equalspace}>
            <SubmitButton 
              title='nama orang' 
              onPress={() => {{this.props.navigation.navigate('Personal Chat')}}} />
            <SubmitButton title='Logout' />
          </View> 
        </View>
      </ScrollView>
    );
  }
}

