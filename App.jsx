import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './simride/constants/colors';

import DashboardNav from './simride/navigation/DashboardNav';
import RegisterScreen from './simride/screens/RegisterScreen';
import StartScreen from './simride/screens/StartScreen';
import MainScreen from './simride/screens/MainScreen';
import AccountMainScreen from './simride/screens/AccountMainScreen';
import InboxMainScreen from './simride/screens/InboxMainScreen';

export default function App() {
  return (
    <DashboardNav />
    /*<View style={styles.container}>
      <StartScreen />
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREEN_PRI,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
