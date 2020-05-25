import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
  Linking
} from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDTextInput,
  HDButton,
  KeyboardAvoiding,
  HDText
} from "component";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import Util from "util";

export default class LoginScreen extends BaseScreen {
  /**
   * <Function: constructor screen>
   * @param userName username input text
   * @param password password input text
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: null
    };
  }

  componentDidMount = async () => {
    const userNameInputText = await LocalStorage.getUserName();
    if (userNameInputText) {
      this.username.setText(userNameInputText);
    }
  };

  /**
   * <Function: call api login>
   * @param username from input
   * @param password from input
   * @param isEncrypt use for authorize face id or print finger
   */
  /**API LOGIN */
  loginAPI = async (username, password, isEncrypt) => {
    try {
      Context.application.showLoading();
      let result = await Network.login(username, password, isEncrypt);
      Context.application.hideLoading();
      if (result.code === 200) {
        Context.application.clearDataLoginPhone()
        this.props.loginSuccess(result);
        this.props.saveUserToRedux(result.payload.customer);
        LocalStorage.saveToken(result.payload.token);
        LocalStorage.saveUser(result.payload);
        this.goToMain();
        this.followNotification(result.payload.customer.uuid);
      } else if (result.code === 1120) {
        Context.application.hideLoading();
        this.showErrorLoginTooMuch(result.payload.seconds);
      } else {
        Context.application.hideLoading();
        this.username.setErrorState(true);
        this.password.setErrorState(true);
        this.showErrorMessage(Network.getMessageFromCode(result.code));
      }
    } catch (error) {
      Context.application.hideLoading();
      this.showErrorMessage(error.message);
      console.log("API-LOGIN-CATCH: " + JSON.stringify(error));
    }
  };

  /**
   * <Function followNotification>
   */
  followNotification = async cusID => {
    const myFcmToken = await LocalStorage.getFcmToken();
    Network.followNotification(cusID, myFcmToken);
    // console.log("API FOLLOW NOTIFICATION: " + result.code)
  };

  /**
   * <Function: go to screen home>
   */
  goToMain = () => {
    // setTimeout(() => {
    //   this.props.navigation.navigate("MainFlow");
    // }, 500);
    this.props.navigation.navigate("MainFlow");
  };
  /**
   * <Function: go to screen forgot password use identity to confirm>
   */
  goToForgot = () => {
    this.props.navigation.navigate("ForgotEnterId");
  };

  /**
   * <Function>
   * @param username from input
   * @param password from input
   * @param isEncrypt from api
   */
  login = (username, password, isEncrypt) => {
    if (username.length == 0) {
      this.username.setErrorState(true);
      this.showErrorMessage(
        Context.getString("auth_login_username_error_blank")
      );
      return;
    }
    if (password.length == 0) {
      this.password.setErrorState(true);
      this.showErrorMessage(
        Context.getString("auth_login_password_error_blank")
      );
      return;
    }

    this.loginAPI(username, password, isEncrypt);
  };

  /**
   * <Function: show error from api>
   * @param message error string
   */
  showErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  /**
   * <Function: when change input will change some stage>
   */
  onChangeInput = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.username.setErrorState(false);
          this.password.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: press confirm button>
   */
  onPressLogin = () => {
    const user = this.username.getText();
    const password = this.password.getText();
    this.login(user, password, false);
  };

  /**
   * <Function: >
   */
  //TouchID FaceID Authentication
  faceIDAuth = async () => {
    const userBiometric = await LocalStorage.getUserBiometric();
    if (userBiometric) {
      Util.FaceID.auth(async error => {
        if (error.isError) {
          if (error.message) {
            Alert.alert(error.message);
          }
        } else {
          const username = userBiometric.username;
          const encrypted = userBiometric.encrypted;
          this.login(username, encrypted, true);
        }
      });
    } else {
      const { biometricType } = this.props;
      let errNoSetting = "";

      if (biometricType === 2 || biometricType === 3) {
        errNoSetting = Context.getString("common_warning_setting_touch_id");
      } else if (biometricType === 1) {
        errNoSetting = Context.getString("common_warning_setting_face_id");
      }
      Alert.alert(errNoSetting);
    }
  };
  
  /**
   * <Function: show error for login too much>
   * @param time get from api
   */
  showErrorLoginTooMuch = time => {
    let stringTime = "";
    if (time < 60) {
      stringTime = time.toString() + " " + Context.getString("common_second");
    } else if (time < 3540) {
      stringTime =
        Math.round(time / 60).toString() +
        " " +
        Context.getString("common_minute");
    } else {
      stringTime =
        Math.round(time / 3600).toString() +
        " " +
        Context.getString("common_hour");
    }
    this.showErrorMessage(
      Context.getString("auth_login_error_too_much") +
      " " +
      stringTime.toString()
    );
  };

  /**
   * <Function: press call center to open screen call center with number auto fill>
   */
  pressCallCenter = () => {
    Linking.openURL(`tel:${Util.Constant.PHONE_CENTER_NUMBER}`);
  };

  /**
   * <Function: render text error>
   */
  renderErrMessage() {
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <HDText style={styles.errorText}>{errorMessage}</HDText>
        </View>
      );
    }
    return null;
  }

  //render FaceID button for device support biometry
  renderBtnFaceID = () => {
    const { biometricType } = this.props;
    let iconBiometric = null;

    if (biometricType === 2 || biometricType === 3) {
      iconBiometric = Context.getImage("iconFinger");
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


  /**
   * <Function>
   * <parameter thì mô tả parameter dùng để làm gì>
   * @param this.props.content Content of website.
   * @return <Web Static and add content inside web Static>.
   */
  render() {
    const { biometricType } = this.props;
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_login_header")}
          navigation={this.props.navigation}
          rightIcon={Context.getImage("iconCall")}
          rightOnPress={this.pressCallCenter}
        />
        <ImageBackground
          style={styles.background}
          source={Context.getImage("registerBackground")}
          resizeMode="stretch"
        ></ImageBackground>
        <KeyboardAvoiding
          style={styles.avoidKeyboardContainer}
          keyboardVerticalOffset={Platform.select({
            ios: () => Context.getSize(-50),
            android: () => 0
          })()}
        >
          <View style={styles.formContainer}>
            <Image style={styles.logo} source={Context.getImage("logo")} />
            <HDText style={styles.title}>
              {Context.getString("auth_login_guide")}
            </HDText>

            <HDTextInput
              ref={ref => (this.username = ref)}
              placeholder={Context.getString("auth_login_input_user_name")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("auth_login_input_user_name")}
              containerStyle={styles.inputUsername}
              iconSource={Context.getImage("iconInfo")}
              onChangeTextInput={this.onChangeInput}
              autoCorrect={false}
            />

            <HDTextInput
              ref={ref => (this.password = ref)}
              placeholder={Context.getString("auth_login_input_password")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("auth_login_input_password")}
              isPassword={true}
              containerStyle={styles.inputPassword}
              isRightIcon={true}
              maxLength={Util.Constant.INPUT_PASSWORD_LENGTH}
              onChangeTextInput={this.onChangeInput}
              autoCorrect={false}
            />

            {this.renderErrMessage()}

            <View style={styles.space}>
              <HDButton
                title={Context.getString("auth_login_button_login")}
                isShadow={true}
                onPress={this.onPressLogin}
                style={{
                  ...styles.buttonLogin,
                  marginRight: biometricType === -1 ? 0 : 20
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
          </View>
        </KeyboardAvoiding>
      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    //justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: Util.App.statusBarHeight() + Context.getSize(44)
  },
  avoidKeyboardContainer: {
    // flex: 1,
    // width: "100%",
    // height: "100%",
    // //justifyContent: "center",
    // alignItems: "center",
    // justifyContent: "flex-end"

    position: "absolute",
    width: "100%",
    bottom: 0

  },
  formContainer: {
    justifyContent: "flex-end",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    //width: Context.getSize(Context.getWindow().width - 32),
    width: "92%",
    paddingTop: Context.getSize(20),
    paddingBottom: Context.getSize(10),
    marginBottom: Context.getSize(30),
    paddingHorizontal: Context.getSize(16),
    borderRadius: 10
  },
  logo: {
    width: Context.getSize(Context.getWindow().width / 2),
    height: Context.getSize(40),
    marginTop: Context.getSize(30),
    marginBottom: Context.getSize(16),
    resizeMode: "contain"
  },
  title: {
    fontSize: Context.getSize(14),
    marginBottom: Context.getSize(16)
  },
  inputUsername: { marginBottom: Context.getSize(16) },
  inputPassword: { marginBottom: Context.getSize(16) },
  errorContainer: {
    width: "100%",
    marginBottom: Context.getSize(24)
  },
  errorText: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(16),
    textAlign: "center",
    color: Context.getColor("textRed")
  },
  space: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonLogin: {
    flex: 1,
    marginBottom: Context.getSize(16)
  },
  buttonFingerprint: {
    backgroundColor: "#D7D7D7",
    justifyContent: "center",
    alignItems: "center",
    width: Context.getSize(50),
    height: Context.getSize(50),
    borderRadius: 50 / 2
  },
  buttonFingerprintImage: {
    width: Context.getSize(24),
    height: Context.getSize(24)
  },
  buttonForgot: {
    height: Context.getSize(30),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Context.getSize(24)
  },
  buttonForgotText: {
    fontSize: Context.getSize(14),
    color: "#232323"
  }
});
