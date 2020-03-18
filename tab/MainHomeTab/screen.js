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
import {config} from 'react-native-firebase';

import Network from 'network';
import action from 'action';

//const netRequest = new Network();

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

  requestAPI = async () => {
    // ngon roi
    // const temp = await Network.request().then(response => {
    //   console.log('DATA 222: ', response);
    // });
    // console.log('DATA RESPONSE LA11111: ', temp);

    console.log('DATA RESPONS LA1111111', await this.props.getAPI());
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
        <TouchableOpacity
          onPress={() => {
            this.requestAPI();
          }}>
          <Text>REQUEST API</Text>
        </TouchableOpacity>
        <Text>{this.props.counter}</Text>
      </View>
    );
  }
}
