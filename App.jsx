import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from './constants/colors';

import DashboardNav from './navigation/DashboardNav';

const getFonts = () => Font.loadAsync({
  'notoSans': require('./assets/fonts/NotoSansCJKtc-Regular.otf'),
  'notoSansMedium': require('./assets/fonts/NotoSansCJKtc-Medium.otf'),
  'notoSansBold': require('./assets/fonts/NotoSansCJKtc-Bold.otf'),
  'notoSansBlack': require('./assets/fonts/NotoSansCJKtc-Black.otf'),
});


const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded) {
    return (
      <DashboardNav />
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GREEN_PRI,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default App;


