import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// styling
import { COLORS } from '../constants/colors';

// screens 
import { 
  WalletMainScreen
 } from '../screens/Wallet';

const Stack = createStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator
      initialRouteName = 'Wallet'
      screenOptions = {{
        headerTintColor: COLORS.GREEN_SEC,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: 'notoSansMedium',
          fontSize: 18,
        },
      }}  
    >
      <Stack.Screen name='Wallet' component={WalletMainScreen} />
    </Stack.Navigator> 
  );
}
