import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { InboxMainScreen, InboxPersonalChat } from '../screens/Inbox';

const Stack = createStackNavigator();

export default function InboxStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Inbox'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name='Inbox' component={InboxMainScreen} />
      <Stack.Screen name='Personal Chat' component={InboxPersonalChat} />
    </Stack.Navigator> 
  );
}
