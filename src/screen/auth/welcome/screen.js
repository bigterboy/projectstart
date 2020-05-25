import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { BaseScreen, Button } from "component";
import Context from "context";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  register = () => {
    this.props.navigation.navigate("RegisterEnterContract");
  };
  login = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={Context.getImage("logo")}
          resizeMode="contain"
          style={styles.imageLogo}
        />
        <Button
          style={{ marginBottom: 12, width: "100%" }}
          title="Đăng ký"
          lowerCase={true}
          onPress={this.register}
        />
        <Button
          style={{ width: "100%" }}
          title="Đăng nhập"
          lowerCase={true}
          onPress={this.login}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Context.getColor("background")
  },
  imageLogo: {
    width: "75%"
  }
});
