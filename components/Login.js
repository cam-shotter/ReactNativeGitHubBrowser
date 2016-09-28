import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image  style={styles.logo}
                source={require('image!Octocat')} />
        <Text style={styles.heading}>
          Github Browser
        </Text>
        <TextInput style={styles.input}
          placeholder="Github Username" />
        <TextInput style={styles.input}
          placeholder="Github Password"
          secureTextEntry="true" />
        <TouchableHighlight style={styles.button} >
          <Text style={styles.button} >
            Log in
          </Text>
        </TouchableHighlight>
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
    borderColor: '#48bbec'
  }
})

export default Login
