import React from "react";
import {
  AppState,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDButton,
  KeyboardAvoiding,
  HDOtpView,
  HDCountingView,
  HDErrorMessage,
  HDText
} from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isShowResend: false,
      isTimeout: false,
      isFailRequestOTP: false,
      isShowStatusCount: false, 
      disabledResend: false,
      isLimitOTP: false,
      otpCode: "",
      errorMessage: ""
    };

    this.navData = this.props.navigation.getParam("navData");
  }

  /**
   * <Function: disable button don't want to user click, user need >
   */
  componentDidMount() {
    this.btnConfirm.setDisabled(true);
  }

  /**
   * <Function: call api otp>
   * @param resend if resend otp set it to 1
   */
  getOTPApi = async (resend = 0) => {
    try {
      const result = await Network.getOTP(
        this.navData.customerUuid,
        "",
        this.navData.phoneNumber,
        Util.Constant.OTP_TYPE.FORGOT,
        "",
        resend
      );
      if (result != null) {
        if (result.code === 200) {
          //Convert to seconds
          const time = parseInt(result.payload.otpExpired) * 60;
          const afterTime = parseInt(result.payload.otpResend) * 60;
          this.setState(
            {
              ...this.state,
              isShowStatusCount: true,
              isShowResend: false,
              isTimeout: false,
              errorMessage: ""
            },
            () => {
              this.otpInput.setError(false);
              if(this.countingTime){
                this.countingTime.stop();
                this.countingTime.start(time, afterTime);
              }
            }
          );
        } else {
          console.log("ERROR-FORGOT-GET-OTP: " + JSON.stringify(result.code));
          console.log(
            "ERROR-FORGOT-GET-OTP: " + Network.getMessageFromCode(result.code)
          );
          if ((result.code === 1243) || (result.code === 1244)) {
            this.setState({ isLimitOTP: true })
            this.btnConfirm.setDisabled(false)
            this.setErrorMessage(Network.getMessageFromCode(result.code));
          }else if(result.code === 1255){
            this.setState({
              isShowResend: true,
              isFailRequestOTP: true,
              isShowStatusCount: false
            });

          }
        }
      }
    } catch (err) {
      console.log("ERROR-FORGOT-GET-OTP-CATCH: " + err.message);
      Context.application.hideLoading();
      this.setErrorMessage(err.message);
    }
  };

  //define function used at modal warn phone
  getPhoneNumber = () => {
    return this.navData.phoneNumber;
    // return "0969404002"
  };

  /**
   * <Function: start call api>
   */
  acceptOtp = () => {
    this.getOTPApi();
  };

  /**
   * <Function: open screen with telephone number to call center of hd saison>
   */
  callCenter = () => {
    Linking.openURL(`tel:${Util.Constant.PHONE_CENTER_NUMBER}`);
  };

  /**
   * <Function: confirm otp and clean if wrong otp>
   */
  confirm = async () => {
    const { isTimeout, isLimitOTP } = this.state;
    if (isLimitOTP) {
      this.props.navigation.navigate("MainHomeTab");
    } else {
      if (isTimeout) {
        this.setErrorMessage(Context.getString("common_otp_verify_timeout"));
      } else {
        this.verifyOTPAPI();
      }
      //Clean all text input
      this.cleanTextInput();
    }
  };

  /**
   * <Function: clean text input>
   */
  cleanTextInput = () => {
    this.otpInput.cleanText();
  };

  /**
   * <Function: call api and confirm otp>
   */
  verifyOTPAPI = async () => {
    try {
      Context.application.showLoading()
      const request = {
        customerUUID: this.navData.customerUuid,
        contractUUID: "",
        codeOTP: this.state.otpCode,
        otpType: Util.Constant.OTP_TYPE.FORGOT
      };
      const result = await Network.verifyOTP(
        request.customerUUID,
        request.contractUUID,
        request.codeOTP,
        request.otpType
      );
      Context.application.hideLoading()
      if (result != null) {
        if (result.code === 200) {
          setTimeout(() => {
            this.props.navigation.navigate("ForgotEnterPassword", {
              navData: this.navData
            });
          }, 500);
        } else {
          console.log("ERROR-CONFIRM-OTP: " + result.code);
          console.log(
            "ERROR-CONFIRM-OTP: " + Network.getMessageFromCode(result.code)
          );
          this.setErrorMessage(Network.getMessageFromCode(result.code));
        }
      }
    } catch (err) {
      console.log("ERROR-CONFIRM-OTP: " + err.message);
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
   * <Function: show error when have error>
   * @param message string to show error
   */
  setErrorMessage(message) {
    this.setState(
      {
        errorMessage: message
      },
      () => {
        if (this.state.errorMessage) {
          this.otpInput.setError(true);
        } else {
          this.otpInput.setError(false);
        }
      }
    );
  }

  /**
   * <Function: check show resend button to show>
   */
  onShowResend = () => {
    if (!this.state.isShowResend) {
      this.setState({
        isShowResend: true
      });
    }
  };

  /**
   * <Function: Click button resend>
   */
  resendOTP = () => {
    this.setState({ disabledResend: true }, () => {
      setTimeout(() => {
        this.setState({ disabledResend: false });
      }, 2000);
    });

    this.getOTPApi(1);
    //Clean all text input
    this.cleanTextInput();
  };

  /**
   * <Function: trigger for change input text otp>
   */
  onChangeOTP = (digits, pinCount) => {
    const {isLimitOTP} = this.state
    if (!isLimitOTP){
      if (digits.length < pinCount) {
        this.btnConfirm.setDisabled(true);
      }
    } 
  };

  /**
  * Get Title Button Confirm
  */
  getTitleConfirm = () => {
    const { isLimitOTP } = this.state
    if (isLimitOTP) {
      return Context.getString("auth_register_enter_otp_back_to_main")
    }
    return Context.getString("auth_register_enter_otp_button_confirm")
  }

  /**
   * <Function: render error after call API>
   */
  renderError() {
    if (this.state.errorMessage) {
      return (
        <HDErrorMessage
          errorMessage={this.state.errorMessage}
          style={styles.error}
          textStyle={styles.error_text}
        />
      );
    }
    return null;
  }

  /**
   * <Function: render counting number >
   */
  renderCounting = () => {
    const { isTimeout, isShowResend, isLimitOTP,isShowStatusCount } = this.state;

    const strPrefix = isTimeout
      ? Context.getString("common_otp_timeout")
      : Context.getString("common_otp_not_receive");

    //sub function render counting
    counting = () => {
      if (!isLimitOTP && isShowStatusCount) {
        return (
          <View style={styles.status_container}>
            <HDText style={styles.timer_status}>
              {Context.getString("common_otp_status")}
            </HDText>
            <HDCountingView
              ref={ref => (this.countingTime = ref)}
              onAfterTime={this.onShowResend}
              onTimeOut={() => {
                this.setState({
                  isTimeout: true,
                  isShowResend: true
                }, () => {
                  this.otpInput.setError(true);
                });
              }}
            />
          </View>
        );
      } else {
        return null
      }
    };

    /**
     * <Function: for click resend button again>
     */
    resend = () => {
      if (!isLimitOTP) {
        return (
          <View style={styles.status_container}>
            <HDText style={styles.timeout_status}>{strPrefix}</HDText>
            <TouchableOpacity
              disabled={this.state.disabledResend}
              onPress={this.resendOTP}
            >
              <HDText style={styles.resend_status}>
                {Context.getString("common_otp_resend")}
              </HDText>
            </TouchableOpacity>
          </View>
        );
      } else {
        return null
      }
    };

    return (
      <View style={{ alignItems: "center", width: "100%" }}>
        {!isTimeout ? counting() : null}

        {isShowResend ? resend() : null}
      </View>
    );
  };

  /**
   * <Function: render screen enter otp>
   */
  render() {
    const securityPhone = Util.String.securityPhone(this.navData.phoneNumber);
    //const securityPhone = Util.String.securityPhone("0969404001");
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_forgot_enter_otp_header")}
          navigation={this.props.navigation}
        />
        <View style={styles.avoidKeyboardContainer}>
          <HDText style={styles.title}>
            <HDText>
              {Context.getString("auth_forgot_enter_otp_guide_part_1")}
            </HDText>
            <HDText style={styles.security_phone_text}>{securityPhone}</HDText>
            <HDText>
              {Context.getString("auth_forgot_enter_otp_guide_part_2")}
            </HDText>
          </HDText>

          <HDOtpView
            pinCount={6}
            ref={ref => (this.otpInput = ref)}
            onCodeFilled={code => {
              this.btnConfirm.setDisabled(false);
              this.setState({
                ...this.state,
                otpCode: code
              });
            }}
            onFocusOtp={() => {
              this.setErrorMessage("");
            }}
            onChangeValue={this.onChangeOTP}
          />

          {this.renderCounting()}
          {this.renderError()}

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
              title={this.getTitleConfirm()}
              isShadow={true}
              onPress={this.confirm}
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
    padding: 20,
    backgroundColor: "#F3F5F6"
  },
  title: {
    textAlign: "center",
    fontSize: Context.getSize(15),
    marginBottom: 20
  },
  space: { flex: 1 },
  status_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 16
  },
  timeout_status: {
    color: "#37474f",
    fontSize: Context.getSize(14),
    textAlign: "center"
  },
  resend_status: {
    fontSize: Context.getSize(14),
    color: Context.getColor("textBlue1"),
    fontWeight: "500"
  },
  button_accept: {
    marginBottom: 16
  },
  error: {
    justifyContent: "center",
    alignItems: "center"
  },
  error_text: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: "400",
    textAlign: "center"
  },
  security_phone_text: {
    color: Context.getColor("textBlue1"),
    fontWeight: "bold"
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
