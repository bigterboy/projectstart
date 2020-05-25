import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  BaseScreen,
  Header,
  HDGroupHeader,
  HDSlider,
  HDNumberFormat,
  HDLoanTerm,
  HDButton,
  HDText,
  HDAnimatedLoading
} from "component";
import Context from "context";
import Network from "middleware/helper/Network";
import Util from "util";
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      loanPurpose: -1,
      loanAmount: 1000000,
      loanTerm: 6,
      money: 0,
      interestRate: 0, // set default
      loanType: null,
      isLoading: true
    };
  }

  componentDidMount = async () => {
    const temp = this.props.navigation.getParam("loanType")
    if (temp) {
      this.setState({
        loanType: temp
      });
    } else {
      this.setState({
        loanType: Util.Constant.LOAN_TYPE.CL
      });
    }

    setTimeout(() => {
      //Get interestRate from API or from Navgiation
      this.getInterestRate();
    }, 1000);
  };

  componentWillUnmount = () => {
    //Clean data screen redux
    this.props.cleanData();
  }

  finishLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  setSelectedTerm = () => {
    if (this.loanTerm) this.loanTerm.selectedIndex(0);
  }

  getInterestRate = async () => {
    const temp = this.props.navigation.getParam("interestRate");
    if (temp) {
      console.log("Chay get data from nav");
      this.setState({
        interestRate: this.props.navigation.getParam("interestRate")
      });
    } else {
      console.log("Chay get data from api");
      await this.getAPIInterestRate();
    }
    this.setSelectedTerm()
  };

  getAPIInterestRate = async () => {
    try {
      const result = await Network.interestRate();
      this.finishLoading();
      if (result != null) {
        if (result.code === 200) {
          this.setState({
            interestRate: result.payload[0].interestRate
          });
        } else {
          console.log("ERROR-API-INTEREST-RATE: " + result.code);
          console.log(
            "ERROR-API-INTEREST-RATE: " +
            Network.getMessageFromCode(result.code)
          );
          Context.application.showModalAlert(
            "\n" + Context.getString("common_error_try_again") + "\n",
            false,
            () => this.props.navigation.pop()
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-INTEREST-RATE: " + err.message);
      this.finishLoading();
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.pop()
      );
    }
  };

  onChangeAmount = value => {
    this.setState({
      ...this.state,
      loanAmount: value
      // money: Util.String.returnReckonMoneyLoan(
      //   value,
      //   //Util.Constant.INTEREST_RATE.CL,
      //   this.state.interestRate,
      //   this.state.loanTerm,
      //   0
      // )
    });
  };

  onSelectTerm = item => {
    this.setState({
      ...this.state,
      loanTerm: item.value
      // money: Util.String.returnReckonMoneyLoan(
      //   this.state.loanAmount,
      //   // Util.Constant.INTEREST_RATE.CL,
      //   this.state.interestRate,
      //   item.value,
      //   0
      // )
    });
  };

  returnMoneyPayEachMonth = () => {
    return Util.String.returnReckonMoneyLoan(
      this.state.loanAmount,
      this.state.interestRate,
      this.state.loanTerm,
      0
    );
  };

  onPressConfirm = () => {
    // console.log("onPressConfirm");
    // console.log("Mục đích vay: " + this.state.loanPurpose);
    // console.log("SỐ tiền vay: " + this.state.loanAmount);
    // console.log("Kì hạn vay: " + this.state.loanTerm);
    //this.props.navigation.navigate("LoanRegisterConfirm");

    this.props.navigation.navigate("LoanFillInforBeforConf", {
      loanAmount: this.state.loanAmount,
      loanTerm: this.state.loanTerm,
      money: this.returnMoneyPayEachMonth(),
      interestRate: this.state.interestRate,
      loanType: this.state.loanType
    });
  };

  backToPrevious = () => {
    this.props.navigation.pop();
  };

  renderMoneyPayEachMonth = () => {
    if (!this.state.isLoading) {
      return (
        <HDNumberFormat
          value={this.returnMoneyPayEachMonth()}
          style={styles.item_amount_text}
        />
      );
    }
    return <HDText style={styles.item_amount_text}> </HDText>;
  };

  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Header
            title={Context.getString("loan_tab_register_loan_nav")}
            navigation={this.props.navigation}
            leftOnPress={this.backToPrevious}
          />

          <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Header
            title={Context.getString("loan_tab_register_loan_nav")}
            navigation={this.props.navigation}
            leftOnPress={this.backToPrevious}
          />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scroll_container}>

            <HDGroupHeader
              leftTitle={Context.getString("loan_tab_register_loan_loaninfo")}
            />

            <View style={styles.form_loan_container}>
              <View
                style={{ width: "100%", marginTop: 16, paddingHorizontal: 16 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10
                  }}
                >
                  <HDText style={styles.sub_title}>
                    {Context.getString("loan_tab_register_loan_amount")}
                  </HDText>
                  <HDNumberFormat
                    value={this.state.loanAmount}
                    style={styles.loan_amount}
                  />
                </View>

                <HDSlider
                  ref={ref => (this.slider = ref)}
                  onValueChange={this.onChangeAmount}
                />

                <View style={styles.loanTerm}>
                  <HDText style={styles.sub_title}>
                    {Context.getString("loan_tab_register_loan_term")}
                  </HDText>
                  <HDText style={styles.loan_amount}>
                    {this.state.loanTerm +
                      " " +
                      Context.getString("loan_tab_register_loan_month")}
                  </HDText>
                </View>

                <HDLoanTerm
                  ref={ref => (this.loanTerm = ref)}
                  onSelectChange={this.onSelectTerm}
                />
              </View>
            </View>
          </ScrollView>

          <View style={[styles.bottom_container, styles.shadowBox]}>
            <HDText style={{ fontSize: 16, fontWeight: "500", marginTop: 6 }}>
              Số tiền thanh toán hàng tháng
            </HDText>

            {this.renderMoneyPayEachMonth()}

            <HDButton
              title={Context.getString("loan_tab_register_loan")}
              style={styles.confirm_button}
              onPress={this.onPressConfirm}
              isShadow={true}
            />
          </View>
        </View>
      );
    }
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
    marginBottom: Context.getSize(77 + 13),
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
  shadow: {
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 0 },
    elevation: 3
  },
  sub_title: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(17)
    //color: "#1E419B"
  },
  loan_amount: {
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    // lineHeight: Context.getSize(19),
    //color: Context.getColor("textBlue")
    color: "#1E419B"
  },
  bottom_container: {
    //position: "absolute",
    //bottom: 0,
    width: "100%",
    //height: Context.getSize(77),
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  confirm_button: {
    width: Context.getSize(343),
    height: Context.getSize(50),
    marginBottom: 20,
    fontWeight: "bold"
  },
  item_amount_text: {
    paddingHorizontal: 16,
    color: "#1E419B",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4
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

    // shadowOpacity: 0.2,
    // shadowColor: "#000000",
    // shadowOffset: {width: 0, height: 6 }

    // shadowOpacity: 0.2,
    // shadowColor: "#000000",
    // shadowOffset: {width: 0, height: 12 }
  },
  loanTerm: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15
  }
});
