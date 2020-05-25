import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform
} from "react-native";
import {
  BaseScreen,
  Header,
  HDGroupHeader,
  HDLoanToggleSelections,
  HDSelectionInput,
  HDSlider,
  HDNumberFormat,
  HDLoanTerm,
  HDButton,
  ModalComboboxGetAPI,
  HDText,
  HDAnimatedLoading
} from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: 1000000,
      loanTerm: 6,
      money: 0,
      percentPrepaidFirst: [
        { id: 1, percent: 10 },
        { id: 2, percent: 20 },
        { id: 3, percent: 30 },
        { id: 4, percent: 40 },
        { id: 5, percent: 50 },
        { id: 6, percent: 60 },
        { id: 7, percent: 70 }
      ],
      productionTypeMC: [],
      productionTypeED: [],
      productionTypeMB: [],
      isShowPercentPaidFirst: false,
      isShowSelectProduction: false,
      loanProduct: "",
      itemLoanProductSeleted: null,
      percentPaidFirst: 10,
      itemPercentPaidFirst: { id: 1, percent: 10, isSelected: false }, // dùng cho giá trị mặc định
      interestRate: 0,
      allInterestRate: null,
      loanType: null,
      isLoading: true
    };
  }

  componentDidMount = async () => {
    const loanType = this.props.navigation.getParam("loanType");
    if (loanType) {
      this.setState({
        loanType: loanType
      });
    } else {
      this.setState({
        loanType: Util.Constant.LOAN_TYPE.MC
      });
    }

    setTimeout(() => {
      this.requestAPI();
    }, 1000);
  };

  componentWillUnmount = () => {
    //Clean data screen redux
    this.props.cleanData();
  }

  /**Set Selected Term */
  setSelectedTerm = () => {
    if (this.loanTerm) this.loanTerm.selectedIndex(0);
  }

  //Request All API
  requestAPI = async () => {
    //Get interestRate from API or from Navgiation
    await this.startRequest();
    this.setSelectedTerm()
  };

  startRequest = async () => {
    await this.getInterestRate();
    //Request product depent on type of product
    await this.getAllProductionListDepentOnType();
  };

  getAllProductionListDepentOnType = () => {
    this.getAPIListProduction("MC");
    this.getAPIListProduction("ED");
    this.getAPIListProduction("MB");
  };

  getInterestRate = async () => {
    const temp = this.props.navigation.getParam("interestRate");
    if (temp) {
      console.log("Chay get data from nav");
      await this.setState({
        interestRate: this.props.navigation.getParam("interestRate")
      });
    } else {
      console.log("Chay get data from api");
      await this.getAPIInterestRate();
    }
  };

  getAPIInterestRate = async () => {
    try {
      const result = await Network.interestRate();
      if (result != null) {
        if (result.code === 200) {
          //console.log("API-PRODUCTION-LIST: " + JSON.stringify(result.payload));
          this.setState({
            allInterestRate: result.payload,
            interestRate: result.payload[1].interestRate
          });
          this.finishLoading();
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
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.pop()
      );
    }
  };

  getAPIListProduction = async type => {
    try {
      const result = await Network.productionList(type);
      if (result != null) {
        if (result.code === 200) {
          console.log("API-PRODUCTION-LIST: " + JSON.stringify(result.payload));
          if (type === "MC") {
            await this.setState({
              productionTypeMC: result.payload
            });
          } else if (type === "ED") {
            await this.setState({
              productionTypeED: result.payload
            });
          } else if (type === "MB") {
            await this.setState({
              productionTypeMB: result.payload
            });
          }
        } else {
          console.log("ERROR-API-PRODUCTION-LIST: " + result.code);
          console.log(
            "ERROR-API-PRODUCTION-LIST: " +
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
      console.log("ERROR-API-PRODUCTION-LIST: " + err.message);
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.pop()
      );
    }
  };

  //Select type product loan: MC, ED, MB
  onSelectLoanType = async item => {
    //If click again
    if (item.type === this.state.loanType) {
      return;
    }
    this.setState({
      ...this.state,
      loanProduct: "",
      itemLoanProductSeleted: null
    });

    //Update interestRate when click type product loan
    if (item.type === Util.Constant.LOAN_TYPE.MC) {
      this.setState({
        //interestRate: Util.Constant.INTEREST_RATE.MC
        loanType: Util.Constant.LOAN_TYPE.MC,
        interestRate: this.state.allInterestRate[1].interestRate // type MC
      });
    } else if (item.type === Util.Constant.LOAN_TYPE.ED) {
      this.setState({
        //interestRate: Util.Constant.INTEREST_RATE.ED
        loanType: Util.Constant.LOAN_TYPE.ED,
        interestRate: this.state.allInterestRate[2].interestRate // type ED
      });
    } else if (item.type === Util.Constant.LOAN_TYPE.MB) {
      this.setState({
        //interestRate: Util.Constant.INTEREST_RATE.MB
        loanType: Util.Constant.LOAN_TYPE.MB,
        interestRate: this.state.allInterestRate[3].interestRate // type MB
      });
    }
  };

  onSelectLoanProduct = () => {
    this.setState({
      ...this.state,
      isShowSelectProduction: true
    });
  };

  onSelectPercentPaidFirst = () => {
    this.setState({
      ...this.state,
      isShowPercentPaidFirst: true
    });
  };

  onChangeAmount = value => {
    this.setState({
      ...this.state,
      loanAmount: value
    });
  };

  onSelectTerm = item => {
    this.setState({
      ...this.state,
      loanTerm: item.value
    });
  };

  onPressConfirm = () => {
    this.props.navigation.navigate("LoanFillInforBeforConf", {
      loanAmount: this.state.loanAmount,
      loanTerm: this.state.loanTerm,
      money: this.returnMoneyPayEachMonth(),
      loanProduct: this.state.loanProduct, // name product => nokia, samsung, iphone, Honda
      percentPaidFirst: this.state.percentPaidFirst,
      interestRate: this.state.interestRate,
      loanType: this.state.loanType
    });
  };

  renderLoanPurpose = () => {
    return (
      <View>
        <HDText style={[styles.sub_title, { marginBottom: 10 }]}>
          {Context.getString("loan_tab_register_loan_purpose")}
        </HDText>
        <HDLoanToggleSelections
          ref={ref => (this.loanSelections = ref)}
          onSelectChange={this.onSelectLoanType}
        />
      </View>
    );
  };

  renderLoanProduct = () => {
    return (
      <View>
        <HDText
          style={[styles.sub_title, { marginBottom: Context.getSize(10) }]}
        >
          {Context.getString("loan_tab_register_loan_product")}
        </HDText>
        <HDSelectionInput
          style={{
            ...styles.styleHDInputSelected,
            ...(Platform.OS === "ios"
              ? null
              : styles.heightInputSelectedForAndroid)
          }}
          placeholder={Context.getString(
            "loan_tab_register_loan_please_select_product"
          )}
          value={this.state.loanProduct}
          onPress={() => this.onSelectLoanProduct()}
        />
      </View>
    );
  };

  renderLoanPercent = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <HDText style={[styles.sub_title, { marginBottom: 10 }]}>
          {Context.getString("loan_tab_register_loan_percent_pay_first")}
        </HDText>
        <HDSelectionInput
          style={{
            ...styles.styleHDInputSelected,
            ...(Platform.OS === "ios"
              ? null
              : styles.heightInputSelectedForAndroid)
          }}
          placeholder={Context.getString(
            "loan_tab_register_loan_please_select_product"
          )}
          value={
            this.state.percentPaidFirst === 0
              ? ""
              : this.state.percentPaidFirst + " %"
          }
          onPress={() => this.onSelectPercentPaidFirst()}
        />
      </View>
    );
  };

  selectLoanProduct = async (item, index) => {
    await this.setState({
      loanProduct: item.productionName,
      itemLoanProductSeleted: item,
      isShowSelectProduction: false
    });
  };

  selectPercentPaidFirst = async (item, index) => {
    this.setState({
      percentPaidFirst: item.percent,
      isShowPercentPaidFirst: false,
      itemPercentPaidFirst: item
    });
  };

  backToPrevious = () => {
    this.props.navigation.pop();
  };

  returnProductionListToShow() {
    if (this.state.loanType === "MC") {
      return this.state.productionTypeMC;
    } else if (this.state.loanType === "ED") {
      return this.state.productionTypeED;
    } else if (this.state.loanType === "MB") {
      return this.state.productionTypeMB;
    }
    return this.state.productionTypeMC;
  }

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

  returnMoneyPayEachMonth = () => {
    return Util.String.returnReckonMoneyLoan(
      this.state.loanAmount,
      this.state.interestRate,
      this.state.loanTerm,
      this.state.percentPaidFirst * 0.01 * this.state.loanAmount
    );
  };

  finishLoading = async () => {
    this.setState({
      isLoading: false
    });
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_register_loan_nav")}
          navigation={this.props.navigation}
          leftOnPress={this.backToPrevious}
        />
        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      </View>
    );
  }

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_register_loan_nav")}
          navigation={this.props.navigation}
          leftOnPress={this.backToPrevious}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_register_loan_loaninfo")}
            style={{ marginTop: Context.getSize(5) }}
          />

          <View style={styles.form_loan_container}>
            <View
              style={{ width: "100%", marginTop: 16, paddingHorizontal: 16 }}
            >
              {this.renderLoanPurpose()}

              {this.renderLoanProduct()}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <HDText style={styles.sub_title}>
                  {Context.getString("loan_tab_register_price_product_amount")}
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

              {this.renderLoanPercent()}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10
                }}
              >
                <HDText style={styles.sub_title}>
                  {Context.getString("loan_tab_register_loan_term")}
                </HDText>
                <HDText style={styles.loan_amount}>
                  {this.state.loanTerm +
                    " " +
                    Context.getString("loan_tab_register_loan_month")}
                </HDText>
              </View>

              {/* Product type loan */}
              <ModalComboboxGetAPI
                title={Context.getString(
                  "loan_tab_register_loan_select_production"
                )}
                searchPlaceholder={Context.getString(
                  "home_tab_guild_store_province_search"
                )}
                items={this.returnProductionListToShow()}
                selectedValue={this.state.itemLoanProductSeleted}
                isVisible={this.state.isShowSelectProduction}
                onPressItem={this.selectLoanProduct}
                pressCancelX={() =>
                  this.setState({ isShowSelectProduction: false })
                }
                type={Util.Constant.POPUP_TYPE.PRODUCTION_LOAN}
                isShowSearchBar={false}
              />

              {/* Percent pay first */}
              <ModalComboboxGetAPI
                title={Context.getString(
                  "loan_tab_register_loan_percent_pay_first"
                )}
                searchPlaceholder={Context.getString(
                  "home_tab_guild_store_province_search"
                )}
                items={this.state.percentPrepaidFirst}
                selectedValue={this.state.itemPercentPaidFirst}
                isVisible={this.state.isShowPercentPaidFirst}
                onPressItem={this.selectPercentPaidFirst}
                pressCancelX={() =>
                  this.setState({ isShowPercentPaidFirst: false })
                }
                type={Util.Constant.POPUP_TYPE.PERCENT_PAY_FIRST}
                isShowSearchBar={false}
              />
              <HDLoanTerm
                ref={ref => (this.loanTerm = ref)}
                onSelectChange={this.onSelectTerm}
              />
            </View>
          </View>
        </ScrollView>

        <View style={[styles.bottom_container, styles.shadowBox]}>
          <HDText style={styles.titlePaidEveryMonth}>
            {Context.getString("loan_tab_add_confirm_pay_month_amount")}
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

  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return this.renderLoading()
    } else {
      return this.renderWithoutLoading()
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
    alignItems: "center",
    paddingBottom: 10
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
  shadow: {
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 0 }
  },
  sub_title: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(17)
  },
  loan_amount: {
    fontSize: Context.getSize(16),
    fontWeight: "700",
    color: "#1E419B"
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
  },
  titlePaidEveryMonth: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 6
  },
  styleHDInputSelected: {
    marginBottom: Context.getSize(20)
  },
  heightInputSelectedForAndroid: {
    height: Context.getSize(40)
  }
});
