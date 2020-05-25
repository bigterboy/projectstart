import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDTextInput,
  HDRoundView,
  HDButton,
  KeyboardAvoiding,
  HDErrorMessage,
  HDText,
  HandleBack,
  HDTextInputNumber
} from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      errorStillNotRegisOnline: false
    };
  }
  /**
   * <Function: go login screen>
   */
  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  /**
   * <Function: go to tab home>
   */
  goToHome = () => {
    this.props.navigation.navigate("MainHomeTab");
  };

  /**
   * <Function: validate input identityID must have 9 or 12 number>
   */
  validate = () => {
    const id = this.identityID.getText();
    //Check identity from 9-12 characters
    if (Util.String.validateIdentityID(id)) {
      return true;
    } else {
      this.identityID.setErrorState(true);
      this.setErrorMessage(
        Context.getString("auth_forgot_enter_id_error_number_characters")
      );
      return false;
    }
  };

  /**
   * <Function: set error to state>
   * @param message string value
   */
  setErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  /**
   * <Function: change state when change value of input text>
   * @param message string value
   */
  onChangeInput = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.contract.setErrorState(false);
          this.identityID.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: go to enter otp screen>
   */
  goToEnterOtp = async () => {
    console.log(
      "Context.application: " + JSON.stringify(Context.application.state)
    );
    if (this.validate()) {
      try {
        Context.application.showLoading();
        const result = await Network.register(
          this.contract.getText().toUpperCase(),
          this.identityID.getText()
        );
        Context.application.hideLoading();

        console.log("RESULT1231231 " + JSON.stringify(result));

        if (result != null) {
          if (result.code === 200) {
            this.props.navigation.navigate("RegisterEnterOtp", {
              navData: {
                ...result.payload,
                contractCode: this.contract.getText()
              }
            });
          } else if (result.code === 1436) {
            this.setState({
              errorStillNotRegisOnline: true
            });
          } else {
            this.contract.setErrorState(true);
            this.identityID.setErrorState(true);
            console.log(
              "ERROR-REGISTER-ENTER-CONTRACT: " + JSON.stringify(result.code)
            );
            this.setErrorMessage(Network.getMessageFromCode(result.code));
          }
        }
      } catch (err) {
        console.log("ERROR-REGISTER-ENTER-CONTRACT-CATCH: " + err);
        Context.application.hideLoading();
        this.setErrorMessage(Network.getMessageFromCode(err.message));
      }
    }
  };

  /**
   * <Function: change state when change value of input text>
   */
  changnavigation = () => {
    this.props.navigation.navigate("MainHomeTab", {
      slideRight: true
    });
  };

  /**
   * <Function: render content>
   */
  renderContent = () => {
    if (this.state.errorStillNotRegisOnline) {
      return (
        <HDRoundView style={styles.formContainer}>
          <Image style={styles.logo} source={Context.getImage("logo")} />
          <HDText style={styles.errorRegisterNotRegisterOnline}>
            {Context.getString(
              "auth_register_enter_contract_error_still_not_register_online"
            )}
          </HDText>
          <HDButton
            title={Context.getString(
              "auth_register_enter_contract_back_to_home"
            )}
            isShadow={true}
            onPress={this.goToHome}
            style={styles.backToHome}
          />
        </HDRoundView> 
      );
    }
    return (
      <View style={styles.formContainer}>
        <Image style={styles.logo} source={Context.getImage("logo")} />
        <HDText style={styles.title}>
          {Context.getString("auth_register_enter_contract_guide")}
        </HDText>

        <HDTextInput
          ref={ref => (this.contract = ref)}
          placeholder={Context.getString(
            "auth_register_enter_contract_input_contract"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString(
            "auth_register_enter_contract_input_contract"
          )}
          containerStyle={styles.idInput}
          isRightIcon={true}
          //regexType={Util.Constant.INPUT_REGEX_TYPE.CONTRACT}
          maxLength={Util.Constant.INPUT_CONTRACT_LENGTH}
          iconSource={Context.getImage("iconInfo")}
          onRightClick={this.props.showGuideContract}
          onChangeTextInput={this.onChangeInput}
          autoCorrect={false}
          keyboardType="email-address"
        />

        <HDTextInputNumber
          ref={ref => (this.identityID = ref)}
          placeholder={Context.getString(
            "auth_register_enter_contract_input_id"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("auth_register_enter_contract_input_id")}
          keyboardType="number-pad"
          containerStyle={styles.contractInput}
          isRightIcon={true}
          iconSource={Context.getImage("iconInfo")}
          //maxLength={Util.Constant.INPUT_IDENTITY_LENGTH}
          onRightClick={this.props.showGuideId}
          onChangeTextInput={this.onChangeInput}
          autoCorrect={false}
          typeInput = {Util.Constant.TYPE_INPUT_TEXT.IDENTITY_CARD}
        />

        <HDErrorMessage
          errorMessage={this.state.errorMessage}
          style={styles.error}
          textStyle={styles.error_text}
        />

        <HDButton
          title={Context.getString(
            "auth_register_enter_contract_button_register"
          )}
          isShadow={true}
          onPress={this.goToEnterOtp}
          style={styles.buttonLogin}
        />

        <TouchableOpacity onPress={this.goToLogin}>
          <View style={styles.to_login_container}>
            <HDText style={styles.textLogin}>
              <HDText>
                {Context.getString(
                  "auth_register_enter_contract_question_account"
                )}
              </HDText>
              <HDText style={styles.textLoginBold}>
                {Context.getString("auth_register_enter_contract_button_login")}
              </HDText>
            </HDText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  onBackPress = () => {
    this.props.navigation.navigate("MainFlow")
    return true;
  };

  /**
   * <parameter >
   */
  render() {
    return (
      <HandleBack onBack={this.onBackPress}>
        <DismissKeyboardView>
          <Header
            title={Context.getString("auth_register_enter_contract_header")}
            navigation={this.props.navigation}
            //navigation={this.props.navigation}
            leftOnPress={this.changnavigation}
          />
          <ImageBackground
            style={styles.background}
            source={Context.getImage("registerBackground")}
            resizeMode="stretch"
          ></ImageBackground>
          <KeyboardAvoiding
            style={styles.avoidKeyboardContainer}
            keyboardVerticalOffset={Platform.select({
              ios: () => Context.getSize(-40),
              android: () => Context.getSize(40)
            })()}
          >
            {this.renderContent()}
          </KeyboardAvoiding>
        </DismissKeyboardView>
      </HandleBack>
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
    //borderWidth: 1,
    //borderColor: "red"
  },
  avoidKeyboardContainer: {
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
    marginBottom: Context.getSize(40),
    textAlign: "center"
  },
  idInput: { marginBottom: Context.getSize(16) },
  contractInput: { marginBottom: Context.getSize(16) },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Context.getSize(24)
  },
  error_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(16),
    textAlign: "center",
    color: Context.getColor("textRed")
  },
  buttonLogin: {
    marginBottom: Context.getSize(16)
  },
  to_login_container: {
    width: "100%",
    marginBottom: Context.getSize(24)
  },
  textLogin: {
    fontSize: Context.getSize(14),
    color: "#232323"
  },
  textLoginBold: { fontWeight: "500" },
  errorRegisterNotRegisterOnline: {
    marginTop: Context.getSize(30),
    textAlign: "center",
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(22),
    fontWeight: "400",
    marginBottom: Context.getSize(40)
  },
  backToHome: {
    marginBottom: Context.getSize(20)
  }
});
