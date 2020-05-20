import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { COLORS } from '../constants/colors';

import MainScreen from '../screens/MainScreen';

// navigation
import { 
  AccountStack,
  InboxStack, 
  LandingStack,
} from '../navigation';

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
              iconName = focused ? 'ios-home' : 'md-apps';
            } else if (route.name === 'Inbox Menu') {
              iconName = focused ? 'ios-mail-open' : 'ios-mail';
            } else if (route.name === 'Account Menu') {
              iconName = focused ? 'ios-bulb' : 'ios-cog';
            }

            iconColor = focused ? COLORS.GREEN_PRI : COLORS.GREY;

            return <Ionicons name={iconName} size={30} color={iconColor} />
          },
        })}

        tabBarOptions={{
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
        <Tab.Screen name='Inbox Menu' component={InboxStack} />
        <Tab.Screen name='Account Menu' component={AccountStack} />
        <Tab.Screen name='Landing Menu' component={LandingStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}