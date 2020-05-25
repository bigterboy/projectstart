import React, { Component } from "react";
import { StyleSheet, View, Text, Platform, Image } from "react-native";
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
    // this.state = {
    //   user: []
    // };
  }
  componentDidMount = async () => {
    // const user = await LocalStorage.getUser();
    // this.setState({
    //   user: user.customer
    // });
    //console.log("GET USER LOCAL: " + JSON.stringify(this.state.customer.username));
  };

  render() {
    //const user = await LocalStorage.getUser();
    const { isVisible } = this.props
    if (isVisible) {
      return (
        <View style={styles.container}>
          <View style={styles.content_form}>
            <Image
              style={{
                resizeMode: "cover",
                height: Context.getSize(116),
                width: "100%"
              }}
              source={Context.getImage("complete_success")}
            />
            <HDText style={styles.title}>
              {Context.getString(
                "account_profile_change_password_success_line1_message"
              )}
              {/* {this.state.user.username} */}
              {/* {this.props.userName} */}
            </HDText>
            <HDText style={styles.content}>
              {Context.getString(
                "account_profile_change_password_success_line2_message"
              )}{" "}
              <HDText style={styles.userNameShow}>
                {this.props.username ? this.props.username : null}
              </HDText>
            </HDText>
            {/* <HDText style={styles.title}>
            Tên đăng nhập của Quý khách là
          </HDText> */}
            <View style={styles.buttonContainer}>
              <HDButton
                title={Context.getString(
                  "account_profile_confirm_success_message"
                )}
                isShadow={true}
                onPress={this.props.confirmModal}
              />
            </View>
          </View>
        </View>
      )
    } else {
      return null
    }
    // return (
    //   <Modal
    //     transparent
    //     deviceWidth={Context.getWindow().width}
    //     deviceHeight={deviceHeight}
    //     style={styles.modal}
    //     hideModalContentWhileAnimating={true}
    //     useNativeDriver={true}
    //     backdropOpacity={0.5}
    //     animationIn="zoomInDown"
    //     animationOut="fadeOutDown"
    //     animationOutTiming={200}
    //     onBackButtonPress={this.props.closeModal}
    //     onBackdropPress={this.props.closeModal}
    //     {...this.props}
    //   >

    //     {/* android tai thỏ cần cái này */}
    //     <StatusBarCustom />  

    //     <View style={styles.container}>
    //       <Image
    //         style={{
    //           resizeMode: "cover",
    //           height:Context.getSize(116),
    //           width: "100%"
    //         }}
    //         source={Context.getImage("complete_success")}
    //       />
    //       <HDText style={styles.title}>
    //         {Context.getString(
    //           "account_profile_change_password_success_line1_message"
    //         )}
    //         {/* {this.state.user.username} */}
    //         {/* {this.props.userName} */}
    //       </HDText>
    //       <HDText style={styles.content}>
    //         {Context.getString(
    //           "account_profile_change_password_success_line2_message"
    //         )}{" "}
    //         <HDText style={styles.userNameShow}>
    //           {this.props.username ? this.props.username : null}
    //         </HDText>
    //       </HDText>
    //       {/* <HDText style={styles.title}>
    //         Tên đăng nhập của Quý khách là
    //       </HDText> */}
    //       <View style={styles.buttonContainer}>
    //         <HDButton
    //           title={Context.getString(
    //             "account_profile_confirm_success_message"
    //           )}
    //           isShadow={true}
    //           onPress={this.props.confirmModal}
    //         />
    //       </View>
    //     </View>
    //   </Modal>
    // );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Context.getColor("modalBackground")
  },
  content_form: {
    paddingVertical: Context.getSize(20),
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: Context.getColor("background"),
    borderRadius: 7
  },
  title: {
    fontSize: Context.getSize(16),
    textAlign: "center",
    fontWeight: "bold",
    marginTop: Context.getSize(8),
    color: Context.getColor("text"),
    marginBottom: Context.getSize(8),
    lineHeight: 22
  },
  content: {
    fontSize: Context.getSize(14),
    textAlign: "center",
    marginBottom: Context.getSize(16),
    paddingHorizontal: 16,
  },
  userNameShow: {
    color: "#1E419B",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    marginHorizontal: 20
  }
});
