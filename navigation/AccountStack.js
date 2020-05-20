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
      initialRouteName = 'Account Settings'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleStyle: {
          color: COLORS.GREEN_PRI,
        },
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
        headerTruncatedBackTitle: true,
      }}  
    >
      <Stack.Screen name='Account Settings' component={AccountMainScreen} />
      <Stack.Screen name='Edit Profile' component={AccountEditScreen} />
    </Stack.Navigator> 
  );
}
