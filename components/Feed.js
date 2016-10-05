import React, { Component } from 'react'
import buffer from 'buffer'
import {
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';

import AuthService from './AuthService'

class Feed extends Component {
  constructor(props) {
    super(props)

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      dataSource: ds
    }
  }

  componentDidMount(){
    this.fetchFeed()
  }

  fetchFeed(){
    console.log("this is AuthService", AuthService.getAuthInfo);
    AuthService.getAuthInfo((err, authInfo) => {
      console.log("authinfo", authInfo);
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';

      fetch(url, {
          headers: authInfo.header
      })
      .then((response)=> response.json())
      .then((responseData)=> {
        var feedItems =
            responseData.filter((ev)=>
                ev.type == 'PushEvent');
        this.setState({
            dataSource: this.state.dataSource
                .cloneWithRows(feedItems),
            showProgress: false
        })
      })
      .catch((err) => {
        return err
      })
    })
  }

  renderRow(rowData) {
    return (
      <Text style={styles.listComponent} >
        {rowData.actor.login}
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.listContainer} >
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  listComponent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    backgroundColor: '#333',
    borderBottomWidth: 1
  }
})


export default Feed
