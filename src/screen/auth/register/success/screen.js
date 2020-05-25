import React from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import { BaseScreen, ButtonText, HDText, HDButton } from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    // this.props.navigation.navigate("RegisterSuccess", {
    //   navData: result.payload
    // });

    this.navData = this.props.navigation.getParam("navData");
  }

  pressConfirm = async () => {
    Util.FaceID.auth(async error => {
      if (error.isError) {
        if (error.message) {
          Alert.alert(error.message);
        }
      } else {
        await LocalStorage.saveUserBiometric({
          username: this.navData.customer.username,
          encrypted: this.navData.encrypted
        });

        this.checkLogAPI();

        this.props.navigation.navigate("MainFlow");
      }
    });
  };

  /**Check Log When User agree Biometric */
  checkLogAPI = async () => {
    const { biometricType } = this.props;
    let actionType = "";

    if (biometricType !== -1) {
      if (biometricType === 2 || biometricType === 3) {
        actionType = Util.Constant.CHECK_LOG_ACTION.SET_FINGER;
      } else if (biometricType === 1) {
        actionType = Util.Constant.CHECK_LOG_ACTION.SET_FACE;
      }
    }

    try {
      var result = await Network.checkLogAction(
        this.navData.customer.uuid,
        "",
        actionType
      );

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "BIOMETRIC-CHECK-LOG-COMPLETE" + JSON.stringify(result.payload)
          );
        } else {
          console.log("ERROR-API-BIOMETRIC-CHECK-LOG " + result.code);
        }
      }
    } catch (err) {
      console.log("ERROR-API-BIOMETRIC-CHECK-LOG " + err.message);
    }
  };

  pressCancel = async () => {
    await LocalStorage.saveUser(this.navData);
    this.props.navigation.navigate("MainFlow");
  };

  renderByDevice() {
    const { biometricType } = this.props;
    let iconBiometric = null;
    let strDes = "";

    if (biometricType === 2 || biometricType === 3) {
      iconBiometric = Context.getImage("iconFinger");
      strDes = Context.getString("auth_register_success_description_touch_id");
    } else if (biometricType === 1) {
      iconBiometric = Context.getImage("iconFaceID");
      strDes = Context.getString("auth_register_success_description_face_id");
    }

    return (
      <View style={{ width: "100%", alignItems: "center", marginBottom: 40 }}>
        <View style={styles.face_id_container}>
          <Image style={styles.icon} source={iconBiometric} />
        </View>

        <HDText style={styles.title}>
          {Context.getString("auth_register_success_title")}
        </HDText>
        <HDText style={styles.description}>{strDes}</HDText>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderByDevice()}

        <HDButton
          style={{ width: Context.getSize(239) }}
          title={Context.getString("auth_register_success_button_confirm")}
          isShadow
          onPress={this.pressConfirm}
        />

        <ButtonText
          style={styles.buttonCancel}
          textStyle={styles.cancel_text}
          title={Context.getString("auth_register_success_button_cancel")}
          onPress={this.pressCancel}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  face_id_container: {
    width: Context.getSize(114),
    height: Context.getSize(98),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Context.getSize(10),
    backgroundColor: Context.getColor("background"),
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 0 },
    elevation: 3
  },
  icon: {
    resizeMode: "contain",
    width: Context.getSize(50),
    height: Context.getSize(50),
    tintColor: "#007AFF"
  },
  title: {
    marginTop: 30,
    textAlign: "center",
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(20),
    fontWeight: "bold",
    color: Context.getColor("textStatus"),
    paddingHorizontal: 16
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: "400",
    color: Context.getColor("textStatus"),
    paddingHorizontal: 30
  },
  buttonConfirm: {
    marginTop: 40,
    width: "80%"
  },
  buttonCancel: {
    marginTop: 10,
    width: "80%"
  },
  cancel_text: {
    fontSize: Context.getSize(14),
    color: "#273D52"
  },
  header_image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: Context.getSize(47)
  },
  bottom_image: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Context.getSize(47)
  }
});
