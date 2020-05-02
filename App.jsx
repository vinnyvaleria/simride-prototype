import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './simride/constants/colors';

import DashboardNav from './simride/navigation/DashboardNav';
import fire from './base';
import Login from './simride/components/login/index';
import Home from './simride/components/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({
          user
        });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({
          user: null
        });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fixToText}>
        </View>
        <DashboardNav />
        <View>{this.state.user ? (<Home />) : (<Login />)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREEN_SEC,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
