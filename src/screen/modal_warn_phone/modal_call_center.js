import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Context from "context";
import { HDButton, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";

export default class ModalWarnPhone extends Component {
  renderCloseX = () => {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "flex-end"
          //paddingHorizontal:16
        }}
      >
        <TouchableOpacity
          onPress={this.props.closeModal ? this.props.closeModal : null}
          style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 16 }}
        >
          <Image
            source={Context.getImage("closePopup")}
            style={styles.close_icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render Message By Type (Register, Forgot, Esign, Adjustment)
   */
  renderMesByType = () => {
    const { type } = this.props;
    if (type === "RegisterEnterOtp") {
      return <HDText>{Context.getString("modal_call_guide_register")}</HDText>;
    } else if (type === "ForgotEnterOtp") {
      return <HDText>{Context.getString("modal_call_guide_forgot")}</HDText>;
    } else if (type === "LoanESignEnterOtp") {
      return <HDText>{Context.getString("modal_call_guide_esigned")}</HDText>;
    } else if (type === "LoanESignSubOtp") {
      return (
        <HDText>{Context.getString("modal_call_guide_adjustment")}</HDText>
      );
    }
  };

  render() {
    return (
      <Modal
        transparent
        style={styles.modal}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View
          style={{
            //marginHorizontal: 16,
            width: "93%",
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          {this.renderCloseX()}

          <View style={[styles.container, this.props.containerStyle]}>
            <HDText style={styles.title}>
              <HDText>{Context.getString("auth_modal_call_guide_1")} </HDText>
              <HDText style={styles.titleBold}>
                {Context.getString("auth_modal_call_guide_2_1")}
                <HDText style={{ color: "white" }}>-</HDText>
                {Context.getString("auth_modal_call_guide_2_2")}
              </HDText>

              {this.renderMesByType()}
            </HDText>
            <View style={styles.buttonContainer}>
              <HDButton
                title={Context.getString("auth_modal_call_button_call_center")}
                leftIcon={Context.getImage("iconPhoneCall")}
                isShadow={true}
                onPress={this.props.callCenter}
              />
            </View>
          </View>
          <View style={styles.space} />
        </View>
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={{
            height: Context.getSize(100),
            width: Context.getSize(70),
            position: "absolute",
            top: Context.getSize(
              Context.getWindow().height / 2 - Context.getSize(165)
            ),
            right: 0
          }}
        />
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: { margin: 0 },
  container: {
    padding: 20,
    alignContent: "center",
    alignSelf: "center",
    //width: "90%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: Context.getColor("text"),
    lineHeight: 22,
  },
  titleBold: { fontWeight: "bold", color: "#1E419B" },
  buttonContainer: {
    flexDirection: "column"
  },
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  space: {
    height: Context.getSize(50)
  }
});
