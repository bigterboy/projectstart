/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, ScrollView, Button} from 'react-native';

import Header from '../Components/Header';

export default class MainHomeTab extends Component {

  render() {
    return (
      <>
        <Header />
        <ScrollView>
          <Text>TAB 1</Text>
        </ScrollView>
      </>
    );
  }
}
