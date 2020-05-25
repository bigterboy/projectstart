import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
export default class KeyboardAvoiding extends Component {
  render() {
    if (Platform.OS === "ios") {
      return (
        <KeyboardAvoidingView behavior="padding" {...this.props}>
          {this.props.children}
        </KeyboardAvoidingView>
      );
    } else {
      return (<View {...this.props}>{this.props.children}</View>);
    }
  }
}
