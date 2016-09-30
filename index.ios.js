import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './components/Login'

class GitHubBrowser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // isLoggedIn: false
    }

  }



  onLogin(state) {
    console.log("inside onLogin ", state);
    state.isLoggedIn = true
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <Login onLogin={this.onLogin} />
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome} >Logged In</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'powderblue'
  },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  //   backgroundColor: 'steelblue'
  // },
});

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
