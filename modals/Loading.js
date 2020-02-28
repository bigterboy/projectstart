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
  ScrollView,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 30}}>This is a modal1234!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
          <ActivityIndicator size="large" color="red" />
        </View>
      </View>
    );
  }
}
