import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { InboxMainScreen, InboxPersonalChat } from '../screens/Inbox';

const Stack = createStackNavigator();

export default function MessagesStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Inbox'
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
      <Stack.Screen name='Inbox' component={InboxMainScreen} />
      <Stack.Screen name='Personal Chat' component={InboxPersonalChat} />
    </Stack.Navigator> 
  );
}
