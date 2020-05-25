import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Context from "context";
import { HDButton, ButtonImage, HDText,StatusBarCustom } from "component";
import Modal from "react-native-modal";

const win = Context.getWindow();

export default class ModalMenu extends Component {
  renderSubBtn = () => {
    if (this.props.subButtonTitle) {
      return (
        <HDButton
          title={this.props.subButtonTitle}
          style={{ backgroundColor: "transparent" }}
          textStyle={{
            marginBottom: 8,
            fontWeight: "400",
            color: Context.getColor("textBlack")
          }}
          onPress={() =>
            this.props.onPressSubBtn ? this.props.onPressSubBtn() : null
          }
        />
      );
    }
    return null;
  };

  _onPressItem = () => {
    this.props.onPressItem ? this.props.onPressItem() : null;
  };

  _onPressClose = () => {
    this.props.onPressClose ? this.props.onPressClose() : null;
  };

  render() {
    const { menuPosition } = this.props;
    return (
      <Modal
        {...this.props}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        style={{ justifyContent: "center", alignItems: "center" }}
      >

        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />  

        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              borderRadius: 10,
              marginBottom: win.height - menuPosition.y - menuPosition.height
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16
              }}
            >
              <HDText style={[styles.text, { ...this.props.textStyle }]}>
                Thêm hợp đồng
              </HDText>
              <ButtonImage
                iconSource={Context.getImage("menuAddContract")}
                style={{
                  width: Context.getSize(48),
                  height: Context.getSize(48),
                  borderRadius: Context.getSize(48 / 2),
                  backgroundColor: Context.getColor("background")
                }}
                iconStyle={{
                  width: Context.getSize(28),
                  height: Context.getSize(28)
                }}
                onPress={this._onPressItem}
              />
            </View>

            <ButtonImage
              iconSource={Context.getImage("menuCancel")}
              style={{
                width: Context.getSize(48),
                height: Context.getSize(48),
                borderRadius: Context.getSize(48 / 2),
                backgroundColor: Context.getColor("accent2"),
                marginBottom: Platform.OS === "ios" ? 0 : Context.getSize(11.5)
              }}
              iconStyle={{
                width: Context.getSize(16),
                height: Context.getSize(16)
              }}
              onPress={this._onPressClose}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

ModalMenu.propTypes = {};

const styles = StyleSheet.create({
  container: {
    width: win.width,
    height: win.height,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16
  },
  text: {
    color: Context.getColor("textWhite"),
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    lineHeight: Context.getSize(19),
    paddingRight: 16
  }
});
