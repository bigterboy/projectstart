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
} from 'react-native';

import Header from '../Components/Header';

export default class MainHomeTab extends Component {
  static navigationOptions = ({navigation}) => {
    //const params = navigation.state.params || {};

    return {
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      /* the rest of this config is unchanged */
    };
  };

  // static navigationOptions = ({navigation}) => {
  //   const params = navigation.state.params || {};

  //   return {
  //     headerTitle: () => <Text>ABCC</Text>,
  //     headerLeft: () => (
  //       <Button onPress={() => navigation.navigate('MyModal')} title="Info" />
  //     ),
  //     //headerRight: () => <Button onPress={params.increaseCount} title="+1" />,
  //   };
  // };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>TAB 1</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ModalLoading');
          }}>
          <Text>CLICK</Text>
        </TouchableOpacity>
      </View>
      // <SafeAreaView>
      // </SafeAreaView>
    );
  }
}
