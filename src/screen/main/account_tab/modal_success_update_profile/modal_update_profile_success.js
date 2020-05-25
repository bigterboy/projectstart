import React, { Component } from "react";
import { StyleSheet, View, Platform, Image } from "react-native";
import { HDButton, HDText, StatusBarCustom } from "component";
import Context from "context";
import Modal from "react-native-modal";
const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
      "REAL_WINDOW_HEIGHT"
    );

export default class ModalChangePasswordSuccess extends Component {
  render() {
    const { isVisible } = this.props
    if (isVisible) {
      return (
        <View
          style={styles.container}>
          <View style={styles.content_success_profile}>
            <Image
              style={{
                resizeMode: "cover",
                height: Context.getSize(116),
                width: "100%"
              }}
              source={Context.getImage("complete_success")}
            />
            <HDText style={styles.title}>
              {Context.getString("account_profile_change_infor_success_message")}
            </HDText>
            <View style={styles.buttonContainer}>
              <HDButton
                title={Context.getString(
                  "account_profile_confirm_success_message"
                )}
                isShadow={true}
                onPress={() => {
                  this.props.closeModal();
                }}
              />
            </View>
          </View>
        </View>
      );
    }
    return null
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Context.getColor("modalBackground")
  },
  content_success_profile: {
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7,
    paddingBottom: Context.getSize(24),
  },
  title: {
    fontSize: Context.getSize(16),
    textAlign: "center",
    fontWeight: "bold",
    color: Context.getColor("text"),
    marginBottom: Context.getSize(16)
  },
  buttonContainer: {
    flexDirection: "column",
    paddingHorizontal: 16
  }
});
