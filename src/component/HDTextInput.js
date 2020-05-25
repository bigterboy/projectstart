/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";

import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import Tooltip from "react-native-walkthrough-tooltip";
import Util from "util";
import Context from "context";
import { HDText } from "component";

const iconHide = Context.getImage("iconEyeHide");
const iconShow = Context.getImage("iconEyeShow");
const platform = Platform.OS;

import numeral from "numeral";

export default class HDTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLabel: false,
      ipValue: "", //this.props.value,
      isSecurity: this.props.isPassword, //Use for show/hide password
      isError: false,
      errorMessage: null,
      toolTipVisible: false,
      editable: true
    };
  }

  _onChangeText = text => {
    const { regexType } = this.props;
    //Nếu là Số HD không có ký tự đặc biệt
    if (regexType === Util.Constant.INPUT_REGEX_TYPE.CONTRACT) {
      text = text.replace(/[^a-zA-Z 0-9.]+/g, "");
    }

    this.setState(
      {
        isError: false,
        ipValue: text
      },
      () => {
        this.props.onChangeTextInput
          ? this.props.onChangeTextInput(text)
          : null;
      }
    );
  };

  _onPressIcon = () => {
    const isPassword = this.props.isPassword;

    if (isPassword) {
      this.setState({
        isSecurity: !this.state.isSecurity
      });
    } else {
      this.props.onRightClick ? this.props.onRightClick() : null;
    }
  };

  getText = () => {
    return this.state.ipValue ? this.state.ipValue : "";
  };

  setText = text => {
    this.setState({
      ...this.state,
      ipValue: text
    });
  };

  enableEdit = () => {
    this.setState({
      editable: true
    });
  };

  disableEdit = () => {
    this.setState({
      editable: false
    });
  };

  //
  setErrorState(isError, message) {
    this.setState({
      isError: isError,
      errorMessage: message
    });
  }

  getErrorState = () => {
    return this.state.isError;
  };

  //check empty input
  empty = () => {
    const value = this.state.ipValue;
    if (value === "") {
      return true;
    }
    return false;
  };

  getTitleLabelState = () => {
    const ipValue = this.state.ipValue;
    if (ipValue == "" || ipValue == undefined || ipValue == NaN) {
      return false;
    } else {
      return true;
    }
  };

  showTooltip = () => {
    this.setState({ toolTipVisible: true });
  };

  hideTooltip = () => {
    this.setState({ toolTipVisible: false });
  };

  renderIconAreaTouch() {
    return (
      <TouchableOpacity
        style={styles.icon_touch_area}
        activeOpacity={1}
        onPress={this._onPressIcon}
      />
    );
  }

  /** Render Tooltip content */
  tooltipContent = () => {
    return (
      <View style={{ paddingHorizontal: Context.getSize(8) }}>
        <HDText
          style={[styles.input_label, { marginBottom: Context.getSize(4) }]}
        >
          {this.props.label}
        </HDText>
        <HDText
          style={[styles.input_text, { color: Context.getColor("textBlack") }]}
        >
          {this.state.ipValue}
        </HDText>
      </View>
    );
  };

  renderTooltip = () => {
    const { showTooltip } = this.props;
    if (showTooltip) {
      return (
        <View style={styles.area_touch_tooltip}>
          <Tooltip
            animated
            placement="center"
            isVisible={this.state.toolTipVisible}
            content={this.tooltipContent()}
            onClose={this.hideTooltip}
          >
            <TouchableHighlight
              style={styles.touch_tooltip}
              underlayColor="transparent"
              activeOpacity={1}
              onPress={this.showTooltip}
            >
              <HDText>{""}</HDText>
            </TouchableHighlight>
          </Tooltip>
        </View>
      );
    }
    return null;
  };

  render() {
    const ipValue = this.state.ipValue;
    const label = this.props.label;
    const isShowLabel = this.props.showLabel ? true : this.getTitleLabelState();
    // const isShowLabel = this.state.isShowLabel
    const isPassword = this.props.isPassword;
    const iconPassword = this.state.isSecurity ? iconHide : iconShow;
    const isRightIcon = this.props.isRightIcon;
    const isError = this.state.isError;
    const borderColor = isError
      ? "#BE1028"
      : this.props.inputContainerStyle
      ? this.props.inputContainerStyle.borderColor
      : "#7F8D9F";
    const labelColor = isError
      ? Context.getColor("primary")
      : Context.getColor("textBlack");
    const errMessage = isError ? this.state.errorMessage : null;

    //Input He
    // const containerHeight = isError ? 70 : 50;
    const containerHeight = 70;

    return (
      <View style={{ width: "100%" }}>
        {this.renderIconAreaTouch()}

        {this.renderTooltip()}

        <Input
          {...this.props}
          autoCorrect={false}
          allowFontScaling={false}
          containerStyle={[
            styles.input_container,
            { ...this.props.containerStyle }
          ]}
          labelStyle={[
            styles.input_label,
            { color: labelColor },
            { ...this.props.labelStyle },
            platform === "android"
              ? { fontFamily: "Roboto-Regular", fontWeight: null }
              : null
          ]}
          labelProps={{
            allowFontScaling: false
          }}
          placeholder={this.props.placeholder}
          label={isShowLabel ? label : null}
          value={this.state.ipValue}
          errorMessage={errMessage}
          secureTextEntry={this.state.isSecurity}
          inputContainerStyle={[
            { ...this.props.inputContainerStyle },
            { borderColor: borderColor }
          ]}
          inputStyle={[
            styles.input_text,
            platform === "android"
              ? { color: isError ? "#BE1028" : "#232323" }
              : { color: "#232323" },
            { ...this.props.inputStyle },
            platform === "android"
              ? { fontFamily: "Roboto-Regular", fontWeight: null }
              : null
          ]}
          rightIcon={
            isRightIcon ? (
              <Icon
                size={26}
                onPress={this._onPressIcon}
              >
                <Image
                  source={isPassword ? iconPassword : this.props.iconSource}
                  style={styles.right_icon}
                  resizeMode="stretch"
                ></Image>
              </Icon>
            ) : null
          }
          onFocus={() => {
            this.setState({
              isShowLabel: true
            });

            this.props.focusInput ? this.props.focusInput() : null;
          }}
          onBlur={() => {
            if (ipValue == "" || ipValue == undefined || ipValue == NaN) {
              this.setState({
                isShowLabel: false
              });
            }
            this.props.blurInput ? this.props.blurInput() : null;
          }}
          onChangeText={this._onChangeText}
          editable={
            this.props.editable || this.props.editable === false
              ? this.props.editable
              : this.state.editable
          }
        />
      </View>
    );
  }
}

HDTextInput.propTypes = {
  isPassword: PropTypes.bool, //Use for password, only password have show/hide
  isRightIcon: PropTypes.bool, //Right Icon or no Icon
  isError: PropTypes.bool,
  showLabel: PropTypes.bool, //Use if want to show label every time,
  // iconSource: PropTypes.element
  showTooltip: PropTypes.bool, //Show content if input too length
  regexType: PropTypes.string //Util.Constant.INPUT_REGEX_TYPE
};

const styles = StyleSheet.create({
  input_container: {
    width: "100%",
    height: Context.getSize(50),
    marginBottom: Context.getSize(16),
    paddingHorizontal: 0
  },
  input_label: {
    // color: "#7F8D9F",
    fontSize: Context.getSize(10),
    fontWeight: "500",
    marginBottom:
      platform === "ios" ? Context.getSize(-4) : Context.getSize(-12)
  },
  input_text: {
    fontSize: Context.getSize(14),
    marginBottom:
      platform === "ios" ? Context.getSize(-4) : Context.getSize(-12)
  },
  right_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16),
    marginBottom:
      platform === "ios" ? Context.getSize(-4) : Context.getSize(-12)
  },
  icon_touch_area: {
    position: "absolute",
    zIndex: 10,
    width: "20%",
    right: 0,
    height: "100%",
    backgroundColor: "transparent"
  },
  area_touch_tooltip: {
    position: "absolute",
    zIndex: 1000,
    left: 0,
    right: 0,
    height: Context.getSize(50)
  },
  touch_tooltip: {
    width: "100%",
    height: Context.getSize(50)
  }
});
