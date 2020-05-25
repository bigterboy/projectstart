import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { HDText } from "component";
import Context from "context";

const borderRadius = 3;
export default class HDGuidView extends Component {
  constructor(props) {
    super(props);
  }

  _onPressItem = index => {
    this.props.onPressItem(index);
  };

  render() {
    return (
      // <View style={styles.guid_container}>
      <View style={styles.guid_container}>
        <TouchableOpacity
          style={styles.containerBackground}
          onPress={() => this._onPressItem(0)}
        >
          <ImageBackground
            source={Context.getImage("guid01")}
            style={styles.styleImageBackground}
            imageStyle={{ borderRadius: borderRadius }}
          >
            <HDText style={[styles.guid_title_text, { paddingTop: 14 }]}>
              Cửa hàng gần bạn
            </HDText>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerBackground}
          onPress={() => this._onPressItem(2)}
        >
          <ImageBackground
            source={Context.getImage("guid03")}
            style={styles.styleImageBackground}
            imageStyle={{ borderRadius: borderRadius }}
          >
            <HDText
              style={[
                styles.guid_title_text,
                { paddingTop: Context.getSize(14) }
              ]}
            >
              {"Hướng dẫn"}
            </HDText>
            <HDText style={styles.guid_title_text}>{"thanh toán"}</HDText>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

HDGuidView.propTypes = {
  // onPressItem: PropTypes.func
};

const styles = StyleSheet.create({
  guid_container: {
    flex: 1,
    flexDirection: "row",
    height: Context.getSize(186),
    marginHorizontal: Context.getSize(8),
    marginBottom: Context.getSize(30)
  },
  guid_title_text: {
    fontSize: Context.getSize(14),
    fontWeight: "700",
    color: Context.getColor("textWhite"),
    textAlign: "center"
  },
  styleImageBackground: {
    width: "100%",
    height: "100%"
  },
  containerBackground: {
    flex: 1,
    marginHorizontal: Context.getSize(8)
  }
});
