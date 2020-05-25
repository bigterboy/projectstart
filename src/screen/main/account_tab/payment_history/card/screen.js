import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseScreen, Header } from "component";
import Context from "context";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {}
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
