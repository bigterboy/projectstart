import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
import ModalNoReg from "./ModalNoReg";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      modalNoReg: false
    };
    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props.navigation.dangerouslyGetParent()));
  }

  /**
   * <Function: show modal>
   */
  showModalNoReg = () => {
    this.setState({
      modalNoReg: true
    });
  };

  /**
   * <Function: hide modal>
   */
  hideModalNoReg = callback => {
    this.setState(
      {
        modalNoReg: false
      },
      () => {
        if (callback) callback();
      }
    );
  };

  /**Press Register in popup */
  backToRegister = () => {
    this.hideModalNoReg(() => {
      this.props.navigation.navigate("RegisterEnterContract");
    });
  };

  /**
   * <Function: check validate input>
   * return: true or false
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
   * <Function: call API AND SHOW ERROL>
   */
  confirm = async () => {
    if (this.validate()) {
      try {
        Context.application.showLoading();
        const result = await Network.confirmID(this.identityID.getText());
        Context.application.hideLoading();
        if (result != null) {
          if (result.code === 200) {
            console.log(
              "API-CONFIRM-ID-COMPLETE: " + JSON.stringify(result.payload)
            );
            this.props.navigation.navigate("ForgotEnterOtp", {
              navData: {
                ...result.payload,
                parent: this.navData ? this.navData.parent : null
              }
            });
          } else if (result.code === 1421 || result.code === 1441) {
            this.props.navigation.navigate("ForgotEnterContract", {
              navData: {
                parent: this.navData ? this.navData.parent : null,
                identityID: this.identityID.getText()
              }
            });
          } else if (result.code === 1107) {
            this.showModalNoReg();
          } else {
            this.identityID.setErrorState(true);
            this.setErrorMessage(Network.getMessageFromCode(result.code));
          }
        }
      } catch (err) {
        console.log("ERROR-FORGOT-ENTER-ID: " + err.message);
        Context.application.hideLoading();
        this.setErrorMessage(err.message);
      }
    }
  };

  /**
   * <Function: set error for showing>
   * @param message Content of website.
   */
  setErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  /**
   * <Function: when change text or blur input set error null>
   */
  onChangeInput = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.identityID.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: render screen>
   */
  render() {
    console.log("GIA TRI WIDTH: " + Context.getWindow().width);
    return (
      <DismissKeyboardView>
        <Header
          title={Context.getString("auth_forgot_enter_id_header")}
          navigation={this.props.navigation}
          // leftOnPress={() => {
          //   this.props.navigation.goBack("id-1571676161589-2")
          // }}
        />

        <View style={styles.container}>
          <HDText style={styles.title}>
            {Context.getString("auth_forgot_enter_id_guide")}
          </HDText>
          <HDRoundView style={styles.formContainer}>
            <HDTextInputNumber
              ref={ref => (this.identityID = ref)}
              placeholder={Context.getString("auth_forgot_enter_id_input_id")}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString("auth_forgot_enter_id_input_id")}
              keyboardType="number-pad"
              isRightIcon={true}
              iconSource={Context.getImage("iconInfo")}
              //maxLength={Util.Constant.INPUT_IDENTITY_LENGTH}
              onRightClick={this.props.showGuideId}
              onChangeTextInput={this.onChangeInput}
              typeInput = {Util.Constant.TYPE_INPUT_TEXT.IDENTITY_CARD}
            />

            <HDErrorMessage
              style={styles.error}
              errorMessage={this.state.errorMessage}
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
              title={Context.getString("auth_forgot_enter_id_button_confirm")}
              isShadow={true}
              onPress={this.confirm}
              // style={{ marginBottom: 10 }}
            />
          </View>
        </KeyboardAvoiding>

        <ModalNoReg
          isVisible={this.state.modalNoReg}
          onPressConfirm={this.backToRegister}
        />
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
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20
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
  inputId: { marginBottom: 0 },
  space: { flex: 1 },
  avoiding_container: {
    position: "absolute",
    width: "100%",
    bottom: 0
    //paddingHorizontal: 16
    //backgroundColor: "white",
  },
  button_container: {
    marginBottom: 16,
    width: (343 / 375) * Context.getWindow().width,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: 10
  },
  error: {
    paddingHorizontal: 16
  }
});
