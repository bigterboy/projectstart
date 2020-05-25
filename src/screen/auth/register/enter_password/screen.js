import React from "react";
import { StyleSheet, View, Keyboard, BackHandler } from "react-native";
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
  HDText
} from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      visibleTooltip: false,
      errorMessage: "",
      confirmDisabled: true, //disable or enable button
      visibleStatus: true //using for hide status or error when focus input
    };

    this.navData = this.props.navigation.getParam("navData");
  }

  /**
   * <Function: add lister for keyboard>
   */
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    this.btnConfirm.setDisabled(true);

    //Don't click back button physical on android
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  /**
   * <Function: destroy keyboard>
   */
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    //Don't click back button physical on android
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  //Don't click back button physical on android
  handleBackButton() {
    return true;
  }

  /**
   * <Function: set keyboard false>
   */
  _keyboardDidShow = () => {
    this.setState({
      visibleStatus: false
    });
  };

  /**
   * <Function: set keyboard true>
   */
  _keyboardDidHide = () => {
    this.setState({
      visibleStatus: true
    });
  };

  /**
   * <Function: call api register new password>
   */
  createPassAPI = async () => {
    //Check same password before get API
    const pass = this.password.getText();
    const confirm = this.confirmPassword.getText();
    if (pass !== confirm) {
      this.setErrorMessage(
        Context.getString("account_profile_same_password_message")
      );
      this.confirmPassword.setErrorState(true);
      return;
    }

    const { biometricType } = this.props;
    try {
      Context.application.showLoading();
      const result = await Network.registerPassword(
        this.navData.customerUuid,
        this.password.getText(),
        this.confirmPassword.getText()
      );
      Context.application.hideLoading();

      console.log("RESULT1231231 " + JSON.stringify(result));

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-REGISTER-ENTER-PASSWORD-COMPLETE: " + JSON.stringify(result.payload)
          );

          Context.application.clearDataLoginPhone()
          await LocalStorage.saveUser(result.payload);
          await LocalStorage.saveToken(result.payload.token);
          this.props.saveUserToRedux(result.payload.customer);
          this.props.login(result);
          
          if (biometricType === -1) {
            this.props.navigation.navigate("MainFlow");
          } else {
            this.props.navigation.navigate("RegisterSuccess", {
              navData: result.payload
            });
          }
        } else {
          console.log("REGISTER-ENTER-PASSWORD-ERROR : " + result.code);
          this.setErrorMessage(Network.getMessageFromCode(result.code));
        }
      }
    } catch (err) {
      console.log("REGISTER-ENTER-PASSWORD-ERROR: " + JSON.stringify(err));
      console.log("REGISTER-ENTER-PASSWORD-ERROR: " + err.message);
      Context.application.hideLoading();
      //this.setErrorMessage(err.message);
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.navigate("MainFlow")
      );
    }
  };

  /**
   * <Function: confirm to call api>
   */
  confirm = () => {
    this.createPassAPI();
  };

  /**
   * <Function: set error>
   */
  setErrorMessage = message => {
    this.setState({
      errorMessage: message
    });
  };

  /**
   * <Function: trigger when change input text>
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
   * <Function: focus >
   */
  onFocusPass = () => {
    this.setState({
      visibleTooltip: true,
      validateValue: this.password.getText()
    });
  };

  onBlurPass = () => {
    this.setState({
      visibleTooltip: false,
      validateValue: ""
    });
  };

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

  onFocusConfirmPass = () => {
    this.setState({
      validateValue: this.confirmPassword.getText(),
      visibleTooltip: true
    });
  };

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
      // }
      this.btnConfirm.setDisabled(false);
    } else {
      this.btnConfirm.setDisabled(true);
    }
  };

  renderError = () => {
    return (
      <HDErrorMessage
        errorMessage={this.state.errorMessage}
        style={styles.error}
        textStyle={styles.error_text}
      />
    );
  };

  renderStatus = () => {
    return (
      <View>
        <HDText style={styles.title}>
          {Context.getString("auth_register_enter_password_title")}
        </HDText>

        <HDText style={styles.status}>
          <HDText>
            {Context.getString("auth_register_enter_password_user_name")}
          </HDText>

          <HDText style={styles.userName}>{this.navData.userName}</HDText>
        </HDText>

        <HDText style={styles.guide}>
          {Context.getString("auth_register_enter_password_guide")}
        </HDText>
      </View>
    );
  };

  renderStatusOrError = () => {
    const { visibleStatus, errorMessage } = this.state;
    if (errorMessage) {
      return this.renderError();
    } else if (visibleStatus) {
      return this.renderStatus();
    } else {
      return null;
    }

    // if (visibleStatus) {
    //   if (errorMessage) {
    //     return this.renderError()
    //   } else {
    //     return this.renderStatus()
    //   }
    // } else {
    //   return null
    // }
  };

  render() {
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_register_enter_password_header")}
          // navigation={this.props.navigation}
        />
        <View style={styles.avoidKeyboardContainer}>
          {this.renderStatusOrError()}

          <HDRoundView style={styles.formContainer}>
            <HDTextInput
              ref={ref => (this.password = ref)}
              placeholder={Context.getString(
                "auth_register_enter_password_input_pass"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString(
                "auth_register_enter_password_input_pass"
              )}
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
                "auth_register_enter_password_input_pass_again"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString(
                "auth_register_enter_password_input_pass_again"
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
                "auth_register_enter_password_button_confirm"
              )}
              isShadow={true}
              onPress={this.confirm}
              disabled={this.state.confirmDisabled}
            />
          </View>
        </KeyboardAvoiding>
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
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#F3F5F6"
  },
  title: {
    textAlign: "center",
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    color: Context.getColor("textStatus")
  },
  status: {
    textAlign: "center",
    fontSize: Context.getSize(14),
    fontWeight: "400",
    marginTop: 10,
    color: Context.getColor("textStatus")
  },
  userName: {
    color: Context.getColor("textBlue1"),
    fontWeight: "bold"
  },
  guide: {
    textAlign: "center",
    fontSize: Context.getSize(14),
    fontWeight: "400",
    marginBottom: 20,
    color: Context.getColor("textStatus")
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  inputPass: { marginBottom: 16 },
  inputPassAgain: { marginBottom: 16 },
  space: { flex: 1 },
  button_confirm: {
    marginBottom: 16
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  error_text: {
    textAlign: "center",
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: "400"
  },
  guild_tooltip: {
    marginTop: 16
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
    marginTop: 10
  }
});
