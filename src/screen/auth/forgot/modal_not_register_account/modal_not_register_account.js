import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Button, HDText, StatusBarCustom } from "component";
import Context from "context";
import Modal from "react-native-modal";
const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export default class ModalNotRegisterAccount extends Component {
  /**
   * <Function: render modal>
   */
  render() {
    return (
      <Modal
        transparent
        deviceWidth={Context.getWindow().width}
        deviceHeight={deviceHeight}
        style={styles.modal}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="fadeOutDown"
        animationOutTiming={200}
        onBackButtonPress={this.props.closeModal}
        onBackdropPress={this.props.closeModal}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>
          <HDText style={styles.title}>
            Quý khách chưa đăng ký tài khoản trực tuyến với HDSaison. Vui lòng
            đăng ký tài khoản trực tuyến để sử dụng dịch vụ.
          </HDText>
          <View style={styles.buttonContainer}>
            <Button
              title="Đăng ký"
              lowerCase={true}
              onPress={this.props.goToRegister}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    padding: 20,
    alignContent: "center",
    alignSelf: "center",
    width: "90%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    color: Context.getColor("text")
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 20
  }
});
