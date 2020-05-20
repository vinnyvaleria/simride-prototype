import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { StartScreen, RegisterScreen, ForgotPasswordScreen } from '../screens/Landing';

const Stack = createStackNavigator();

export default function LandingStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Start'
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
      <Stack.Screen name='Start' component={StartScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Forgot Password' component={ForgotPasswordScreen} />
    </Stack.Navigator> 
  );
}
