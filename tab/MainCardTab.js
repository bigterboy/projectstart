/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';

import {connect} from 'react-redux';

//import * as action1 from '../redux/action/countAction';

import PushNotification from 'react-native-push-notification';

export default class MainCardTab extends Component {
  async componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      // onRegister: function(token) {
      //   console.log('TOKEN:', token);
      // },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  }

  render() {
    console.log('CO RENDER MAIN CARD TAB KHONG');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <Text>TAB 3</Text>
        <Text>{this.props.counter2}</Text>
      </View>
    );
  }
}
