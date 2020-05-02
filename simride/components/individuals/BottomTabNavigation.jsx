import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '../../constants/colors';

import MainScreen from '../../screens/MainScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Test') {
            iconName = focused ? 'ios-mail' : 'ios-male-open';
          }

          return <Ionicons name={iconName} size={size} color={COLORS.GREY} />
        },
      })}

      tabBarOptions={{
        activeTintColor: COLORS.GREEN_PRI,
        inactiveTintColor: COLORS.GREY,
      }}
    >
      <Tab.Screen name='Home' component={MainScreen} />
      <Tab.Screen name="Test" component={RegisterScreen} />
    </Tab.Navigator>
    
  );
}
