import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDButton,
  KeyboardAvoiding,
  HDErrorMessage,
  HDText,
  HDTextInputNumber
} from "component";

import ModalWarningPhone from "../component/ModalWarningPhone";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      modalWarnPhone: false
    };
  }

  /**
   * <Function: validate input identityID must have 9 or 12 number>
   */
  validate = () => {
    const phone = this.phoneNumber.getText();

    //Check identity from 9-12 characters
    if (!Util.String.validatePhoneNumber(phone)) {
      this.phoneNumber.setErrorState(true);
      this.setErrorMessage(
        Context.getString("auth_register_with_phone_error_number_characters")
      );
      return false;
    } else if (!Util.String.regexCheckNumber(phone)) {
      this.phoneNumber.setErrorState(true);
      this.setErrorMessage(
        Context.getString("account_profile_change_error_phoneNumber_fomat_message")
      );
      return false;
    } else {
      return true
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
          this.phoneNumber.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: go to enter otp screen>
   */
  goToEnterOtp = async () => {
    if (this.validate()) {
      this.showWarnPhone()
    }
  };

  showWarnPhone = () => {
    this.setState({ modalWarnPhone: true })
  }

  hideMdWarnPhone = () => {
    this.setState({ modalWarnPhone: false })
  }

  /**
   * <Function: change state when change value of input text>
   */
  changnavigation = () => {
    this.props.navigation.navigate("MainHomeTab", {
      slideRight: true
    });
  };

  onReceiveOTP = () => {
    this.hideMdWarnPhone()
    setTimeout(() => {
      this.props.navigation.navigate("RegisterPhoneEnterOtp",{
        navData: {
          phoneNumber: this.phoneNumber.getText()
        }
      })
    }, 500);
  }

  onDoLater = () => {
    this.hideMdWarnPhone()
  }

  /**
   * <Function: render content>
   */
  renderContent = () => {
    return (
      <View style={styles.formContainer}>
        <Image style={styles.logo} source={Context.getImage("logo")} />
        <HDText style={styles.title}>
          {Context.getString("auth_register_with_phone_enter_phone_guide")}
        </HDText>

        <HDTextInputNumber
          ref={ref => (this.phoneNumber = ref)}
          placeholder={Context.getString(
            "auth_register_with_phone_enter_phone"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("auth_register_with_phone_enter_phone")}
          keyboardType="number-pad"
          containerStyle={styles.input_container}
          onChangeTextInput={this.onChangeInput}
          autoCorrect={false}
          typeInput={Util.Constant.TYPE_INPUT_TEXT.PHONE}
        />

        <HDErrorMessage
          errorMessage={this.state.errorMessage}
          style={styles.error}
          textStyle={styles.error_text}
        />

        <HDButton
          title={Context.getString(
            "auth_register_with_phone_button_continue"
          )}
          isShadow={true}
          onPress={this.goToEnterOtp}
        />

      </View>
    );
  };

  /**
   * <parameter >
   */
  render() {
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_register_with_phone_enter_phone_nav")}
          navigation={this.props.navigation}
          leftOnPress={this.changnavigation}
        />
        <ImageBackground
          style={styles.background}
          source={Context.getImage("registerBackground")}
          resizeMode="stretch"
        >

        </ImageBackground>
        <KeyboardAvoiding
          style={styles.avoidKeyboardContainer}
          keyboardVerticalOffset={Platform.select({
            ios: () => Context.getSize(-40),
            android: () => 0
          })()}
        >
          {this.renderContent()}

        </KeyboardAvoiding>

        <ModalWarningPhone
          phoneNumber={(this.phoneNumber) ? this.phoneNumber.getText() : ""}
          isVisible={this.state.modalWarnPhone}
          onReceiveOTP={this.onReceiveOTP}
          onDoLater={this.onDoLater}
        />
      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "absolute",
    top: Util.App.statusBarHeight() + Context.getSize(44)
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
    width: "92%",
    paddingTop: Context.getSize(20),
    paddingBottom: Context.getSize(16),
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
  input_container: { marginBottom: Context.getSize(40) },
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
  backToHome: {
    marginBottom: Context.getSize(20)
  }
});
