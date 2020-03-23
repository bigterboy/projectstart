import React, {Component} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      isFocused: false,
      isError: false, // Check error input for show error
    };
    this._animatedIsFocused = new Animated.Value(
      this.state.valueInput === '' ? 0 : 1,
    );
  }
  // componentWillMount() {
  //   this._animatedIsFocused = new Animated.Value(
  //     this.props.value === '' ? 0 : 1,
  //   );
  // }

  handleFocus = () => {
    this.setState({isFocused: true});
    this.props.handleFocusClickParent(true);
  };
  handleBlur = () => {
    this.setState({isFocused: false});
    this.props.handleBlurClickParent(true);
  };

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.state.valueInput !== '' ? 1 : 0,
      duration: 350,
    }).start();
  }

  clickB() {
    console.log('CLCIK B');
  }

  _onChangeText = text => {
    this.setState(
      {
        isError: false,
        valueInput: text,
      },
      () => {
        this.props.onChangeTextInput
          ? this.props.onChangeTextInput(text)
          : null;
      },
    );
  };

  render() {
    const {label, ...props} = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#008BF2'],
      }),
    };
    return (
      <View>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={styles.styleInput}
          allowFontScaling={false}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={this._onChangeText}
          value={this.state.valueInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  styleInput: {
    //height: 26,
    height: 60,
    fontSize: 20,
    color: '#000',
  },
});
