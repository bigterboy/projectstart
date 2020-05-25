import React from "react";
import { StyleSheet, Platform, Keyboard, TouchableOpacity, View } from "react-native";
import {
  BaseScreen,
  Header,
  DismissKeyboardView,
  KeyboardAvoiding,
  HDTextInput,
  HandleBack,
  HDErrorMessage,
  HDPasswordTooltip,
  HDText
} from "component";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import Util from "util";

import ModalWarningForgot from './component/ModalWarningForgot'

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: true,
      errorMessage: null,
      result: [],
      isLoading: true,
      visibleTooltip: false,
      validateValue: null,
      modalWarningForgot: false,
      isShowForgot: false
    };
  }

  componentDidMount = () => {
    const isShowForgot = this.props.navigation.getParam("isShowForgot")
    if (isShowForgot) {
      this.setState({
        isShowForgot: true
      })
    }
  }

  onBackPress = () => {
    return true;
  };
  modalOkPress = () => {
    this.props.navigation.goBack();
  };

  getHeader = isEdit => {
    return (
      <Header
        title={Context.getString("main_account_tab_change_pass")}
        rightText={isEdit ? Context.getString("common_save") : null}
        rightIcon={isEdit ? null : Context.getImage("profileEdit")}
        navigation={this.props.navigation}
        leftOnPress={this.leftOnPress}
        rightOnPress={this.rightOnPress}
      />
    );
  };

  leftOnPress = () => {
    this.props.navigation.navigate("MainAccountTab")
    // alert("leftOnPress")
  }

  rightOnPress = () => {
    if (this.state.isEdit) {
      this.updatePasswordUser();
      this.hideToolTip();
      Keyboard.dismiss();
    } else {
      this.setState({ isEdit: !this.state.isEdit });
    }
  };

  updatePasswordUser = async () => {
    const currentPassword = this.currentPassword.getText();
    const newPassword = this.newPassword.getText();
    const newPasswordRewrite = this.newPasswordRewrite.getText();

    if (currentPassword === "") {
      this.currentPassword.setErrorState(true);
      this.showErrorMessage(
        Context.getString(
          "account_profile__message_error_empty_input_current_pass"
        )
      );
      return;
    }

    if (newPassword === "") {
      this.newPassword.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile__message_error_empty_input_new_pass")
      );
      return;
    }

    if (newPasswordRewrite === "") {
      this.newPasswordRewrite.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile__message_error_empty_input_re_pass")
      );
      return;
    }

    if (!this.checkInputPasswordValidate(newPassword)) {
      this.newPassword.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile__message_error_input_new_pass")
      );
      return;
    }

    if (!this.checkInputPasswordValidate(newPasswordRewrite)) {
      this.newPasswordRewrite.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile__message_error_input_re_pass")
      );
      return;
    }

    //Check Do password and rewrite password same ???
    if (newPassword !== newPasswordRewrite) {
      this.showErrorMessage(
        Context.getString("account_profile_same_password_message")
      );
      this.newPassword.setErrorState(true);
      this.newPasswordRewrite.setErrorState(true);
      return;
    }

    //Check Current password must different with new password
    if (currentPassword === newPassword) {
      this.showErrorMessage(
        Context.getString(
          "account_profile_newpassword_must_different_current_message"
        )
      );
      this.currentPassword.setErrorState(true);
      this.newPassword.setErrorState(true);
      return;
    }

    Context.application.showLoading();
    try {
      //console.log("CHAY NET WORK PROMOTINOGENERAL");
      let result = await Network.updateNewPassword(
        this.props.user.uuid,
        currentPassword,
        newPassword,
        newPasswordRewrite
      );
      Context.application.hideLoading();
      this.setState({
        result: result.payload,
        isLoading: false
      });
      console.log("RESULT CHANGE PASSWORD: " + JSON.stringify(result));

      if (result.code === 200) {
        this.props.showChangePasswordSuccessModal();
        this.props.refreshExpiredPass(false);
        await LocalStorage.saveToken(result.payload.token);
        await LocalStorage.saveUser(result.payload);
        this.props.saveUserToRedux(result.payload.customer);

        // //Save enscript for check finger print
        // await LocalStorage.saveUserBiometric({
        //   username: this.props.user.username,
        //   encrypted: result.payload.encrypted
        // });

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
      } else if (result.code === 1111) {
        //this.showErrorMessage("Nhập mật khẩu không đúng");
        this.currentPassword.setErrorState(true);
        this.showErrorMessage(Network.getMessageFromCode(result.code));
      } else {
        this.showErrorMessage(Network.getMessageFromCode(result.code));
      }
    } catch (error) {
      Context.application.hideLoading();
      console.log("ERROR: " + error);
    }
  };

  /**clear data when logout */
  clearData = async () => {
    this.props.logout();
    Context.application.clearDataLoginPhone();
    this.props.navigation.navigate("MainHomeTab");
    this.props.navigation.navigate("ForgotEnterId");
    await LocalStorage.deleteUser();
    await LocalStorage.deleteToken();
    await this.props.cleanDataUserRedux();
    Context.application.setWarnedChangePass(false);
  };

  /**
   * <Function: click button sign out>
   */
  logout = async () => {
    let uuidTemp = this.props.user.uuid;
    this.clearData();
    try {
      const result = await Network.logout(uuidTemp);
      if (result != null) {
        if (result.code === 200) {
          console.log("RESUL CODE LA: ",result)
        } else {
          console.log("ERROR-ACCOUNT-LOGOUT: " + JSON.stringify(result.code));
        }
      }
    } catch (err) {
      console.log("ERROR-ACCOUNT-LOGOUT: " + err.message);
    }
  };

  checkInputPasswordValidate = value => {
    return Util.String.regexCheckValidatePass(value);
  };

  showErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  onChangeInput = text => {
    const { errorMessage } = this.state;
    this.setState({
      validateValue: text
    });
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.currentPassword.setErrorState(false);
          this.newPassword.setErrorState(false);
          this.newPasswordRewrite.setErrorState(false);
        }
      );
    }
  };

  onFocusCurrentPassword = () => {
    this.showToolTip();
    this.setState({
      validateValue: this.currentPassword.getText()
    });
  };

  onFocusNewPassword = () => {
    this.showToolTip();
    this.setState({
      validateValue: this.newPassword.getText()
    });
  };

  onFocusNewPasswordRewrite = () => {
    this.showToolTip();
    this.setState({
      validateValue: this.newPasswordRewrite.getText()
    });
  };

  onBlurPass = () => {
    this.setState({
      visibleTooltip: false,
      validateValue: ""
    });
  };

  showToolTip = () => {
    this.setState({
      visibleTooltip: true
    });
  };

  hideToolTip = () => {
    this.setState({
      visibleTooltip: false
    });
  };

  /**
   * Show modal warning forgot
   */
  showModalWarningForgot = () => {
    this.setState({
      modalWarningForgot: true
    })
  }

  /**
   * Hide modal warning forgot
   */
  hideModalWarningForgot = () => {
    this.setState({
      modalWarningForgot: false
    })
  }

  /**
   * Event press forgot password
   */
  pressForgotPass = () => {
    this.showModalWarningForgot()
  }

  /**
   * Event press agree logout
   */
  onConfirmLogout = () => {
    this.hideModalWarningForgot()
    this.logout()
  }

  renderErrMessage() {
    return (
      <HDErrorMessage
        errorMessage={this.state.errorMessage}
        style={styles.error}
        textStyle={styles.error_text}
      />
    );
  }

  renderForgot = () => {
    const { isShowForgot } = this.state
    if (isShowForgot) {
      return (

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={this.pressForgotPass}>
            <View style={{ width: Context.getSize(150), flexDirection: 'row', justifyContent: 'flex-end' }}>
              <HDText style={styles.forgot_text}>Quên mật khẩu ?</HDText>
            </View>
          </TouchableOpacity>
        </View>

      )
    }
    return null
  }

  render() {
    let requireChange = this.props.navigation.getParam("requireChange");
    return (
      <HandleBack onBack={this.onBackPress}>
        <DismissKeyboardView style={styles.container}>
          {this.getHeader(this.state.isEdit)}
          {this.renderErrMessage()}
          <KeyboardAvoiding style={styles.boxContainer}>
            <HDTextInput
              ref={ref => this.currentPassword = ref}
              placeholder="Mật khẩu hiện tại"
              label="Mật khẩu hiện tại"
              isPassword={true}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              containerStyle={styles.inputPass}
              onChangeTextInput={this.onChangeInput}
              editable={this.state.isEdit}
              blurInput={this.onBlurPass}
              autoFocus
              focusInput={this.onFocusCurrentPassword}
            />
            <HDTextInput
              ref={ref => this.newPassword = ref}
              placeholder="Mật khẩu mới"
              label="Mật khẩu mới"
              isPassword={true}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              containerStyle={styles.inputPass}
              onChangeTextInput={this.onChangeInput}
              editable={this.state.isEdit}
              blurInput={this.onBlurPass}
              focusInput={this.onFocusNewPassword}
            />
            <HDTextInput
              ref={ref => this.newPasswordRewrite = ref}
              placeholder="Xác nhận lại mật khẩu mới"
              label="Xác nhận lại mật khẩu mới"
              isPassword={true}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              containerStyle={styles.inputPass}
              onChangeTextInput={this.onChangeInput}
              editable={this.state.isEdit}
              blurInput={this.onBlurPass}
              focusInput={this.onFocusNewPasswordRewrite}
            />
          </KeyboardAvoiding>

          {this.renderForgot()}

          <HDPasswordTooltip
            ref={ref => (this.passTooltip = ref)}
            style={styles.guild_tooltip}
            isVisible={this.state.visibleTooltip}
            validateValue={this.state.validateValue}
          />

        </DismissKeyboardView>

        <ModalWarningForgot
          isVisible={this.state.modalWarningForgot}
          onConfirm={this.onConfirmLogout}
          onCancel={this.hideModalWarningForgot}
        />
      </HandleBack>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  boxContainer: {
    marginTop: 24,
    backgroundColor: "white",
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  },
  inputPass: { marginBottom: 16 },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Context.getSize(24),
    paddingHorizontal: 12,
  },
  error_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    textAlign: "center",
  },
  guild_tooltip: {
    marginTop: Context.getSize(16),
    alignSelf: "center"
  },
  forgot_text: {
    fontSize: Context.getSize(14),
    fontWeight: 'bold',
    color: Context.getColor("textBlue1"),
    paddingRight: 16,
    paddingTop: 16,
    textDecorationLine: 'underline'
  }
});
