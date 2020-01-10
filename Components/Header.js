/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, SafeAreaView, View} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={{flex: 1, borderWidth: 1}}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>{this.props.children}</SafeAreaView>
      </View>
    );
  }
}
