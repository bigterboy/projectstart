import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BaseScreen,
  Header,
  HDButton,
  HDTextInput,
  DismissKeyboardView,
  KeyboardAvoiding,
  HDErrorMessage,
  HDText,
  HDTextInputNumber
} from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ""
    };
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.btnConfirm.setDisabled(true);
  };

  confirmAPI = async () => {
    try {
      Context.application.showLoading();
      const result = await Network.loanConfirmContract(
        this.contractNo.getText().toUpperCase(),
        this.idNo.getText(),
        this.storeUser.customer.uuid
      );
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          console.log("API-ADD-LOAN-COMPLETE: " + result.code);
          this.props.navigation.navigate("LoanAddConfirm", {
            navData: result.payload
          });
        } else {
          console.log("ERROR-API-ADD-LOAN: " + result.code);
          console.log(
            "ERROR-API-ADD-LOAN: " + Network.getMessageFromCode(result.code)
          );
          this.setErrorMessage(Network.getMessageFromCode(result.code));
        }
      }
    } catch (err) {
      console.log("ERROR-API-ADD-LOAN: " + err.message);
      Context.application.hideLoading();
      this.setErrorMessage(err.message);
    }

    // this.props.navigation.navigate("LoanAddConfirm");
  };

  onPressNext = () => {
    if (this.contractNo.empty()) {
      this.setErrorMessage("Vui lòng nhập số hợp đồng");
      return;
    }

    if (this.idNo.empty()) {
      this.setErrorMessage("Vui lòng nhập số CMND/CCCD");
      return;
    }

    if (!Util.String.validateIdentityID(this.idNo.getText())) {
      this.setErrorMessage(
        Context.getString("auth_forgot_enter_id_error_number_characters")
      );
      return;
    }

    this.confirmAPI();
  };

  onChangeTextInput = () => {
    this.setErrorMessage("");

    // Enable button when input !=== ""
    this.setStateButton();

  };

  setStateButton = () => {
    const contractNo = this.contractNo.getText();
    const idNo = this.idNo.getText();

    if (contractNo !== "" && idNo !== "") {
      this.btnConfirm.setDisabled(false);
    } else {
      this.btnConfirm.setDisabled(true);
    }
  };

  setErrorMessage = message => {
    this.setState({
      errorMessage: message
    });
  };

  render() {
    return (
      <DismissKeyboardView style={styles.container}>
        <Header
          title={Context.getString("loan_tab_add_info_nav")}
          navigation={this.props.navigation}
        />

        <View style={styles.content_container}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_add_info_status")}
          </HDText>

          <View style={styles.box}>
            <HDTextInput
              ref={ref => (this.contractNo = ref)}
              placeholder={Context.getString("loan_tab_add_info_contract_no")}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString("loan_tab_add_info_contract_no")}
              isRightIcon={true}
              iconSource={Context.getImage("iconInfo")}
              regexType={Util.Constant.INPUT_REGEX_TYPE.CONTRACT}
              maxLength={Util.Constant.INPUT_CONTRACT_LENGTH}
              onChangeTextInput={this.onChangeTextInput}
              onRightClick={this.props.showGuideContract}
            />

            <HDTextInputNumber
              ref={ref => (this.idNo = ref)}
              placeholder={Context.getString("loan_tab_add_info_id_no")}
              placeholderTextColor={Context.getColor("textBlack")}
              label={Context.getString("loan_tab_add_info_id_no")}
              isRightIcon={true}
              iconSource={Context.getImage("iconInfo")}
              //maxLength={Util.Constant.INPUT_IDENTITY_LENGTH}
              keyboardType="number-pad"
              onChangeTextInput={this.onChangeTextInput}
              onRightClick={this.props.showGuideId}
              typeInput = {Util.Constant.TYPE_INPUT_TEXT.IDENTITY_CARD}
            />
          </View>

          <View style={styles.error_container}>
            <HDErrorMessage
              errorMessage={this.state.errorMessage}
              style={styles.error}
              textStyle={styles.error_text}
            />
          </View>
        </View>

        <KeyboardAvoiding
          behavior="padding"
          enabled
          style={styles.avoiding_container}
        >
          <View style={styles.button_container}>
            <HDButton
              ref={ref => (this.btnConfirm = ref)}
              title={Context.getString("loan_tab_add_info_button_next")}
              onPress={this.onPressNext}
              isShadow={true}
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
    backgroundColor: Context.getColor("backgroundScreen")
  },
  content_container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  status_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    color: Context.getColor("textStatus"),
    textAlign: "center",
    marginTop: 24,
    marginBottom: 24
  },
  box: {
    width: Context.getSize(343),
    // height: Context.getSize(140),
    backgroundColor: Context.getColor("background"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Context.getSize(10),
    shadowOpacity: 0.4,
    shadowColor: "#9B9B9B",
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  avoiding_container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 16
  },
  button_container: {
    marginBottom: 16
  },
  error_container: {
    width: '100%',
    paddingTop: 24,
    paddingHorizontal: 16
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
  },
  error_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    textAlign: "center"
  }
});
