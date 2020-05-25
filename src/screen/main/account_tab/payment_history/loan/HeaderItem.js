import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HDText } from "component";
import Context from "context";

export default class HeaderItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HDText style={styles.text}>Ngày thanh toán</HDText>
        <HDText style={styles.text}>Số tiền</HDText>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Context.getColor("accent2"),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  },
  text: {
    color: "#FFF",
    fontSize: Context.getSize(14),
    fontWeight: "bold"
  }
});
