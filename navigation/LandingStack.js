import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// screens 
import { StartScreen, RegisterScreen } from '../screens/Landing';

const Stack = createStackNavigator();

export default function LandingStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = 'Start'
        screenOptions = {{
          headerShown: true,
        }}  
      >
        <Stack.Screen name='Start' component={StartScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>   
  );
}
