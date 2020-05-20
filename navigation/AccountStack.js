import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { AccountMainScreen, AccountEditScreen } from '../screens/Account';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Account'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_PRI,
        headerBackTitleStyle: {
          color: COLORS.GREEN_PRI,
        },
      }}  
    >
      <Stack.Screen name='Account' component={AccountMainScreen} />
      <Stack.Screen name='Edit Profile' component={AccountEditScreen} />
    </Stack.Navigator> 
  );
}
