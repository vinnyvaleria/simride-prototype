import React from 'react';
import { StyleSheet, View } from 'react-native';
import fire from './base';
import Login from './simride/components/login/index';
import Home from './simride/components/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({
          user
        });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({
          user: null
        });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fixToText}>
        </View>
        <View>{this.state.user ? (<Home />) : (<Login />)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#4b9ea1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default App;

// import * as React from 'react';
// import { WebView } from 'react-native-webview';

// export default class App extends React.Component {
//   render() {
//     return <WebView source={{ uri: 'https://carpool-world-5uck5.web.app/' }} />;
//   }
// }