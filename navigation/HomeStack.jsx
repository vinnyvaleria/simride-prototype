import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { MainScreen } from '../screens/Home';
import { AccountMainScreen } from '../screens/Account';
import { ScheduleRideScreen, BookingMainScreen } from '../screens/Bookings';
import { WalletMainScreen } from '../screens/Wallet';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Home'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}  
    >
      <Stack.Screen name='Home' component={MainScreen} />
      <Stack.Screen name='Schedule a Ride' component={ScheduleRideScreen} />
      <Stack.Screen name='Bookings' component={BookingMainScreen} />
      <Stack.Screen name='Wallet' component={WalletMainScreen} />
    </Stack.Navigator> 
  );
}
