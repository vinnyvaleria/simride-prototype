import 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './simride/constants/colors';

import RegisterScreen from './simride/screens/RegisterScreen';
import StartScreen from './simride/screens/StartScreen';
import MainScreen from './simride/screens/MainScreen';
import AccountMainScreen from './simride/screens/AccountMainScreen';
import InboxMainScreen from './simride/screens/InboxMainScreen';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.GREEN_PRI,
    padding: 10,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'md-apps';
            } else if (route.name === 'Inbox') {
              iconName = focused ? 'ios-mail-open' : 'ios-mail';
            } else if (route.name === 'Account') {
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
        <Tab.Screen name='Inbox' component={InboxMainScreen} />
        <Tab.Screen name='Account' component={AccountMainScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREEN_SEC,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
