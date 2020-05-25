import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import Context from "context";
import { HDButton, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";

const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export default class ModalWarnPhone extends Component {
  renderContent = () => {
    if (this.props.type === "RegisterEnterOtp") {
      return (
        <HDText>{Context.getString("auth_modal_warn_guide_01_01")}</HDText>
      );
    } else if (this.props.type === "ForgotEnterOtp") {
      return (
        <HDText>{Context.getString("auth_modal_warn_guide_01_02")}</HDText>
      );
    } else if (this.props.type === "LoanESignEnterOtp") {
      //phải check lại
      return (
        <HDText>{Context.getString("auth_modal_warn_guide_01_03")}</HDText>
      );
    } else if (this.props.type === "LoanESignSubOtp") {
      return (
        <HDText>{Context.getString("auth_modal_warn_guide_01_04")}</HDText>
      );
    }
  };

  renderClose = () => {
    return (
      <View style={styles.containerIMGCloseButton}>
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          //onPress={()=>}
          style={styles.areaTouchable}
        >
          <Image
            source={Context.getImage("closePopup")}
            style={styles.close_icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        // <Modal
        //   transparent
        //   style={styles.modal}
        //   deviceHeight={deviceHeight}
        //   hideModalContentWhileAnimating={true}
        //   useNativeDriver={true}
        //   backdropOpacity={0.5}
        //   animationIn="zoomInDown"
        //   animationOut="fadeOut"
        //   animationOutTiming={200}
        //   // onBackButtonPress={this.props.onCancel}
        //   {...this.props}
        // >

        //   {/* android tai thỏ cần cái này */}
        //   <StatusBarCustom />

        //   {this.renderCloseX}
        //   <View style={[styles.container, this.props.containerStyle]}>
        //     <HDText style={styles.title}>
        //       {this.renderContent()}
        //       {/* <HDText>{Context.getString("auth_modal_warn_guide_01_02")}</HDText> */}
        //       <HDText style={styles.phone}>{this.props.securityPhone}</HDText>
        //       <HDText>{Context.getString("auth_modal_warn_guide_02")}</HDText>
        //     </HDText>
        //     <HDText style={styles.content}>
        //       {Context.getString("auth_modal_warn_question")}
        //     </HDText>
        //     <View style={styles.buttonContainer}>
        //       <HDButton
        //         title={Context.getString("auth_modal_warn_button_confirm")}
        //         style={styles.confirm_button}
        //         isShadow={true}
        //         onPress={this.props.acceptOtp}
        //       />

        //       <HDButton
        //         title={Context.getString("auth_modal_warn_button_change_phone")}
        //         style={styles.change_button}
        //         textStyle={styles.change_button_text}
        //         isShadow={true}
        //         onPress={this.props.changePhone}
        //       />
        //     </View>
        //   </View>
        // </Modal>

        <View style={styles.container}>
          {this.renderClose()}
          <View style={[styles.content_form, this.props.containerStyle]}>
            <HDText style={styles.title}>
              {this.renderContent()}
              {/* <HDText>{Context.getString("auth_modal_warn_guide_01_02")}</HDText> */}
              <HDText style={styles.phone}>{this.props.securityPhone}</HDText>
              <HDText>{Context.getString("auth_modal_warn_guide_02")}</HDText>
            </HDText>
            <HDText style={styles.content}>
              {Context.getString("auth_modal_warn_question")}
            </HDText>
            <View style={styles.buttonContainer}>
              <HDButton
                title={Context.getString("auth_modal_warn_button_confirm")}
                style={styles.confirm_button}
                isShadow={true}
                onPress={this.props.acceptOtp}
              />

              <HDButton
                title={Context.getString("auth_modal_warn_button_change_phone")}
                style={styles.change_button}
                textStyle={styles.change_button_text}
                isShadow={true}
                onPress={this.props.changePhone}
              />
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Context.getColor("modalBackground")
  },
  content_form: {
    padding: 20,
    alignContent: "center",
    alignSelf: "center",
    width: "90%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7
  },
  title: {
    fontSize: Context.getSize(14),
    textAlign: "center",
    marginBottom: 12,
    color: Context.getColor("text")
  },
  content: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: Context.getSize(15),
    color: Context.getColor("text")
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 30
  },
  confirm_button: { marginBottom: 16 },
  change_button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Context.getColor("normalBorder")
  },
  change_button_text: {
    fontWeight: "400",
    color: Context.getColor("otpButtonText")
  },
  phone: {
    color: Context.getColor("textBlue1"),
    fontWeight: "bold"
  },
  containerIMGCloseButton: {
    width: Context.getWindow().width,
    alignItems: "flex-end",
    paddingBottom: Context.getSize(8),
    paddingRight: Context.getSize(4)
  },
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  areaTouchable: {
    paddingLeft: Context.getSize(30),
    paddingBottom: Context.getSize(2),
    paddingRight: Context.getSize(15)
  }
});
