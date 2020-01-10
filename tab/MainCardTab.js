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
  //SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';

import Header from '../Components/Header';

import SafeAreaView from 'react-native-safe-area-view';

export default class MainCardTab extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text>TAB 3</Text>
      </SafeAreaView>
    );
  }
}
