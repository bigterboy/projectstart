import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';

export default class KeyboardAvoiding extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
          {this.props.children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
