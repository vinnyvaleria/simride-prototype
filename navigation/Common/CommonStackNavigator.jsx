import { createStackNavigator } from 'react-navigation-stack';

import { headerOptions } from '../header';
import { MainScreen } from '../../screens/MainScreen';
import { StartScreen, RegisterScreen } from '../../screens/Landing';
const navigators = {};
// Home page.
navigators[Common.routes.home] = MainScreen;

// Sign in page.
navigators[Common.routes.signin] = {
  screen: StartScreen,
  navigationOptions: {
    header: null,
  },
};

// Sign up page.
navigators[Common.routes.signup] = {
  screen: RegisterScreen,
  navigationOptions: {
    header: null,
  },
};

// This is the stack navigator for common screens between landing/ and home/
const CommonStackNavigator = createStackNavigator(navigators, {
  initialRouteName: Common.routes.signin,
  ...headerOptions,
});

// Hide the footer in other screens.
CommonStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default CommonStackNavigator;