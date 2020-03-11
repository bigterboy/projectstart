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

import {connect} from 'react-redux';

//import * as action1 from '../redux/action/countAction';

export default class MainCardTab extends Component {
  render() {
    console.log('CO RENDER MAIN CARD TAB KHONG');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
        <Text>TAB 3</Text>
        <Text>{this.props.counter2}</Text>
      </View>

      // <SafeAreaView>
      // </SafeAreaView>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     counterReducer: state.counterReducer.counterTemper,
//     counter2: state.counterReducer.counter2.test2,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     handleIncrease: () => dispatch(action1.increase()),
//   };
// }

// export default connect(
//   mapStateToProps,
//   null,
// )(MainCardTab);
