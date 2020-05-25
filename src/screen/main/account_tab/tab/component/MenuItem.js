import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { HDText } from "component";
import Context from "context";

export default class MenuItem extends Component {
  /**
   * <Function: constructor>
   * @param switchValue check switch on or off
   * @param isDisabled  avoid user touch more times 
   */
  constructor(props) {
    super(props);
    this.state = {
      switchValue: this.props.switchOn,
      isDisabled: false,
    };
  }

  /**
   * <Function: check and render line>
   * @param isShow true or false
   */
  getLineBottom = (isShow = true) => {
    return isShow ? <View style={styles.line} /> : undefined;
  };
  /**
   * <Function: check and render arrow>
   * @param isShow true or false
   */
  getArrow(isShow = true) {
    const { disableFeature } = this.props
    return isShow ? (
      <Image
        source={Context.getImage("arrowRight")}
        style={[
          styles.arrow,
          (disableFeature) ? styles.disable_icon : null
        ]} />
    ) : (
        undefined
      );
  }

  /**
   * <Function: check and render switch>
   * @param isShow true or false
   */
  getSwitch(isShow = false) {
    return isShow ? (
      this.state.switchValue ? (
        <TouchableOpacity
          activeOpacity={1}
          disabled={this.state.isDisabled}
          onPress={this._onPressSwitch}
        >
          <Image source={Context.getImage("icon_Switch_On")} />
        </TouchableOpacity>
      ) : (
          <TouchableOpacity
            activeOpacity={1}
            disabled={this.state.isDisabled}
            onPress={this._onPressSwitch}
          >
            <Image source={Context.getImage("icon_Switch_Off")} />
          </TouchableOpacity>
        )
    ) : (
        undefined
      );
  }

  /**
   * <Function: call when user touch switch>
   * @param value of swtich
   */
  toggleSwitch = value => {
    if (value == undefined) value = !this.state.switchValue;
    this.setState({
      switchValue: value
    });
    return value;
  };

  /**
   * <Function: get value of switch>
   */
  getSwitchValue = () => {
    return this.state.switchValue;
  };

  /**
   * <Function:  press item>
   */
  _onPressItem = () => {
    this.setState({ isDisabled: true }, () => {
      setTimeout(() => {
        this.setState({ isDisabled: false });
      }, 1000);
    });
    if (this.props.onPress) this.props.onPress();
  };

  /**
   * <Function: press switch>
   */
  _onPressSwitch = () => {
    this.setState({ isDisabled: true }, () => {
      setTimeout(() => {
        this.setState({ isDisabled: false });
      }, 1000);
    });

    this.setState({ switchValue: !this.state.switchValue });
    if (this.props.onPress) this.props.onPress();
  };

  /**
   * get status of item 
   * Disabled or not disabled
   */
  getDisabledState = () => {
    const { disableFeature } = this.props
    return (disableFeature) ? disableFeature : this.state.isDisabled
  }

  /**
   * <Function: render screen>
   */
  render() {
    const { disableFeature } = this.props
    let showLine = true;
    if (this.props.showLine == false) showLine = false;
    let showArrow = true;
    if (this.props.showArrow == false) {
      showArrow = false;
      return (
        <TouchableOpacity
          style={styles.container}
          disabled={this.getDisabledState()}
          onPress={this._onPressItem}
          activeOpacity={1}
        >
          <View style={styles.content}>
            <Image
              source={this.props.icon}
              style={[
                styles.icon,
                (disableFeature) ? styles.disable_icon : null
              ]} />
            <HDText style={[
              styles.text,
              this.props.titleStyle,
              (disableFeature) ? styles.disable_text : null
            ]}>
              {this.props.title}
            </HDText>
            {this.getArrow(showArrow)}
            {this.getSwitch(this.props.showSwitch)}
          </View>
          {this.getLineBottom(showLine)}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          disabled={this.getDisabledState()}
          onPress={this._onPressItem}
        >
          <View style={styles.content}>
            <Image
              source={this.props.icon}
              style={[
                styles.icon,
                (disableFeature) ? styles.disable_icon : null
              ]} />
            <HDText style={[
              styles.text,
              this.props.titleStyle,
              (disableFeature) ? styles.disable_text : null
            ]}>
              {this.props.title}
            </HDText>
            {this.getArrow(showArrow)}
            {this.getSwitch(this.props.showSwitch)}
          </View>
          {this.getLineBottom(showLine)}
        </TouchableOpacity>
      );
    }
  }
}

MenuItem.propTypes = {
  disableFeature: PropTypes.bool  //Use to disable feature
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Context.getSize(54)
  },
  line: {
    width: "100%",
    height: Context.getSize(1),
    backgroundColor: "#E7ECF0"
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: Context.getSize(16),
    height: Context.getSize(16),
    alignSelf: "center",
    resizeMode: "contain",
    marginLeft: 2
  },
  arrow: {
    width: Context.getSize(16),
    height: Context.getSize(16),
    alignSelf: "center",
    resizeMode: "contain"
  },
  text: {
    flex: 1,
    fontSize: Context.getSize(14),
    color: Context.getColor("text"),
    textAlignVertical: "center",
    marginLeft: 16,
    fontWeight: "400"
  },
  disable_text: {
    color: Context.getColor("textHint")
  },
  disable_icon: {
    tintColor: Context.getColor("textHint")
  }
});
