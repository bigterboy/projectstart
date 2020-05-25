import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { HDText } from "component";
import Context from "context";

export default class HDGroupHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderViewAll = () => {
    if (this.props.rightTitle) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.onPressRight ? this.props.onPressRight() : null
          }
        >
          <View
            style={{
              height: "100%",
              justifyContent: "flex-end",
              paddingLeft: 30
            }}
          >
            <HDText
              style={[styles.right_text, { ...this.props.rightTextStyle }]}
            >
              {this.props.rightTitle}
            </HDText>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    return (
      <View {...this.prop} style={[styles.container, { ...this.props.style }]}>
        <HDText style={[styles.left_text, { ...this.props.leftTextStyle }]}>
          {this.props.leftTitle}
        </HDText>
        {this.renderViewAll()}
      </View>
    );
  }
}

HDGroupHeader.propTypes = {
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  leftTextStyle: Text.propTypes.style,
  rightTextStyle: Text.propTypes.style
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: Context.getSize(27),
    marginBottom: Context.getSize(8),
    paddingHorizontal: Context.getSize(16)
  },
  left_text: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(19),
    fontWeight: "bold",
    color: Context.getColor("groupHeader")
  },
  right_text: {
    fontSize: Context.getSize(12),
    lineHeight: Context.getSize(14),
    fontWeight: "400",
    color: Context.getColor("groupHeader")
  }
});
