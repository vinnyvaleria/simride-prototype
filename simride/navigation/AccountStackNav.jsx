import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native';

import { COLORS } from '../constants/colors';

import AccountMainScreen from '../screens/AccountMainScreen';
import AccountEditScreen from '../screens/AccountEditScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Staxk = createStackNavigator();

export default function AccountStackNav () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Account' component={AccountMainScreen} />
      <Stack.Screen name='Edit Profile' component={AccountEditScreen} />
      <Stack.Screen name='Update Password' component={} />
    </Stack.Navigator>
  );
}