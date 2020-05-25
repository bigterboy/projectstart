import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Context from "context";
export default class MyTextInput extends Component {
  render() {
    let inputProps = { ...this.props, style: undefined };
    return (
      <View style={this.props.style}>
        <TextInput
          ref={input => {
            this.input = input;
          }}
          {...inputProps}
          allowFontScaling={false}
          style={{
            
            paddingBottom: 2,
            color: this.props.textColor,
            fontSize: Context.getSize(17)
          }}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : "default"
          }
        />
        <View style={{ height: 1, backgroundColor: this.props.lineColor }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  line: {
    height: 1
  }
});
