import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';

export default class Test extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
        //accessible={false}>
        ><Text>ASDA</Text>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
