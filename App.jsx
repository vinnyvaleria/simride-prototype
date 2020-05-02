import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './simride/constants/colors';

import DashboardNav from './simride/navigation/DashboardNav';

export default function App() {
  return (
    <DashboardNav />
  );
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
