import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { HDText } from "component";
import Context from "context";

export default class MyButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.touch, this.props.style]}
        onPress={this.props.onPress}
      >
        <View
          style={[styles.background(this.props.type), this.props.contentStyle]}
        >
          <HDText style={styles.text(this.props.type)}>
            {this.props.lowerCase
              ? this.props.title
              : this.props.title.toUpperCase()}
          </HDText>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  touch: {
    height: 46
  },
  background: (type = "default") => {
    let backgroundColor =
      type === "default"
        ? Context.getColor("accent")
        : Context.getColor("background");
    let borderWidth = type === "default" ? undefined : 1;
    return {
      flex: 1,
      justifyContent: "center",
      backgroundColor: backgroundColor,
      borderRadius: 100,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: borderWidth,
      borderColor: "#C0CDD5"
    };
  },
  text: (type = "default") => {
    let color =
      type === "default"
        ? Context.getColor("textWhite")
        : Context.getColor("text");
    return {
      color: color,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "500"
    };
  }
});
