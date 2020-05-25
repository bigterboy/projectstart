import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { HDText } from "component";
import PropTypes from "prop-types";
import Context from "context";

export default class HDButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledTouch: false
    };
  }

  componentDidMount() { }

  renderIcon = () => {
    if (this.props.leftIcon) {
      return (
        <Image
          source={this.props.leftIcon}
          style={styles.icon}
          resizeMode="contain"
        />
      );
    }
    return null;
  };

  setDisabled = (disable) => {
    this.setState({
      disabledTouch: disable
    });
  };

  render() {
    const { isShadow } = this.props;
    const { disabledTouch } = this.state;

    return (
      <TouchableOpacity
        {...this.props}
        disabled={disabledTouch}
        style={[
          styles.container,
          isShadow ? styles.shadow : null,
          disabledTouch ? styles.disabled : null,
          { ...this.props.style }
        ]}
        onPress={this.props.onPress}
      >
        {this.renderIcon()}
        <HDText
          style={[styles.text, { ...this.props.textStyle }]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {this.props.title}
        </HDText>
      </TouchableOpacity>
    );
  }
}

HDButton.propTypes = {
  title: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Context.getSize(50),
    backgroundColor: Context.getColor("accent"),
    borderRadius: 25
  },
  disabled: {
    backgroundColor: Context.getColor("hint")
  },
  shadow: {  
    shadowColor: "#707070",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.0,
    shadowRadius: 1.0,
    elevation: 3
  },
  text: {
    
    fontSize: Context.getSize(14),
    fontWeight: "700",
    color: "#FFFFFF"
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10
  }
});
