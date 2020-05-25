import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import PropTypes from "prop-types";
import Context from "context";

const imgArrowDown = Context.getImage("arrowDown");

export default class HDSelectionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  _onPressInput = () => {
    this.setState({ value: "You selected" });
  };

  setValue = value => {
    this.setValue({
      value: value
    });
  };

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, { ...this.props.style }]}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            {...this.props}
            allowFontScaling={false}
            placeholder={this.props.placeholder}
            placeholderTextColor="#757575"
            // value={this.state.value}
            style={[
              styles.input,
              Platform.OS === "android" ? styles.inputFontFamilyAndroid : null
            ]}
            editable={false}
          />
        </View>

        <View
          style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
        ></View>

        <Image
          source={imgArrowDown}
          style={styles.icon}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    );
  }
}

HDSelectionInput.propTypes = {
  placeholder: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: Context.getSize(34),
    borderRadius: Context.getSize(5),
    borderWidth: 1,
    borderColor: Context.getColor("inputBorder"),
    paddingHorizontal: 10,
    backgroundColor: Context.getColor("background")
  },
  icon: {
    width: Context.getSize(8),
    height: Context.getSize(12)
  },
  input: {
    fontSize: Context.getSize(12),
    fontWeight: "400",
    height: "100%",
    fontFamily: "Roboto-Regular"
  },
  inputFontFamilyAndroid: {
    fontFamily: "Roboto-Regular"
  }
});
