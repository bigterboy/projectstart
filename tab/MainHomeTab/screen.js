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
  Animated,
  TextInput,
} from 'react-native';

import {Input, Test} from 'component';

export default class MainHomeTab extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
    };
  };

  render() {
    console.log('render lai MAIN HOME TAB KHONG', this.props);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>TAB 1</Text>

        <TouchableOpacity
          onPress={() => {
            //this.props.navigation.navigate('ModalLoading');
            this.props.handleIncrease();
          }}>
          <Text>CLICK +</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //this.props.navigation.navigate('ModalLoading');
            this.props.handleDecrease();
          }}>
          <Text>CLICK -</Text>
        </TouchableOpacity>
        <Text>{this.props.counter}</Text>
      </View>
    );
  }
}
