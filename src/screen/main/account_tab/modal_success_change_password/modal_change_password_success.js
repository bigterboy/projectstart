import React, { Component } from "react";
import { StyleSheet, View, Platform, Image } from "react-native";
import { HDButton, HDText, StatusBarCustom } from "component";
import Context from "context";
import Modal from "react-native-modal";
import LocalStorage from "middleware/helper/LocalStorage";

const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
      "REAL_WINDOW_HEIGHT"
    );

export default class ModalChangePasswordSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }
  componentDidMount = async () => {
    const user = await LocalStorage.getUser();
    this.setState({
      user: user.customer
    });
  };

  render() {
    const { isVisible } = this.props
    if (isVisible) {
      return (
        <View
          style={styles.container}>
          <View
            style={styles.content_success_password}>
            <Image
              style={{
                resizeMode: "cover",
                width: "100%",
                height: Context.getSize(116)
              }}
              source={Context.getImage("complete_success")}
            />
            <HDText style={styles.title}>
              {Context.getString(
                "account_profile_change_password_success_line1_message"
              )}
            </HDText>
            <HDText style={styles.content}>
              {Context.getString(
                "account_profile_change_password_success_line2_message"
              )}{" "}
              <HDText style={styles.userNameShow}>{this.state.user.username}</HDText>
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
          {/* <View style={styles.content}>
            
          </View> */}
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
  content_success_password:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 7,
    paddingBottom: 24,
    backgroundColor: 'white'
  },
  title: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(22),
    fontWeight: "bold",
    textAlign: "center",
    color: Context.getColor("text"),
    marginBottom: 8,
  },
  content: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(22),
    fontWeight: '400',
    textAlign: "center",
    marginBottom: Context.getSize(16),
    paddingHorizontal: 16,
  },
  userNameShow: {
    color: "#1E419B",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16
  }
});
