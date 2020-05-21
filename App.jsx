import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import fire from './config';

import { COLORS } from './constants/colors';
import { StyleSheet, Text, View } from 'react-native';

import DashboardNav from './navigation/DashboardNav';
import StartScreen from './screens/Landing/StartScreen';

let customFonts = {
  'notoSans': require('./assets/fonts/NotoSansCJKtc-Regular.otf'),
  'notoSansMedium': require('./assets/fonts/NotoSansCJKtc-Medium.otf'),
  'notoSansBold': require('./assets/fonts/NotoSansCJKtc-Bold.otf'),
  'notoSansBlack': require('./assets/fonts/NotoSansCJKtc-Black.otf'),
};

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = ({
      user: false,
      fontsLoaded: false,
    });
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = () => {
    this._loadFontsAsync();
    this.storage();

    fire
      .auth()
      .onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          //localStorage.setItem('user', user.uid);
          this.setState({ user: true });
        } else {
          //localStorage.removeItem('user');
          this.setState({ user: false });
        }
      });
  }

  storage = () => {
    if (!typeof window.localStorage === "undefined") return window.localStorage;
    else if (!typeof localStorage === "undefined") return localStorage;
    else return false;
  };

  render() {
    if (this.state.fontsLoaded) {
      if (this.state.user) {
        return (
          <DashboardNav />
        );
      } else {
        return (
          <StartScreen />
        )
      }
    } else {
      return (
        <AppLoading />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
})