import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, Header, HDButton, HDTextInput, HDForm, HDText } from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidUpdate() {}

  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();

    const contractNo = this.navData.contractNumber;
    const product = this.navData.productName;
    const serial = this.navData.serialNo;
    const loanAmount = this.navData.loanAmount
      ? Util.String.formatMoney(this.navData.loanAmount)
      : "";
    const monthlyAmount = this.navData.monthlyInstallmentAmount
      ? Util.String.formatMoney(this.navData.monthlyInstallmentAmount)
      : "";
    const firstDue = Util.HDDate.formatTo(this.navData.firstDue);

    //Cho trường hợp dueDate(ngày: monthlyDueDate) bị null
    let dueDate = null;
    if (this.navData.monthlyDueDate) {
      dueDate =
        Context.getString("common_date") +
        " " +
        this.navData.monthlyDueDate.toString();
    }

    this.ipContractNo.setText(contractNo);
    this.ipProduct.setText(product);
    if (this.ipSeries) this.ipSeries.setText(serial);
    this.ipLoanAmount.setText(loanAmount);
    this.ipPayMonthAmount.setText(monthlyAmount);
    this.ipFirstDatePay.setText(firstDue);
    this.ipPayMonthDate.setText(dueDate);
  };

  saveLoanAPI = async () => {
    try {
      Context.application.showLoading();
      const result = await Network.loanSaveLoan(
        this.navData.contractNumber,
        this.navData.nationalID,
        this.storeUser.customer.uuid
      );
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          this.props.navigation.navigate("LoanCurrentContract", {
            navData: {
              showGuildDelete: true
            }
          });
        } else if (result.code === 1434) {
          Context.application.showModalAlert(
            "\n" + Network.getMessageFromCode(result.code) + "\n",
            () => this.props.navigation.pop()
          );
        } else {
          console.log("ERROR-API-SAVE-LOAN: " + result.code);
          console.log(
            "ERROR-API-SAVE-LOAN: " + Network.getMessageFromCode(result.code)
          );
          Context.application.showModalAlert(
            "\n" + Context.getString("common_error_try_again") + "\n",
            () => this.props.navigation.pop()
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-SAVE-LOAN: " + err.message);
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        () => this.props.navigation.pop()
      );
    }
    Context.application.hideLoading();

    // this.props.navigation.navigate("LoanCurrentContract", {
    //   navData: {
    //     showGuildDelete: true
    //   }
    // });
  };

  onPressComplete = () => {
    this.saveLoanAPI();
  };

  renderStatus = () => {
    return (
      <View
        style={{
          borderRadius: Context.getSize(22 / 2),
          backgroundColor: Context.getColor("stateSigned")
        }}
      >
        <HDText style={styles.state_signed_text}>{this.navData.status}</HDText>
      </View>
    );
  };

  renderFormHeader = () => {
    return (
      <View style={styles.form_header}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <HDText style={styles.input_text}>
            {Context.getString("loan_tab_add_confirm_state")}
          </HDText>

          {this.renderStatus()}
        </View>

        <View style={styles.header_line_container}></View>
      </View>
    );
  };

  renderSeries = () => {
    if (this.navData.serialNo) {
      return (
        <HDTextInput
            ref={ref => (this.ipSeries = ref)}
            placeholder={Context.getString("loan_tab_add_confirm_series_no")}
            label={Context.getString("loan_tab_add_confirm_series_no")}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
          />
      )
    }
    return null
    
  }

  renderFormInfo = () => {
    return (
      <View style={{ width: "100%", paddingHorizontal: 16 }}>
        <HDTextInput
          ref={ref => (this.ipContractNo = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_contract_no")}
          label={Context.getString("loan_tab_add_confirm_contract_no")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
        />
        <HDTextInput
          ref={ref => (this.ipProduct = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_loan_product")}
          label={Context.getString("loan_tab_add_confirm_loan_product")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
        />
        
        {this.renderSeries()}

        <HDTextInput
          ref={ref => (this.ipLoanAmount = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_loan_amount")}
          label={Context.getString("loan_tab_add_confirm_loan_amount")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
        />
        <HDTextInput
          ref={ref => (this.ipPayMonthAmount = ref)}
          placeholder={Context.getString(
            "loan_tab_add_confirm_pay_month_amount"
          )}
          label={Context.getString("loan_tab_add_confirm_pay_month_amount")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_blue_text}
          editable={false}
        />
        <HDTextInput
          ref={ref => (this.ipFirstDatePay = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_first_date_pay")}
          label={Context.getString("loan_tab_add_confirm_first_date_pay")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_blue_text}
          editable={false}
        />
        <HDTextInput
          ref={ref => (this.ipPayMonthDate = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_pay_month_date")}
          label={Context.getString("loan_tab_add_confirm_pay_month_date")}
          containerStyle={{ marginBottom: 8 }}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_add_confirm_nav")}
          navigation={this.props.navigation}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_add_confirm_status")}
          </HDText>

          <HDForm isShadow={true}>
            {this.renderFormHeader()}

            {this.renderFormInfo()}
          </HDForm>
        </ScrollView>

        <View style={styles.button_container}>
          <HDButton
            title={Context.getString("loan_tab_add_confirm_button_complete")}
            onPress={this.onPressComplete}
            isShadow={true}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 77 + 24,
    backgroundColor: "#F3F5F6"
  },
  status_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    color: Context.getColor("textStatus"),
    textAlign: "center",
    // marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 16
  },
  form_header: {
    width: "100%",
    height: Context.getSize(43),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8
  },
  header_line_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Context.getSize(1),
    backgroundColor: Context.getColor("formItemSeparatorLine")
  },
  state_signed_text: {
    color: Context.getColor("stateSignedText"),
    fontSize: Context.getSize(10),
    fontWeight: "bold",
    lineHeight: Context.getSize(12),
    marginVertical: 5,
    marginHorizontal: 24
  },
  button_container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop:8, 
    paddingBottom: 24,
    backgroundColor: 'white'
  },
  input_container: {
    borderBottomWidth: Context.getSize(0.5),
    borderColor: Context.getColor("inputBorder")
  },
  input_label: {
    fontSize: Context.getSize(12),
    fontWeight: "400",
    lineHeight: 14,
    color: Context.getColor("textBlack")
  },
  input_text: {
    fontSize: Context.getSize(16),
    fontWeight: "500",
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlack")
  },
  input_blue_text: {
    fontSize: Context.getSize(16),
    fontWeight: "500",
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlue1")
  }
});
