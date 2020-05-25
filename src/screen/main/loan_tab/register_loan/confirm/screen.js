import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, Header, HDButton, HDTextInput, HDText } from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      loanAmount: this.props.navigation.getParam("loanAmount"),
      loanTerm: this.props.navigation.getParam("loanTerm"),
      money: this.props.navigation.getParam("money"),
      fullName: this.props.navigation.getParam("fullName"),
      phoneNumber: this.props.navigation.getParam("phoneNumber"),
      cmnd: this.props.navigation.getParam("cmnd"),
      city: this.props.navigation.getParam("city"),
      region: this.props.navigation.getParam("region"),
      loanProduct: this.props.navigation.getParam("loanProduct"),
      loanType: this.props.navigation.getParam("loanType"),
      interestRate: this.props.navigation.getParam("interestRate"),
      percentPaidFirst: 0
    };
  }

  //Comment để check cho nhanh
  /**
   * <Function: check type loan and fill input text>
   */
  componentDidMount = async () => {
    if (this.state.loanType === Util.Constant.LOAN_TYPE.CL) {
      this.purpose.setText("Vay tiền mặt");
    } else if (this.state.loanType === Util.Constant.LOAN_TYPE.MC) {
      this.purpose.setText("Vay mua xe máy");
    } else if (this.state.loanType === Util.Constant.LOAN_TYPE.ED) {
      this.purpose.setText("Vay mua điện máy");
    } else if (this.state.loanType === Util.Constant.LOAN_TYPE.MB) {
      this.purpose.setText("Vay mua điện thoại");
    }

    if (this.state.loanAmount !== undefined) {
      this.loanAmount.setText(
        //this.props.navigation.getParam("loanAmount").toString()
        this.fomatNumber(this.state.loanAmount.toString())
      );
    }

    if (this.state.loanTerm !== undefined) {
      this.loanTerm.setText(
        //this.props.navigation.getParam("loanTerm").toString()
        this.state.loanTerm.toString() + " tháng"
      );
    }

    if (this.state.loanProduct !== undefined) {
      this.loanProduct.setText(this.state.loanProduct.toString());
    }

    if (this.state.money !== undefined) {
      //this.money.setText(this.props.navigation.getParam("money").toString());
      this.money.setText(this.fomatNumber(this.state.money.toString()));
    }

    if (this.state.loanType !== "CL") {
      await this.setState({
        percentPaidFirst: this.props.navigation.getParam("percentPaidFirst")
      });
      this.moneyPayFirst.setText(
        this.fomatNumber(this.getMoneyPayFirst().toString())
      );
    }
  };
  //10000 000
  /**
   * <Function: use for convert to ,  1000000 ===> 1,000,000>
   * @param input number to convert to string
   */
  fomatNumber = input => {
    let i;
    let temp = "";
    for (i = input.length - 1; i >= 0; i--) {
      let j;
      for (j = 0; j < 3; j++) {
        temp = input[i] + temp;
        if (i === 0) {
          return temp + "đ";
        }
        i--;
      }
      i++;
      if (i !== 0) {
        temp = "," + temp;
      }
    }
    return temp + "đ";
  };

  /**
   * <Function: calculator money need to pay>
   */
  getMoneyPayFirst = () => {
    return this.state.percentPaidFirst * this.state.loanAmount * 0.01;
  };

  /**
   * <Function: call api signUpLoanSave>
   */
  onPressConfirm = async () => {
    Context.application.showLoading();
    try {
      const result = await Network.signUpLoanSave(
        this.state.fullName,
        this.state.phoneNumber,
        this.state.cmnd,
        this.state.city,
        this.state.region,
        this.state.loanType,
        this.state.loanProduct,
        parseFloat(this.state.loanAmount),
        parseFloat(this.state.loanTerm),
        this.state.interestRate,
        this.state.percentPaidFirst,
        parseFloat(this.state.money),
        this.props.isLogin ? this.props.user.uuid : ""
      );
      Context.application.hideLoading();
      if (result != null) {
        if (result.code === 200) {
          console.log("API-COMPLETE: " + JSON.stringify(result));
          this.props.navigation.navigate("LoanFinishComplete");
        } else {
          console.log("ERROR-API-UPLOAD-FILE: " + result.code);
          console.log(
            "ERROR-API-UPLOAD-FILE: " + Network.getMessageFromCode(result.code)
          );
          Context.application.showModalAlert(
            "\n" + Context.getString("common_error_try_again") + "\n",
            false
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-CONTRACT-LIST: " + err.message);
      Context.application.hideLoading();
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false
      );
    }
  };

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_register_loan_nav")}
          navigation={this.props.navigation}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          <HDText
            style={{
              marginTop: 24,
              marginBottom: 24,
              textAlign: "center",
              fontSize: 14
            }}
          >
            {Context.getString("loan_tab_register_request_guess_check")}
          </HDText>

          <View style={styles.form_loan_container}>
            <View
              style={{ width: "100%", marginTop: 10, paddingHorizontal: 16 }}
            >
              <HDTextInput
                ref={ref => (this.purpose = ref)}
                placeholder="Mục đích vay"
                label="Mục đích vay"
                editable={false}
                inputStyle={styles.inputText}
              />

              {/* if type loan not cash CL */}
              {this.state.loanType !== "CL" ? (
                <View>
                  <HDTextInput
                    ref={ref => (this.loanProduct = ref)}
                    placeholder="Sản phẩm"
                    label="Sản phẩm"
                    editable={false}
                    inputStyle={styles.inputText}
                  />
                  <HDTextInput
                    ref={ref => (this.loanAmount = ref)}
                    placeholder="Giá sản phẩm"
                    label="Giá sản phẩm"
                    editable={false}
                    inputStyle={styles.inputColor}
                  />
                </View>
              ) : (
                <HDTextInput
                  ref={ref => (this.loanAmount = ref)}
                  placeholder="Số tiền vay"
                  label="Số tiền vay"
                  editable={false}
                  inputStyle={styles.inputColor}
                />
              )}
              <HDTextInput
                ref={ref => (this.loanTerm = ref)}
                placeholder="Thời hạn vay"
                label="Thời hạn vay"
                editable={false}
                inputStyle={styles.inputColor}
              />
              {this.state.loanType !== "CL" ? (
                <HDTextInput
                  ref={ref => (this.moneyPayFirst = ref)}
                  placeholder="Số tiền trả trước"
                  label="Số tiền trả trước"
                  editable={false}
                  inputStyle={styles.inputColor}
                />
              ) : null}
              <HDTextInput
                ref={ref => (this.money = ref)}
                placeholder="Số tiền thanh toán hàng tháng"
                label="Số tiền thanh toán hàng tháng"
                editable={false}
                inputStyle={styles.inputColor}
              />
            </View>
          </View>
          <HDText
            style={{
              textAlign: "center",
              fontSize: 14,
              marginTop: 16,
              fontStyle: "italic",
              fontWeight: "300",
              color: "#4A4A4A"
            }}
          >
            {Context.getString("loan_tab_register_for_consult")}
          </HDText>
          <HDButton
            title={Context.getString("common_confirm")}
            style={styles.confirm_button}
            onPress={() => this.onPressConfirm()}
            isShadow={true}
          />
        </ScrollView>
        <View style={[styles.bottom_container, styles.shadowBox]}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  form_loan_container: {
    //marginBottom: Context.getSize(77 + 13),
    width: Context.getSize(343),
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Context.getColor("background"),
    borderWidth: 1,
    borderColor: "#E5EAEF",
    shadowOpacity: 0.2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  bottom_container: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  confirm_button: {
    width: Context.getSize(343),
    height: Context.getSize(50),
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 24
  },

  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.0,

    elevation: 3
  },
  inputText: {
    fontWeight: "bold",
  },
  inputColor: {
    fontWeight: "bold",
    color: "#1E419B"
  }
});
