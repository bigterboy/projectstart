import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import {
  BaseScreen,
  HDRoundView,
  HDTextInput,
  HDErrorMessage,
  HDButton,
  DismissKeyboardView,
  KeyboardAvoiding,
  HDText
} from "component";
import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      isShowOTP: false
    }
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser()
    this.username.setText(this.storeUser.customer.username)
  }

  onChangeInput = () => {
  };

  goToForgot = () => {
    this.props.navigation.navigate("ForgotEnterId", {
      navData: {
        parent: "LoanESignSub"
      }
    });
  };

  onPressLogin = () => {
    this.validateSignInAPI(
      this.username.getText(),
      this.password.getText(),
      false
    )
  }

  validateSignInAPI = async (username, password, isEncrypt) => {
    const { objEsign } = this.props
    try {
      Context.application.showLoading();
      const result = await Network.esignValidateSignIn(
        username,
        password,
        isEncrypt
      )
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          console.log("API-VALIDATE-SIGNIN-COMPLETE: " + JSON.stringify(result.code))
          this.props.navigation.navigate("LoanESignSubOtp", {
            navData: {
              customerUuid: this.storeUser.customer.uuid,
              contractUuid: objEsign.data.contractUuid,
              phoneNumber: objEsign.data.phoneNumber,
              contractCode: objEsign.data.contractNumber
            }
          });

        } else {
          console.log("ERROR-API-VALIDATE-SIGNIN: " + JSON.stringify(result.code))
          console.log("ERROR-API-VALIDATE-SIGNIN: " + Network.getMessageFromCode(result.code))
          this.setErrorMessage(Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-FORGOT-GET-OTP: " + err.message)
      Context.application.hideLoading();
      this.setErrorMessage(err.message)
    }
  }

  setErrorMessage(message) {
    this.setState({
      errorMessage: message
    })
  }

  renderErrMessage() {
    return (
      <HDErrorMessage
        style={styles.error}
        textStyle={styles.error_text}
        errorMessage={this.state.errorMessage} />
    )
  }

  //render FaceID button for device support biometry
  renderBtnFaceID = () => {
    const { biometricType } = this.props
    let iconBiometric = null

    console.log("renderBtnFaceID: :" + biometricType)

    if (biometricType === 2 || biometricType === 3) {
      iconBiometric = Context.getImage("iconFinger")
    } else if (biometricType === 1) {
      iconBiometric = Context.getImage("iconFaceID");
    }

    if (biometricType !== -1) {
      return (
        <TouchableOpacity onPress={this.faceIDAuth}>
          <View style={styles.buttonFingerprint}>
            <Image
              source={iconBiometric}
              style={styles.buttonFingerprintImage}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  //TouchID FaceID Authentication
  faceIDAuth = async () => {
    const userBiometric = await LocalStorage.getUserBiometric()
    const currName = this.storeUser.customer.username
    const bioName = userBiometric.username

    showError=()=>{
      const { biometricType } = this.props
      let errNoSetting = ""

      if (biometricType === 2 || biometricType === 3) {
        errNoSetting = Context.getString("common_warning_setting_touch_id")
      } else if (biometricType === 1) {
        errNoSetting = Context.getString("common_warning_setting_face_id")
      }
      Alert.alert(errNoSetting)
    }

    if (userBiometric) {
      if (currName === bioName){
        Util.FaceID.auth(async (error) => {
          if (error.isError) {
            if (error.message) {
              Alert.alert(error.message)
            }
          } else {
            const username = userBiometric.username
            const encrypted = userBiometric.encrypted
            this.validateSignInAPI(
              username,
              encrypted,
              true
            )
          }
        })
      }else{
        showError()
      }
    } else {
      showError()
    }
  }

  render() {
    const { biometricType } = this.props
    return (
      <DismissKeyboardView style={styles.container}>
        <HDText style={styles.status}>{Context.getString("loan_tab_esign_sub_sign_status")}</HDText>

        <KeyboardAvoiding style={{ width: '100%' }}>
          <HDRoundView style={styles.formContainer}>
            <HDTextInput
              ref={ref => (this.username = ref)}
              placeholder={Context.getString("auth_login_input_user_name")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("auth_login_input_user_name")}
              containerStyle={styles.inputUsername}
              inputStyle={{ color: Context.getColor("inputTextDisabled") }}
              iconSource={Context.getImage("iconInfo")}
              onChangeTextInput={this.onChangeInput}
              showLabel={true}
              editable={false}
            />

            <HDTextInput
              ref={ref => (this.password = ref)}
              placeholder={Context.getString("auth_login_input_password")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("auth_login_input_password")}
              isPassword={true}
              maxLength = {Util.Constant.INPUT_PASSWORD_LENGTH}
              containerStyle={styles.inputPassword}
              isRightIcon={true}
              onChangeTextInput={this.onChangeInput}
              showLabel={true}
            />

            {this.renderErrMessage()}

            <View style={styles.space}>
              <HDButton
                title={Context.getString("auth_login_button_login")}
                isShadow={true}
                onPress={this.onPressLogin}
                style={{
                  ...styles.buttonLogin,
                  marginRight: (biometricType === -1) ? 0 : 20
                }}
              />
              {this.renderBtnFaceID()}
            </View>

            <TouchableOpacity onPress={this.goToForgot}>
              <View style={styles.buttonForgot}>
                <HDText style={styles.buttonForgotText}>
                  {Context.getString("auth_login_forgot")}
                </HDText>
              </View>
            </TouchableOpacity>
          </HDRoundView>
        </KeyboardAvoiding>

      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  status: {
    fontSize: Context.getSize(14),
    fontWeight: '400',
    lineHeight: Context.getSize(20),
    color: Context.getColor("textStatus"),
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 20,
    paddingHorizontal: 16
  },
  inputUsername: { marginBottom: 16 },
  inputPassword: { marginBottom: 24 },
  space: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLogin: {
    flex: 1,
    marginBottom: 8
  },
  buttonFingerprint: {
    backgroundColor: "#D7D7D7",
    justifyContent: "center",
    alignItems: "center",
    width: Context.getSize(50),
    height: Context.getSize(50),
    borderRadius: Context.getSize(50 / 2)
  },
  buttonFingerprintImage: {
    width: 24,
    height: 24
  },
  error: {
    width: "100%",
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(16),
    textAlign: "center",
    color: Context.getColor("textRed")
  },
  buttonForgot: {
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonForgotText: {
    fontSize: Context.getSize(14),
    color: Context.getColor("textBlack")
  }
});

