/**
 * This Modal using at Forgot Password/Confirm ID
 * when user not register
 * To Back to Register Page
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { HDButton, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow();

export default class ModalNoReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  /**
   * <Function: click button confirm>
   */
  _onConfirm = () => {
    if (this.props.onPressConfirm) this.props.onPressConfirm();
  };

  /**
   * <Function: render content for modal>
   */
  renderContent = () => {
    return (
      <View style={styles.content_container}>
        <HDText style={styles.status_text}>
          {Context.getString("auth_forgot_enter_id_user_no_register")}
        </HDText>

        <HDButton
          isShadow={true}
          title={Context.getString("common_register")}
          onPress={this._onConfirm}
        />
      </View>
    );
  };

  /**
   * <Function: render screen modal>
   */
  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        style={{ justifyContent: "center", alignItems: "center" }}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>{this.renderContent()}</View>
      </Modal>
    );
  }
}

ModalNoReg.propTypes = {
  onPressConfirm: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    width: win.width,
    height: win.height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  content_container: {
    width: "100%",
    borderRadius: 10,
    height: Context.getSize(172),
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  status_text: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(22),
    fontWeight: "400",
    textAlign: "center"
  }
});
