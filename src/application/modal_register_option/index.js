/**
 * This Modal using at Home Page
 * Show popup Contract Adjustment
 */

import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";
import { HDButton, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow();

export default class ModalRegisterOption extends Component {
  constructor(props) {
    super(props);
  }

  renderCloseX() {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "flex-end"
        }}
      >
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 8 }}
        >
          <Image
            source={Context.getImage("closePopup")}
            style={styles.close_icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onHaveContract = () => {
    if (this.props.onHaveContract) this.props.onHaveContract();
  };

  onNoContract = () => {
    if (this.props.onNoContract) this.props.onNoContract();
  };

  renderContent = () => {
    return (
      <View style={styles.content_container}>
        <HDText style={styles.title}>
          {Context.getString("modal_register_option_title")}
        </HDText>
        <HDText style={styles.message}>
          {Context.getString("modal_register_option_message")}
        </HDText>

        <HDButton
          title={Context.getString(
            "modal_register_option_button_have_contract"
          )}
          isShadow
          style={styles.button_have_contract}
          onPress={this.onHaveContract}
        />

        <HDButton
          title={Context.getString("modal_register_option_button_no_contract")}
          isShadow
          style={styles.button_no_contract}
          textStyle={styles.button_no_contract_text}
          onPress={this.onNoContract}
        />
      </View>
    );
  };

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
        style={{
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
          height: "100%"
        }}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>
          {this.renderCloseX()}

          {this.renderContent()}
        </View>

        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={{
            height: Context.getSize(100),
            width: Context.getSize(80),
            position: "absolute",
            top: Context.getSize(
              Context.getWindow().height / 2 - Context.getSize(240)
            ),
            right: -20,
          }}
        />

      </Modal>
    );
  }
}

ModalRegisterOption.propTypes = {
  onHaveContract: PropTypes.func,
  onNoContract: PropTypes.func
};

const styles = StyleSheet.create({
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white"
  },
  title: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(20),
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 24
  },
  message: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 24
  },
  button_have_contract: {
    marginBottom: 16
  },
  button_no_contract: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: Context.getColor("normalBorder")
  },
  button_no_contract_text: {
    color: Context.getColor("textBlack")
  }
});
