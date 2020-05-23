import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { 
  AccountMainScreen, 
  AccountEditScreen,
  DriverApplicationScreen,
  UpdatePasswordScreen,
 } from '../screens/Account';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Account Settings'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}  
    >
      <Stack.Screen name='Account Settings' component={AccountMainScreen} />
      <Stack.Screen name='Edit Profile' component={AccountEditScreen} />
      <Stack.Screen name='Driver Application' component={DriverApplicationScreen} />
      <Stack.Screen name='Update Password' component={UpdatePasswordScreen} />
    </Stack.Navigator> 
  );
}
