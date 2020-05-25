import React from "react";
import { StyleSheet, View, BackHandler,Keyboard } from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDButton,
  KeyboardAvoiding,
  HDRoundView,
  HDTextInput,
  HDPasswordTooltip,
  HDErrorMessage,
  ModalChangePasswordSuccess,
} from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

/**
 * <Function: screen for enter password>
 */
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      visibleTooltip: false,
      errorMessage: "",
      confirmDisabled: true,
      modalChangePasswordSuccessVisible: false,
      userName: null,
      result: null
    };
    this.navData = this.props.navigation.getParam("navData");
    // console.log("FORGOT-UPDATE-PASSWORD: "+JSON.stringify(this.navData))
  }

  /**
   * <Function: add listener so when you comeback can call function>
   */
  componentDidMount() {
    this.btnConfirm.setDisabled(true);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  /**
   * <Function: remmove when will unmount>
   */
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  /**
   * <Function: return true show on android can not use physical back button>
   */
  handleBackButton() {
    return true;
  }

  /**
   * <Function: confirm to check validate and go to next screen>
   */
  confirm = async () => {
    Keyboard.dismiss();

    const pass = this.password.getText();
    const confirm = this.confirmPassword.getText();
    if (pass !== confirm) {
      this.setErrorMessage(
        Context.getString("account_profile_same_password_message")
      );
      this.confirmPassword.setErrorState(true);
      return;
    }

    try {
      Context.application.showLoading();
      const result = await Network.generateNewPassword(
        this.navData.customerUuid, // customerUUID: cusID,
        this.navData.phoneNumber, // phoneNumber: phone,
        this.password.getText(), // optType: otpType,
        this.confirmPassword.getText()
      );
      Context.application.hideLoading();
      if (result != null) {
        if (result.code === 200) {
          Context.application.clearDataLoginPhone()
          await LocalStorage.saveUser(result.payload);
          await LocalStorage.saveToken(result.payload.token);
          this.props.saveUserToRedux(result.payload.customer);
          if(result.payload.customer.avatar){
            this.props.saveImageBase64URL(result.payload.customer.avatar)
          }

          const bioUser = await LocalStorage.getUserBiometric();
          const currUser = result.payload.customer.username;
          if (bioUser) {
            if (bioUser.username == currUser) {
              await LocalStorage.saveUserBiometric({
                username: currUser,
                encrypted: result.payload.encrypted
              });
            }
          }

          // if (this.navData.parent) {
          //   // this.props.navigation.goBack(this.navData.parent);
          //   this.props.navigation.navigate("ForgotComplete");
          // } else {
          //   this.props.login(result);
          //   this.props.navigation.navigate("MainFlow");
          // }

          // if (!this.navData.parent) {
          //   this.props.login(result);
          // }

          await this.showModalChangePasswordSuccess(result);
        } else {
          console.log("ERROR-FORGOT-UPDATE-PASSWORD: " + result.code);
          this.setErrorMessage(Network.getMessageFromCode(result.code));
        }
      }
    } catch (err) {
      console.log("ERROR-FORGOT-UPDATE-PASSWORD-CATCH: " + err.message);
      Context.application.hideLoading();
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.navigate("MainFlow")
      );
      //this.setErrorMessage(err.message);
    }
  };

  /**
   * <Function: show modal successful when complete>
   * @param result get from api
   */
  showModalChangePasswordSuccess = result => {
    this.setState({
      modalChangePasswordSuccessVisible: true,
      userName: result.payload.customer.username,
      result: result
    });
  };

  /**
   * <Function: confirm and hide modal ==> go to next screen>
   */
  presConfirmPopUp = () => {
    if (this.navData.parent) {
      this.props.navigation.navigate("ForgotComplete");
    } else {
      this.props.login(this.state.result);
      this.props.navigation.navigate("MainHomeTab");
    }
  };

  /**
   * <Function: set error to show>
   * @param message string message to show
   */
  setErrorMessage = message => {
    this.setState({
      errorMessage: message
    });
  };

  /**
   * <Function: check validate>
   * @param text value get from input
   */
  onPassChange = text => {
    this.setState(
      {
        validateValue: text,
        errorMessage: ""
      },
      () => {
        this.checkPassword();
      }
    );
  };

  /**
   * <Function: focus input text>
   */
  onFocusPass = () => {
    this.setState({
      visibleTooltip: true,
      validateValue: this.password.getText()
    });
  };

  /**
   * <Function: blur inut text>
   */
  onBlurPass = () => {
    this.setState({
      visibleTooltip: false,
      validateValue: ""
    });
  };

  /**
   * <Function: when input change will check value inpout>
   */
  onConfirmPassChange = text => {
    this.setState(
      {
        validateValue: text,
        errorMessage: ""
      },
      () => {
        this.checkPassword();
      }
    );
  };

  /**
   * <Function: focus input text>
   */
  onFocusConfirmPass = () => {
    this.setState({
      visibleTooltip: true,
      validateValue: this.confirmPassword.getText()
    });
  };

  /**
   * <Function: blur input text>
   */
  onBlurConfirmPass = () => {
    this.setState({
      visibleTooltip: false,
      validateValue: ""
    });
  };

  //Compare and validate two password
  //To enable or disable button
  checkPassword = () => {
    const pass = this.password.getText();
    const confirm = this.confirmPassword.getText();
    const tooltipValidate = this.passTooltip.getStateValidate();
    if (tooltipValidate && pass && confirm) {
      // if (pass === confirm) {
      //   this.btnConfirm.setDisabled(false)
      // } else {
      //   this.btnConfirm.setDisabled(true)
      // }
      this.btnConfirm.setDisabled(false);
    } else {
      this.btnConfirm.setDisabled(true);
    }
  };

  /**
   * <Function: render error>
   */
  renderError() {
    return (
      <HDErrorMessage
        errorMessage={this.state.errorMessage}
        style={styles.error}
        textStyle={styles.error_text}
      />
    );
  }

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_forgot_enter_password_header")}
        />
        <View style={styles.avoidKeyboardContainer}>
          {this.renderError()}

          <HDRoundView style={styles.formContainer}>
            <HDTextInput
              ref={ref => (this.password = ref)}
              placeholder={Context.getString(
                "auth_forgot_enter_password_input_pass"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString("auth_forgot_enter_password_input_pass")}
              isPassword={true}
              containerStyle={styles.inputPass}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              focusInput={this.onFocusPass}
              blurInput={this.onBlurPass}
              onChangeTextInput={this.onPassChange}
            />
            <HDTextInput
              ref={ref => (this.confirmPassword = ref)}
              placeholder={Context.getString(
                "auth_forgot_enter_password_input_pass_again"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString(
                "auth_forgot_enter_password_input_pass_again"
              )}
              isPassword={true}
              containerStyle={styles.inputPassAgain}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              focusInput={this.onFocusConfirmPass}
              blurInput={this.onBlurConfirmPass}
              onChangeTextInput={this.onConfirmPassChange}
            />
          </HDRoundView>

          <HDPasswordTooltip
            ref={ref => (this.passTooltip = ref)}
            style={styles.guild_tooltip}
            isVisible={this.state.visibleTooltip}
            validateValue={this.state.validateValue}
          />

          {/* <View style={styles.space} /> */}
        </View>

        <KeyboardAvoiding
          behavior="padding"
          enabled
          style={styles.avoiding_container}
        >
          <View style={styles.button_container}>
            <HDButton
              ref={ref => (this.btnConfirm = ref)}
              // style={styles.button_confirm}
              title={Context.getString(
                "auth_forgot_enter_password_button_confirm"
              )}
              isShadow={true}
              onPress={this.confirm}
              disabled={this.state.confirmDisabled}
            />
          </View>
        </KeyboardAvoiding>

        <ModalChangePasswordSuccess
          isVisible={this.state.modalChangePasswordSuccessVisible}
          confirmModal={this.presConfirmPopUp}
          username={this.state.userName}
        />
      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  avoidKeyboardContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: Context.getSize(16),
    paddingTop: Context.getSize(24),
    backgroundColor: "#F3F5F6"
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    paddingTop: Context.getSize(20),
    paddingBottom: Context.getSize(20),
    paddingHorizontal: Context.getSize(16)
  },
  inputPass: { marginBottom: Context.getSize(16) },
  inputPassAgain: { marginBottom: Context.getSize(16) },
  space: { flex: 1 },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Context.getSize(24)
  },
  error_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    textAlign: "center"
  },
  guild_tooltip: {
    marginTop: Context.getSize(16)
  },
  button_confirm: {
    marginBottom: Context.getSize(16)
  },
  avoiding_container: {
    position: "absolute",
    width: "100%",
    bottom: 0
    //backgroundColor: "white"
  },
  button_container: {
    marginBottom: 16,
    width: (343 / 375) * Context.getWindow().width,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: 10,
    zIndex: 0
  }
});
