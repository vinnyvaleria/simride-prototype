import React from 'react';
import { StyleSheet, View } from 'react-native';
import fire from './base';
import Login from './simride/components/login/index';
import Dashboard from './simride/components/dashboard/index';

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
        <View>{this.state.user ? (<Dashboard />) : (<Login />)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b9ea1',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default App;