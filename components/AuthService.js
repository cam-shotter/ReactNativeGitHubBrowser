import buffer from 'buffer'

class AuthService {
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
          unknownError: false
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
      console.log(results)
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
