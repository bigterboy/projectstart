import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BaseScreen,
  DismissKeyboardView,
  Header,
  HDTextInput,
  HDButton,
  KeyboardAvoiding,
  HDRoundView,
  HDErrorMessage,
  HDText,
  HDTextInputNumber
} from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
    this.navData = this.props.navigation.getParam("navData");
  }

  /**
   * <Function: when you enter identity after this screen will tranform to this screen>
   */
  componentDidMount() {
    this.identityID.setText(this.navData.identityID);
  }

  /**
   * <Function: validate input text to check identity card must 9 or 12 number>
   */
  validate = () => {
    const id = this.identityID.getText();
    //Check identity from 9-12 characters
    // if (Util.String.validateIdentityID(id)) {
    //   return true;
    // } else
    if (this.identityID.getText().length === 0) {
      console.log("VO 1");
      this.identityID.setErrorState(true);
      this.setErrorMessage(
        Context.getString("auth_forgot_enter_id_error_null")
      );
      return false;
    } else if (this.contract.getText().length === 0) {
      console.log("VO 2");
      this.contract.setErrorState(true);
      this.setErrorMessage(
        Context.getString("auth_forgot_enter_contract_error_null")
      );
      return false;
    } else if (!Util.String.validateIdentityID(id)) {
      console.log("VO 3");
      this.identityID.setErrorState(true);
      this.setErrorMessage(
        Context.getString("auth_forgot_enter_id_error_number_characters")
      );
      return false;
    }
    return true;
    // else {
    //   this.identityID.setErrorState(true);
    //   this.setErrorMessage(
    //     Context.getString("auth_forgot_enter_id_error_number_characters")
    //   );
    //   return false;
    // }
  };

  /**
   * <Function: click button to confirm>
   */
  confirm = async () => {
    if (!this.validate()) {
      return;
    }

    //if (this.validate()) {
    try {
      Context.application.showLoading();
      const result = await Network.confirmContract(
        this.identityID.getText(),
        this.contract.getText().toUpperCase()
      );
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          this.props.navigation.navigate("ForgotEnterOtp", {
            // navData: result.payload
            navData: {
              ...result.payload,
              parent: this.navData ? this.navData.parent : null
            }
          });
        } else if (result.code === 1435) {
          //số chứng minh nhân dân khác lúc đăng ký 9 chữ số và 12 chữ số
          this.identityID.setErrorState(true);
          if (this.identityID.getText().length === 9) {
            this.setErrorMessage(Network.getMessageFromCode(result.code, 1));
          } else {
            this.setErrorMessage(Network.getMessageFromCode(result.code, 0));
          }
        } else if (result.code === 1400) {
          //
          Context.application.showModalAlert(
            Context.getString("auth_forgot_enter_id_user_no_register"),
            false,
            () => this.props.navigation.pop(2)
          );
        } else {
          this.identityID.setErrorState(true);
          this.contract.setErrorState(true);

          console.log(
            "ERROR-FORGOT-ENTER-CONTRACT: " + JSON.stringify(result.code)
          );
          console.log(
            "ERROR-FORGOT-ENTER-CONTRACT-TEST: " + JSON.stringify(result)
          );
          this.setErrorMessage(Network.getMessageFromCode(result.code));
        }
      }
    } catch (err) {
      console.log(
        "ERROR-CATCH-FORGOT-ENTER-CONTRACT: " + JSON.stringify(result.code)
      );
      Context.application.hideLoading();
      this.setErrorMessage(err.message);
    }
    //}
  };

  /**
   * <Function: show error >
   * @param message string value errol
   */
  setErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  /**
   * <Function: change state when change input text>
   */
  onChangeInput = () => {
    //hide error
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.identityID.setErrorState(false);
          this.contract.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: render error >
   */
  renderError() {
    return (
      <HDErrorMessage
        style={styles.error}
        textStyle={styles.error_text}
        errorMessage={this.state.errorMessage}
      />
    );
  }

  /**
   * <Function: render notification when need cofirm contract more: >
   */
  renderStatus() {
    if (!this.state.errorMessage) {
      return (
        <HDText style={styles.title}>
          <HDText>
            {Context.getString("auth_forgot_enter_contract_guide_01")}
          </HDText>
          <HDText style={styles.title_sub}>
            {Context.getString("auth_forgot_enter_contract_guide_02")}
          </HDText>
          <HDText>
            {Context.getString("auth_forgot_enter_contract_guide_03")}
          </HDText>
        </HDText>
      );
    } else {
      return null;
    }
  }

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_forgot_enter_contract_header")}
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          {this.renderStatus()}
          {this.renderError()}

          <HDRoundView style={styles.formContainer}>
            <HDTextInputNumber
              ref={ref => (this.identityID = ref)}
              placeholder={Context.getString(
                "auth_forgot_enter_contract_input_id"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              keyboardType="number-pad"
              label={Context.getString("auth_forgot_enter_contract_input_id")}
              containerStyle={styles.inputId}
              onChangeTextInput={this.onChangeInput}
              typeInput = {Util.Constant.TYPE_INPUT_TEXT.IDENTITY_CARD}
            />
            <HDTextInput
              ref={ref => (this.contract = ref)}
              placeholder={Context.getString(
                "auth_forgot_enter_contract_input_contract"
              )}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString(
                "auth_forgot_enter_contract_input_contract"
              )}
              containerStyle={styles.inputContract}
              isRightIcon={true}
              iconSource={Context.getImage("iconInfo")}
              regexType={Util.Constant.INPUT_REGEX_TYPE.CONTRACT}
              maxLength={Util.Constant.INPUT_CONTRACT_LENGTH}
              onRightClick={this.props.showGuideContract}
              onChangeTextInput={this.onChangeInput}
            />
          </HDRoundView>
          <View style={styles.space} />
        </View>

        <KeyboardAvoiding
          behavior="padding"
          enabled
          style={styles.avoiding_container}
        >
          <View style={styles.button_container}>
            <HDButton
              title={Context.getString(
                "auth_forgot_enter_contract_button_confirm"
              )}
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
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F5F6"
  },
  title: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    marginBottom: 20,
    textAlign: "center",
    color: Context.getColor("textStatus")
  },
  title_sub: {
    fontWeight: "bold",
    color: Context.getColor("textBlue")
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    shadowOpacity: 0.5,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  inputId: { marginBottom: 16 },
  inputContract: { marginBottom: 16 },
  space: { flex: 1 },
  avoiding_container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 16
  },
  button_container: {
    marginBottom: 16
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 23
  },
  error_text: {
    textAlign: "center"
  }
});
