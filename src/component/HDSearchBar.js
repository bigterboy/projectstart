import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  PixelRatio,
  Platform
} from "react-native";
import Context from "context";
import { HDText } from "component";

export default class HDSearchBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {}
  componentDidMount() {}

  getValue = () => {
    return this.state.sliderValue;
  };

  render() {
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        <TextInput
          {...this.props}
          allowFontScaling={false}
          style={[
            styles.input,
            Platform.OS === "android" ? styles.inputFontFamilyAndroid : null
          ]}
        />

        <View style={styles.icon_container}>
          <Image
            source={Context.getImage("iconSearch")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Context.getSize(40),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    backgroundColor: "#F5F5F5"
  },
  icon_container: {
    width: Context.getSize(40),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16
  },
  inputFontFamilyAndroid: {
    fontFamily: "Roboto-Regular"
  }
});
