import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './RegisterScreen';
import StartScreen from './StartScreen';

/*const StackNav = creteStackNavigator();

function StackNav() {
  header= ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;
  
    return (
      <MyHeader
        title={title}
        leftButton={
          previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
        }
        style={options.headerStyle}
      />
    );
  },
  {
    Start: {screen: StartScreen},
    Register: {screen: RegisterScreen},
  },
  {
    initialRouteName: 'Start'
  },
);*/

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Start' component={StartScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />      
    </Stack.Navigator>
  )
}

export { RegisterScreen, StartScreen, StackNav };
