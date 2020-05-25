import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { HDText } from "component";

export default class ButtonText extends Component {
  renderIcon() {
    if (!this.props.iconStyle) return undefined;
    return (
      <Image
        source={this.props.iconStyle ? this.props.iconSource : undefined}
        style={this.props.iconStyle}
      />
    );
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.touch, this.props.style]}
        onPress={this.props.onPress}
      >
        <View style={styles.background}>
          {this.renderIcon()}
          <HDText style={[styles.text, this.props.textStyle]}>
            {this.props.title}
          </HDText>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  touch: {
    height: 40
  },
  background: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400"
  }
});
