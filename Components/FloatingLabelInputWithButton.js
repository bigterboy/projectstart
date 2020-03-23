/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import FloatingLabelInput from './FloatingLabelInput';
//import iconBack from '../Image/icons-back-black.png';

export default class FloatingLabelInputWithButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      value: '',
      isFocused: false,
    };
  }

  handleTextChange = newText =>
    this.setState({
      value: newText,
    });

  callbackHandlerFocusFunction = isFocused => {
    this.setState({
      isFocused: true,
    });
  };
  callbackHandlerBlurFunction = isFocused => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    return (
      <View
        style={[
          styles.SectionStyle,
          this.state.isFocused ? styles.SectionStyleFocused : {},
        ]}>
        <View style={{flex: 1}}>
          <StatusBar hidden />
          <FloatingLabelInput
            label={this.props.label}
            //value={this.state.value}
            onChangeText={this.handleTextChange}
            handleFocusClickParent={this.callbackHandlerFocusFunction}
            handleBlurClickParent={this.callbackHandlerBlurFunction}
          />
        </View>
        <TouchableOpacity onPress={this.props.action}>
          <Image
            source={{
              uri: `${this.props.url}`,
            }}
            style={styles.ImageStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 43,
    borderBottomWidth: 0.2,
    marginTop: 10,
  },
  SectionStyleFocused: {
    borderBottomColor: '#008BF2',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
