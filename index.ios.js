import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './components/Login'

var GitHubBrowser = React.createClass({

  getInitialState: function() {
    return {
      isLoggedIn: false
    }
  },

  onLogin: function() {
    this.setState({ isLoggedIn: true })
    // console.log("inside onLogin ", state);
    // state.isLoggedIn = true
  },

  render: function() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container} >
          <Text style={styles.welcome} >Logged In</Text>
        </View>
      )
    } else {
      return (
        <Login onLogin={this.onLogin} />
      )
    }
  }
})

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
