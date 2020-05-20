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
import SearchButton from '../../components/SearchButton';

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
          <SearchButton  
            onPress={() => {{this.props.navigation.navigate('Personal Chat')}}} />
        </View>
      </ScrollView>
    );
  }
}

