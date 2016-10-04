import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import Login from './components/Login'
import AppContainer from './components/AppContainer'
import AuthService from './components/AuthService'

var GitHubBrowser = React.createClass({

  componentDidMount: function() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  },

  getInitialState: function() {
    return {
      isLoggedIn: false,
      checkingAuth: true
    }
  },

  onLogin: function() {
    this.setState({ isLoggedIn: true })
  },

  render: function() {
    if (this.state.checkingAuth) {
        return (
          <View style={styles.container} >
            <ActivityIndicator
              animating={true}
              size="large"
              style={styles.loader} />
          </View>
        )
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
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
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center'
  }
})

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
