import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { RegisterScreen, ForgotPasswordScreen } from '../screens/Landing';
import StartScreen from '../screens/Landing/StartScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

export default function LandingStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Start'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}  
    >
      <Stack.Screen name='Start' component={StartScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Home' component={MainScreen} />
      <Stack.Screen name='Forgot Password' component={ForgotPasswordScreen} />
    </Stack.Navigator> 
  );
}
