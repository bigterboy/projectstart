/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import Header from '../Components/Header';
export default class MainLoanTab extends Component {
  render() {
    return (
      <>
        <Header />
        <ScrollView>
          <Text>TAB 2</Text>
        </ScrollView>
      </>
    );
  }
}
