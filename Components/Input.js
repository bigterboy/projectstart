/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  Animated,
  Text,
} from 'react-native';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () =>
    this.setState({
      isFocused: true,
    });
  handleBlur = () =>
    this.setState({
      isFocused: false,
    });
  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      //fontSize: !isFocused ? 20 : 14,
      //color: !isFocused ? '#aaa' : '#000',
      position: 'absolute',
      //top: !isFocused ? 18 : 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 10],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['green', '#000'],
      }),
      left: 0,
    };
    return (
      <View style={{paddingTop: 18}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            height: 26,
            fontSize: 20,
            color: '#000',
            borderBottomWidth: 1,
            borderBottomColor: '#555',
          }}
          onFocus={this.handleFocus}
          onBlur={this.onBlur}
        />
      </View>
    );
  }
}

class App extends Component {
  state = {
    phone: '',
    value: '',
  };
  handleTextChange = newText => this.setState({value: newText});

  render() {
    return (
      <View>
        {/* <StatusBar hidden /> */}
        <FloatingLabelInput
          label="Email"
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
        <Text>ASDASDADAS</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  test: {
    position: 'absolute',
    paddingTop: 30,
    //paddingLeft: 100
    //justifyContent: 'flex-end',
    //paddingLeft: 200,
  },
  test2: {
    flex: 1,
  },
});

export default App;
