import buffer from 'buffer'
import { AsyncStorage } from 'react-native'
var _ = require('lodash')

const authKey = 'auth'
const userKey = 'user'

class AuthService {
  getAuthInfo(callback) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        return callback(err)
      }

      if (!val) {
        return callback()
      }

      var zippedObj = _.zipObject(val)

      if (!zippedObj[authKey]) {
        return callback()
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }

      return callback(null, authInfo)
    })
  }

  login(cred, callback) {
    var b = new buffer.Buffer(cred.username + ":" + cred.password)
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
    .then((response) => {
      if ( response.status >= 200 && response.status < 300 ) {
        callback({
          badCredentials: false,
          unknownError: false,
          success: true
        })
        return response
      }

      if ( response.status = 401 ) {
        callback({ badCredentials: response.status == 401 })
        throw 'Bad Credentials'
      }

      return callback({
        unknownError: response.status != 401
      })

    })
    .then((response) => {
      return response.json()
    })
    .then((results) => {
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.Stringify(results)]
      ], (err) => {
        if (err) {
          throw err
        }
      })
    })
    .catch((err) => {
      return callback(err)
    })
    .finally(() => {
      return callback({showProgress: false})
    })
  }
}

export default new AuthService()
