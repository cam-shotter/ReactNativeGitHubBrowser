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

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showProgress: false
    }
  }

  onLoginPressed() {
    console.log("Attempted to login with " + this.state.username);
    this.setState({showProgress: true})

    var b = new buffer.Buffer(this.state.username + ":" + this.state.password)
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
      .then((response) => {
        if ( response.status >= 200 && response.status < 300 ) {
          console.log("Status ok");
          return response
        }

        if ( response.status = 401 ) {
          console.log('bad response');
          throw 'Bad Credentials'
        }

        throw 'Unknown Error'
      })
      .then((response) => {
        return response.json()
      })
      .then((results) => {
        console.log(results)
      })
      .catch((err) => {
        console.log('Log in failed: ' + err);
      })
      .finally(() => {
        this.setState({showProgress: false})
      })
  }

  render() {
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
  }
})

export default Login
