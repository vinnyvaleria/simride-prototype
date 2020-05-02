import 'react-native-gesture-handler';
import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './simride/constants/colors';

import RegisterScreen from './simride/screens/RegisterScreen';
import StartScreen from './simride/screens/StartScreen';
import MainScreen from './simride/screens/MainScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREEN_PRI,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
