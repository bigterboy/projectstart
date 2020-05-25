import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, HDGroupHeader, KeyboardAwareScroll } from "component";
import BottomButton from "../component/BottomButton";
import { OverviewForm, OverviewFormBank } from "./component";

import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

const bottomHeight = Context.getSize(77);
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      modalError: false
    };
  }

  //componentDidUpdate() {}
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
  };

  //Validate require field
  validate = data => {
    let haveEmptyField = false;

    if (!data.monthlyDueDate) {
      this.props.updateStatusMonthly(true);
      haveEmptyField = true;
    }

    if (data.loanType == Util.Constant.LOAN_TYPE.CL) {
      if (!data.accountName) {
        this.props.updateStatusBankUser(true);
        haveEmptyField = true;
      }
      if (!data.accountNo) {
        this.props.updateStatusBankAcc(true);
        haveEmptyField = true;
      }
      if (!data.bankName) {
        this.props.updateStatusBankName(true);
        haveEmptyField = true;
      }
    } else if (data.loanType == Util.Constant.LOAN_TYPE.MC) {
      if (!data.chassisNo) {
        this.props.updateStatusChassis(true);
        haveEmptyField = true;
      }

      if (!data.enginerNo) {
        this.props.updateStatusEnginer(true);
        haveEmptyField = true;
      }
    }

    return haveEmptyField;
  };

  onPressConfirm = () => {
    const { data } = this.props.objEsign;
    let haveEmptyField = this.validate(data);
    if (haveEmptyField) {
      Context.application.showModalAlert(
        Context.getString("loan_tab_esign_overview_warning_empty_field"),
        false
      );
    } else {
      const disInfo = {
        accountName: data ? data.accountName : "",
        accountNumber: data ? data.accountNo : "",
        bankName: data ? data.bankName : "",
        brandName: "",
        contractCode: data ? data.contractNumber : "",
        customerUuid: this.storeUser.customer.uuid
      };

      const chassis = {
        chassisNo: data ? data.chassisNo : "",
        contractCode: data ? data.contractNumber : "",
        engineerNo: data ? data.enginerNo : ""
      };

      const due = {
        contractCode: data ? data.contractNumber : "",
        monthlyDueDate: data ? data.monthlyDueDate : null,
        firstDate: data ? data.firstDue : null,
        endDate: data ? data.endDue : null
      };

      const loanType = data.loanType;
      if (loanType == Util.Constant.LOAN_TYPE.ED) {
        this.updateAPI(null, null, due);
      } else if (loanType == Util.Constant.LOAN_TYPE.CL) {
        this.updateAPI(disInfo, null, due);
      } else if (loanType == Util.Constant.LOAN_TYPE.MC) {
        this.updateAPI(null, chassis, due);
      }
    }
  };

  //API Update info Overview
  updateAPI = async (disInfo, chassis, due) => {
    try {
      Context.application.showLoading();
      var result = await Network.esignUpdateInfo(disInfo, chassis, due);
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          //Next to step 2
          this.props.updateEsignStep(2);
          this.props.navigation.navigate("LoanESignContract");
        } else {
          console.log("ERROR-API-UPDATE-ESIGN-INFO " + result.code);
          console.log(
            "ERROR-API-UPDATE-ESIGN-INFO " +
              Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-UPDATE-ESIGN-INFO" + err.message);
      Context.application.hideLoading();
    }
  };

  renderLoanInfo = () => {
    return (
      <View style={styles.loan_info}>
        <HDGroupHeader
          style={styles.group_header}
          leftTextStyle={styles.group_header_text}
          leftTitle={Context.getString("loan_tab_esign_overview_loan_info")}
        />
        <OverviewForm
          ref={ref => (this.overviewForm = ref)}
          loanCode={this.props.loanCode}
        />
      </View>
    );
  };

  renderAccountInfo = () => {
    const { objEsign } = this.props;
    if (objEsign.data) {
      if (objEsign.data.loanType === Util.Constant.LOAN_TYPE.CL) {
        return (
          <View style={styles.account_info}>
            <HDGroupHeader
              style={styles.group_header}
              leftTextStyle={styles.group_header_text}
              leftTitle={Context.getString(
                "loan_tab_esign_overview_account_info"
              )}
            />
            <OverviewFormBank ref={ref => (this.bankForm = ref)} />
          </View>
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          <KeyboardAwareScroll
            style={{
              width: "100%",
              paddingHorizontal: 16,
              paddingBottom: 16
            }}
          >
            {this.renderLoanInfo()}
            {this.renderAccountInfo()}
          </KeyboardAwareScroll>
        </ScrollView>
        <BottomButton
          title={Context.getString("loan_tab_esign_button_accept")}
          onPress={this.onPressConfirm}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen"),
    justifyContent: "flex-end"
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: bottomHeight + 16
  },
  group_header: {
    marginBottom: 8,
    paddingHorizontal: 0
  },
  group_header_text: {
    color: Context.getColor("groupHeader"),
    fontSize: Context.getSize(12),
    fontWeight: "bold",
    lineHeight: Context.getSize(15)
  },
  loan_info: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8
  },
  account_info: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
