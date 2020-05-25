import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Context from "context";
import { HDButton, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";

export default class ModalWarnPhone extends Component {
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

        <View style={[styles.container, this.props.containerStyle]}>
          <HDText style={styles.title}>
            <HDText>{Context.getString("auth_modal_call_guide_1")} </HDText>
            <HDText style={styles.titleBold}>
              {Context.getString("auth_modal_call_guide_2_1")}
              <HDText style={{color:"white"}}>-</HDText>
              {Context.getString("auth_modal_call_guide_2_2")}
            </HDText>

            <HDText>{Context.getString("auth_modal_call_guide_4")}</HDText>
          </HDText>
          <View style={styles.buttonContainer}>
            <HDButton
              title={Context.getString("auth_modal_call_button_call_center")}
              isShadow={true}
              onPress={this.props.callCenter}
              leftIcon={Context.getImage("iconPhoneCall")}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: { margin: 0 },
  container: {
    padding: 16,
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
    marginBottom: 16,
    color: Context.getColor("text"),
    lineHeight: 22,
  },
  titleBold: { fontWeight: "bold", color: "#1E419B" },
  buttonContainer: {
    flexDirection: "column"
  }
});
