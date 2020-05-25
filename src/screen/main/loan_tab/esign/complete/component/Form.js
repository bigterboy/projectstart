import React, { Component } from "react";
import { Platform, StyleSheet, Image, View } from "react-native";

import { HDTextInput, HDForm, HDText } from "component";
import PropTypes from "prop-types";
import Context from "context";
import Util from "util";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowED: true,
      isShowMC: true
    };
  }

  componentDidMount() {
    const { objEsign } = this.props;
    this.mapData(objEsign.data);
    this.checkLoanType(objEsign.data);
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.objEsign.data;
    console.log(
      "Complete-Form-componentWillReceiveProps: " + JSON.stringify(data)
    );
    this.mapData(data);
    this.checkLoanType(data);
  }

  mapData(data) {
    const { isShowED, isShowMC } = this.state;
    if (data) {
      const loanAmount = data.productPrice
        ? Util.String.formatMoney(data.productPrice)
        : " ";
      const monthlyAmount = data.monthlyInstallmentAmount
        ? Util.String.formatMoney(data.monthlyInstallmentAmount)
        : " ";
      const firstDue = Util.HDDate.formatTo(data.firstDue);
      const monthlyDueDate =
        Context.getString("common_date") + " " + data.monthlyDueDate;

      this.contractNo.setText(data.contractNumber);
      this.product.setText(data.productName ? data.productName : " ");
      this.loanAmount.setText(loanAmount);
      this.payMonthAmount.setText(monthlyAmount); //Số tiền thanh toàn hàng tháng
      this.firstPayDate.setText(firstDue);
      this.payMonthDate.setText(monthlyDueDate); //Ngày thanh toán hàng tháng

      if (isShowMC) {
        const chassisNo = data.chassisNo ? data.chassisNo : " ";
        const enginerNo = data.enginerNo ? data.enginerNo : " ";
        this.frameNo.setText(chassisNo); //Số khung
        this.electNo.setText(enginerNo); //Số máy
      }

      if (isShowED) {
        const series = data.serialNo ? data.serialNo : " ";
        this.series.setText(series);
      }
    }
  }

  //rerender ui by LoanType (ED, CL, MC)
  checkLoanType = data => {
    console.log("checkBaseLoanType: " + data.loanType);
    if (data.loanType === Util.Constant.LOAN_TYPE.ED) {
      this.setState({
        isShowED: true,
        isShowMC: false
      });
    } else if (data.loanType === Util.Constant.LOAN_TYPE.MC) {
      this.setState({
        isShowED: false,
        isShowMC: true
      });
    } else if (data.loanType === Util.Constant.LOAN_TYPE.CL) {
      this.setState({
        isShowED: false,
        isShowMC: false
      });
    }
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
          <View
            style={{
              borderRadius: Context.getSize(22 / 2),
              backgroundColor: Context.getColor("stateSigned")
            }}
          >
            <HDText style={styles.state_signed_text}>
              {Context.getString("common_signed")}
            </HDText>
          </View>
        </View>

        <View style={styles.header_line_container}></View>
      </View>
    );
  };

  renderForED = () => {
    const { isShowED } = this.state;
    if (isShowED) {
      return (
        <HDTextInput
          ref={ref => (this.series = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_series_no")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_series_no")}
          containerStyle={{ marginBottom: 8 }}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
          showLabel={true}
        />
      );
    }
  };

  renderForCL = () => {};

  renderForMC = () => {
    const { isShowMC } = this.state;
    if (isShowMC) {
      return (
        <View>
          <HDTextInput
            ref={ref => (this.frameNo = ref)}
            placeholder={Context.getString(
              "loan_tab_esign_overview_frame_no_placeholder"
            )}
            placeholderTextColor={Context.getColor("placeholderColor1")}
            label={Context.getString("loan_tab_esign_overview_frame_no")}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
            showLabel={true}
          />

          <HDTextInput
            ref={ref => (this.electNo = ref)}
            placeholder={Context.getString(
              "loan_tab_esign_overview_elect_no_placeholder"
            )}
            placeholderTextColor={Context.getColor("placeholderColor1")}
            label={Context.getString("loan_tab_esign_overview_elect_no")}
            containerStyle={{ marginBottom: 8 }}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
            showLabel={true}
          />
        </View>
      );
    }
  };

  renderFormInfo = () => {
    return (
      <View style={styles.form_info}>
        <HDTextInput
          ref={ref => (this.contractNo = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_contract_no")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_contract_no")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
          showLabel={true}
        />
        <HDTextInput
          ref={ref => (this.product = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_loan_product")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_loan_product")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
          showLabel={true}
        />
        <HDTextInput
          ref={ref => (this.loanAmount = ref)}
          placeholder={Context.getString(
            "loan_tab_esign_overview_product_price"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_esign_overview_product_price")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.special_text}
          editable={false}
          showLabel={true}
        />
        <HDTextInput
          ref={ref => (this.payMonthAmount = ref)}
          placeholder={Context.getString(
            "loan_tab_add_confirm_pay_month_amount"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_pay_month_amount")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.special_text}
          editable={false}
          showLabel={true}
        />

        <HDTextInput
          ref={ref => (this.firstPayDate = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_first_date_pay")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_first_date_pay")}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.special_text}
          editable={false}
          showLabel={true}
        />
        <HDTextInput
          ref={ref => (this.payMonthDate = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_pay_month_date")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_pay_month_date")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          editable={false}
          showLabel={true}
        />

        {this.renderForED()}
        {this.renderForMC()}
      </View>
    );
  };

  render() {
    return (
      <HDForm>
        {this.renderFormHeader()}

        {this.renderFormInfo()}
      </HDForm>
    );
  }
}

Form.propTypes = {};

const styles = StyleSheet.create({
  form_header: {
    width: "100%",
    height: Context.getSize(43),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16
  },
  header_line_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Context.getSize(1),
    backgroundColor: "#E7ECF0"
  },
  state_signed_text: {
    color: Context.getColor("stateSignedText"),
    fontSize: Context.getSize(10),
    fontWeight: "bold",
    lineHeight: Context.getSize(12),
    marginVertical: 5,
    marginHorizontal: 24
  },
  form_info: {
    width: "100%",
    paddingHorizontal: 16
  },
  input_container: {
    borderBottomWidth: Context.getSize(1),
    borderColor: "#E7ECF0"
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
  special_text: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlue1")
  }
});
