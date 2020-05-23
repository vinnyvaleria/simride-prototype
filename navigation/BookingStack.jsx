import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { 
  BookingMainScreen,
  ScheduleRideScreen
 } from '../screens/Bookings';

const Stack = createStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Bookings'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}  
    >
      <Stack.Screen name='Bookings' component={BookingMainScreen} />
      <Stack.Screen name='Schedule a Ride' component={ScheduleRideScreen} />
    </Stack.Navigator> 
  );
}
