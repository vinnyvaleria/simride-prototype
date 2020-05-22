import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '../constants/colors';

import { MainScreen } from '../screens/Home';

// navigation
import AccountStack from './AccountStack';
import InboxStack from './InboxStack';
import BookingStack from './BookingStack';
import WalletStack from './WalletStack';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.GREEN_PRI,
    padding: 10,
  },
};

export default function DashboardNav() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
            } else if (route.name === 'Inbox Menu') {
              iconName = focused ? 'ios-mail' : 'ios-mail';
            } else if (route.name === 'Wallet Menu') {
              iconName = focused ? 'ios-wallet' : 'ios-wallet';
            } else if (route.name === 'Account Menu') {
              iconName = focused ? 'ios-cog' : 'ios-cog';
            }

            iconColor = focused ? COLORS.GREEN_PRI : COLORS.GREY;

            return <Ionicons name={iconName} size={30} color={iconColor} />
          },
        })}

        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: COLORS.GREEN_PRI,
          showLabel: false,
          style: {
            height:75, 
            padding: 10,
            marginVertical: 0,
          },
        }}
      >
        <Tab.Screen name='Home' component={MainScreen} />
        <Tab.Screen name='Bookings' component={BookingStack} />
        <Tab.Screen name='Inbox Menu' component={InboxStack} />
        <Tab.Screen name='Wallet Menu' component={WalletStack} />
        <Tab.Screen name='Account Menu' component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}