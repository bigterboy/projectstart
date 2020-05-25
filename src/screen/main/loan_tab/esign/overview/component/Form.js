import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { HDTextInput, ModalMonthlyDue, ModalSerialNo } from "component";

import Context from "context";
import Util from "util";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDue: false,
      modalElectNo: false,
      isShowED: true,
      isShowMC: true,
      disTouchMonthlyDue: false,
      disTouchElect: false
    };
  }

  componentDidMount = async () => {
    const { objEsign } = this.props;
    this.mapData(objEsign.data);
    this.checkLoanType(this.props.loanCode);
    this.disableFieldHaveData();
  };

  componentWillReceiveProps(nextProps) {
    const data = nextProps.objEsign.data;
    this.mapData(data);

    if(nextProps.objEsign.currentStep > 1){
      this.setState({
        disTouchMonthlyDue: true,
        disTouchElect: true
      })
    }

  }

  componentDidUpdate = (preProps, preStates) => {
    const currObj = this.props.objEsign;
    const preObj = preProps.objEsign;
    if (currObj.emptyMonthlyDue) {
      this.payMonthDate.setErrorState(true);
    } else {
      this.payMonthDate.setErrorState(false);
    }

    if (currObj.data.loanType === Util.Constant.LOAN_TYPE.MC) {
      if (currObj.emptyChassis) {
        this.frameNo.setErrorState(true);
      } else {
        this.frameNo.setErrorState(false);
      }

      if (currObj.emptyEnginer) {
        this.electNo.setErrorState(true);
      } else {
        this.electNo.setErrorState(false);
      }
    }
  };

  disableFieldHaveData = () => {
    const { objEsign } = this.props;
    if (objEsign.data) {
      const { monthlyDueDate } = objEsign.data;
      if (monthlyDueDate) {
        this.setState({
          disTouchMonthlyDue: true
        });
      }
    }

    if (objEsign.data) {
      const { chassisNo, enginerNo } = objEsign.data;
      if (chassisNo && enginerNo) {
        this.setState({
          disTouchElect: true
        });
      }
    }
  };

  //rerender ui by LoanType (ED, CL, MC)
  checkLoanType = data => {
    if (data === Util.Constant.LOAN_TYPE.ED) {
      this.setState({
        isShowED: true,
        isShowMC: false
      });
    } else if (data === Util.Constant.LOAN_TYPE.MC) {
      this.setState({
        isShowED: false,
        isShowMC: true
      });
    } else if (data === Util.Constant.LOAN_TYPE.CL) {
      this.setState({
        isShowED: false,
        isShowMC: false
      });
    }
  };

  mapData(data) {
    const { isShowED, isShowMC } = this.state;
    if (data) {
      const productName = data.productName ? data.productName : " ";
      const loanAmount = data.productPrice
        ? Util.String.formatMoney(data.productPrice)
        : " ";
      const interestRate = data.interestRate ? data.interestRate + "%" : " ";
      const tenor = data.tenor + " " + Context.getString("common_month");
      const monthlyAmount = data.monthlyInstallmentAmount
        ? Util.String.formatMoney(data.monthlyInstallmentAmount)
        : " ";
      const firstDue = data.firstDue
        ? Util.HDDate.formatTo(data.firstDue)
        : " ";
      const endDue = data.endDue ? Util.HDDate.formatTo(data.endDue) : " ";
      const monthlyDueDate = data.monthlyDueDate
        ? Context.getString("common_date") + " " + data.monthlyDueDate
        : "";
      const insurance =
        data.isInsurance === "Y"
          ? Context.getString("common_yes")
          : Context.getString("common_no");
      const bankFee = data.bankFee ? Util.String.formatMoney(data.bankFee) : "";

      this.contractNo.setText(data.contractNumber);
      this.product.setText(productName);
      this.loanAmount.setText(loanAmount);
      this.interestRate.setText(interestRate); //Lãi suất
      this.numberTerms.setText(tenor); //Thời hạn vay
      this.payMonthAmount.setText(monthlyAmount); //Số tiền thanh toàn hàng tháng
      this.firstPayDate.setText(firstDue);
      this.lastPayDate.setText(endDue);
      this.payMonthDate.setText(monthlyDueDate); //Ngày thanh toán hàng tháng
      this.loanInsurance.setText(insurance);
      this.sendMoneyFee.setText(bankFee); //Phí chuyển tiền

      if (isShowMC) {
        const chassisNo = data.chassisNo ? data.chassisNo : "";
        const enginerNo = data.enginerNo ? data.enginerNo : "";
        this.frameNo.setText(chassisNo); //Số khung
        this.electNo.setText(enginerNo); //Số máy
      }

      if (isShowED) {
        const series = data.serialNo ? data.serialNo : "";
        this.series.setText(series);
      }
    }
  }

  showModalDue = () => {
    console.log("showModalDue");
    this.setState({ modalDue: true });
  };

  hideModalDue = () => {
    const { objEsign } = this.props;
    const data = objEsign.data;
    this.setState({
      modalDue: false
    });
  };

  showModalElectNo = () => {
    this.setState({ modalElectNo: true });
  };

  hideModalElectNo = () => {
    const { objEsign } = this.props;
    this.setState({
      modalElectNo: false
    });
  };

  confirmModalElectNo = (frameNo, electNo) => {
    this.frameNo.setText(frameNo);
    this.electNo.setText(electNo);

    this.props.updateEsignObj({
      chassisNo: frameNo,
      enginerNo: electNo
    });

    this.props.updateStatusChassis(false);
    this.props.updateStatusEnginer(false);
    this.frameNo.setErrorState(false);
    this.electNo.setErrorState(false);
    this.hideModalElectNo();
  };

  createDate = (value, tenor) => {
    const date = new Date();
    date.setDate(value);
    if (value > Util.HDDate.getDate()) {
      if (tenor) date.setMonth(date.getMonth() + tenor);
      return Util.HDDate.momentDate(date);
    } else {
      if (tenor) {
        date.setMonth(date.getMonth() + 1 + tenor);
      } else {
        date.setMonth(date.getMonth() + 1);
      }

      return Util.HDDate.momentDate(date);
    }
  };

  confirmMonthlyDue = code => {
    const { objEsign } = this.props;
    let firstDate = this.createDate(code);

    let lastDate = this.createDate(code, objEsign.data.tenor);

    this.props.updateEsignObj({
      monthlyDueDate: code,
      firstDue: firstDate.toJSON(),
      endDue: lastDate.toJSON()
    });
    this.props.updateStatusMonthly(false);
    this.payMonthDate.setErrorState(false);
    this.hideModalDue();
  };

  renderForMC = () => {
    const { objEsign } = this.props;
    const { isShowMC } = this.state;
    if (isShowMC) {
      // let disTouchElect = false;
      // if (objEsign.data) {
      //   const { chassisNo, enginerNo } = objEsign.data;
      //   if (chassisNo && enginerNo) {
      //     disTouchElect = true;
      //   }
      // }

      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={styles.touch_area}
            onPress={this.showModalElectNo}
            disabled={this.state.disTouchElect}
          />

          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
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
          </View>
          <View style={{ flex: 1, paddingLeft: 8, paddingRight: 16 }}>
            <HDTextInput
              ref={ref => (this.electNo = ref)}
              placeholder={Context.getString(
                "loan_tab_esign_overview_elect_no_placeholder"
              )}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_esign_overview_elect_no")}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  renderForED = () => {
    const { isShowED } = this.state;
    if (isShowED) {
      return (
        <View style={{ flex: 1, paddingLeft: 8, paddingRight: 16 }}>
          <HDTextInput
            ref={ref => (this.series = ref)}
            placeholder={Context.getString("loan_tab_add_confirm_series_no")}
            placeholderTextColor={Context.getColor("placeholderColor1")}
            label={Context.getString("loan_tab_add_confirm_series_no")}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
            showLabel={true}
          />
        </View>
      );
    }
    return null;
  };

  renderFormInfo = () => {
    //const { objEsign } = this.props;

    //Disable touch nếu đã có ngày thanh toán hàng tháng
    // let disTouchMonthlyDue = false;
    // if (objEsign.data) {
    //   const { monthlyDueDate } = objEsign.data;
    //   if (monthlyDueDate) {
    //     disTouchMonthlyDue = true;
    //   }
    // }

    return (
      <View style={{ width: "100%" }}>
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
            <HDTextInput
              ref={ref => (this.product = ref)}
              placeholder={Context.getString("loan_tab_esign_overview_product")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_esign_overview_product")}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
              showTooltip={true}
            />
          </View>

          {this.renderForED()}
        </View>

        {this.renderForMC()}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
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
          </View>

          <View style={{ flex: 1, paddingLeft: 8, paddingRight: 16 }}>
            <HDTextInput
              ref={ref => (this.interestRate = ref)}
              placeholder={Context.getString(
                "loan_tab_add_confirm_interest_rate"
              )}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_add_confirm_interest_rate")}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.special_text}
              editable={false}
              showLabel={true}
            />
          </View>
        </View>

        <HDTextInput
          ref={ref => (this.numberTerms = ref)}
          placeholder={Context.getString("loan_tab_add_confirm_number_terms")}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_number_terms")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
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

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
            <HDTextInput
              ref={ref => (this.firstPayDate = ref)}
              placeholder={Context.getString(
                "loan_tab_add_confirm_first_date_pay"
              )}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_add_confirm_first_date_pay")}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
            />
          </View>

          <View style={{ flex: 1, paddingLeft: 8, paddingRight: 16 }}>
            <HDTextInput
              ref={ref => (this.lastPayDate = ref)}
              placeholder={Context.getString(
                "loan_tab_add_confirm_last_date_pay"
              )}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_add_confirm_last_date_pay")}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
            />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.touch_area}
            onPress={this.showModalDue}
            disabled={this.state.disTouchMonthlyDue}
          />
          <HDTextInput
            ref={ref => (this.payMonthDate = ref)}
            placeholder={Context.getString(
              "loan_tab_add_confirm_pay_month_date"
            )}
            placeholderTextColor={Context.getColor("placeholderColor1")}
            label={Context.getString("loan_tab_add_confirm_pay_month_date")}
            containerStyle={styles.input}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
            showLabel={true}
          />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
            <HDTextInput
              ref={ref => (this.loanInsurance = ref)}
              placeholder={Context.getString(
                "loan_tab_add_confirm_loan_insurance"
              )}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_add_confirm_loan_insurance")}
              containerStyle={{ marginBottom: 8 }}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
            />
          </View>

          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 8 }}>
            <HDTextInput
              ref={ref => (this.sendMoneyFee = ref)}
              placeholder={Context.getString("loan_tab_add_confirm_send_fee")}
              placeholderTextColor={Context.getColor("placeholderColor1")}
              label={Context.getString("loan_tab_add_confirm_send_fee")}
              containerStyle={{ marginBottom: 8 }}
              inputContainerStyle={styles.input_container}
              labelStyle={styles.input_label}
              inputStyle={styles.input_text}
              editable={false}
              showLabel={true}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    console.log("CO VO DAY KOHNG RENDER FOMR");

    const { objEsign } = this.props;
    return (
      <View style={styles.form} {...this.props}>
        {this.renderFormInfo()}

        <ModalMonthlyDue
          isVisible={this.state.modalDue}
          currentValue={objEsign.data ? objEsign.data.monthlyDueDate : null}
          pressCancelX={this.hideModalDue}
          onPressConfirm={this.confirmMonthlyDue}
        />

        <ModalSerialNo
          isVisible={this.state.modalElectNo}
          data={objEsign.data}
          pressCancelX={this.hideModalElectNo}
          onPressConfirm={this.confirmModalElectNo}
        />
      </View>
    );
  }
}

Form.propTypes = {};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 16,
    shadowOpacity: 1,
    shadowColor: Context.getColor("shadowForm"),
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    backgroundColor: "white"
  },
  input: {
    paddingHorizontal: 16
  },
  input_container: {
    borderBottomWidth: Context.getSize(1),
    borderColor: "#E7ECF0"
  },
  input_label: {
    fontSize: Context.getSize(10),
    fontWeight: "400",
    lineHeight: Context.getSize(14),
    color: Context.getColor("textBlack")
  },
  input_text: {
    fontSize: Context.getSize(14),
    fontWeight: "500",
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlack")
  },
  special_text: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlue1")
  },
  touch_area: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});
