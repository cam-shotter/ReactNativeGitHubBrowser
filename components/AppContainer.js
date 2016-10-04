import React, { Component } from 'react'
import buffer from 'buffer'
import {
  Text,
  View,
  StyleSheet,
  TabBarIOS
} from 'react-native';

import AuthService from './AuthService'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return (
      <TabBarIOS style={styles.container} >
        <TabBarIOS.Item
            title="Feed"
            selected={this.state.selectedTab == 'feed'}
            icon={require('image!inbox')}
            onPress={()=> this.setState({selectedTab: 'feed'})}
        >
            <Text style={styles.welcome}>Tab 1</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab == 'search'}
            icon={require('image!search')}
            onPress={()=> this.setState({selectedTab: 'search'})}
        >
            <Text style={styles.welcome}>Tab 2</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

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


export default AppContainer
