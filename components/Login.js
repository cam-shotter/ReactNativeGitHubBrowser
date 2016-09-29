import React, { Component } from 'react'
import buffer from 'buffer'
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

import AuthService from './AuthService'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showProgress: false,
      badCredentials: false,
      unknownError: false,
      success: false
    }
  }

  onLoginPressed() {
    console.log("Attempted to login with " + this.state.username);
    this.setState({showProgress: true})

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(results)

      if (results.success && this.props.onLogin) {
        this.props.onLogin()
      }
    })
  }

  render() {
    var errorCtrl = <View />
    if (this.state.badCredentials) {
      console.log("badCredentials is working");
      errorCtrl = <Text style={styles.error} >
        Wrong Username or Password
      </Text>
    }
    if (this.state.unknownError) {
      console.log("unknownError is working");
      errorCtrl = <Text style={styles.error} >
        Sorry, there was an unexpected issue
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image  style={styles.logo}
                source={require('image!Octocat')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={(text)=>{this.setState({ username: text })}}
          style={styles.input}
          placeholder="Github Username" />
        <TextInput
          onChangeText={(text)=>{this.setState({ password: text })}}
          style={styles.input}
          placeholder="Github Password"
          secureTextEntry={true} />
        <TouchableHighlight style={styles.button} >
          <Text
            onPress={this.onLoginPressed.bind(this)}
            style={styles.buttonText} >
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size='large'
          style={styles.loader} />
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    height: 66,
    width: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})

export default Login
