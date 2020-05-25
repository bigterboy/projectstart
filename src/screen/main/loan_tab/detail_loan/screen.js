import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  BaseScreen,
  Header,
  HDButton,
  HDNumberFormat,
  HDSwitch,
  HDPieChart,
  HDGroupHeader,
  HDHistoryList,
  HDText,
  HDFastImage, HDAnimatedLoading
} from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      navTitle: "",
      chartData: [],
      histories: [],
      data: null,
      isLoading: true
    };
    this.isRepaymentNotification = null
    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.apiDetail();
  };

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.state
    if ((!isLoading) && (isLoading !== prevState.isLoading)) {
      if (this.switchRemind) this.switchRemind.set(this.isRepaymentNotification);
    }
  }

  /**Finish Loading */
  finishLoading = () => {
    this.setState({
      isLoading: false
    })
  }

  apiDetail = async () => {
    try {
      var result = await Network.contractDetail(this.navData.contractCode);
      if (result != null) {
        if (result.code === 200) {
          console.log("Contract-Detail: " + JSON.stringify(result));
          await this.checkRemindAPI();

          let chartItems = [];
          chartItems.push({
            number: result.payload.contract.totalPaid,
            color: "#F7A600",
            name: "Số kỳ đã thanh toán",
            labelColor: "black"
          });
          chartItems.push({
            number: result.payload.contract.tenorRemaind,
            color: "#1E419B",
            name: "Số kỳ còn lại",
            labelColor: "black"
          });

          this.setState({
            data: result.payload.contract,
            chartData: chartItems,
            histories: result.payload.historyPayments,
            navTitle: result.payload.contract.loanName
          });
        } else if(result.code === 1406){
          Context.application.showModalAlert(
            Context.getString("common_error_contract_file_not_found"),
            false,
            () => this.props.navigation.pop()
          );
        }
        else {
          console.log("ERROR-API-DETAIL-LOAN " + result.code);
          console.log(
            "ERROR-API-DETAIL-LOAN " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-DETAIL-LOAN " + err.message);

      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => this.props.navigation.pop()
      );
    }
    this.finishLoading()
  };

  /**API get state of follow notification this contract */
  checkRemindAPI = async () => {
    try {
      var result = await Network.contractCheckPayNotify(
        this.storeUser.customer.uuid,
        this.navData.contractCode
      );

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-CONTRACT-CHECK-PAYMENT-NOTIFICATION: " + JSON.stringify(result)
          );

          this.isRepaymentNotification = result.payload.isRepaymentNotification
        } else {
          console.log(
            "ERROR-API-CONTRACT-CHECK-PAYMENT-NOTIFICATION: " + result.code
          );
          console.log(
            "ERROR-API-CONTRACT-CHECK-PAYMENT-NOTIFICATION: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log(
        "ERROR-API-CONTRACT-CHECK-PAYMENT-NOTIFICATION " + err.message
      );
    }
  };

  /**API update state of follow notification this contract */
  updateRemindAPI = async isNotification => {
    try {
      var result = await Network.contractUpdatePayNotify(
        this.storeUser.customer.uuid,
        this.navData.contractCode,
        isNotification
      );

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-CONTRACT-UPDATE-PAYMENT-NOTIFICATION: " +
            JSON.stringify(result)
          );
          this.switchRemind.toggle();
          //DO AFTER
        } else {
          console.log(
            "ERROR-API-CONTRACT-UPDATE-PAYMENT-NOTIFICATION: " + result.code
          );
          console.log(
            "ERROR-API-CONTRACT-UPDATE-PAYMENT-NOTIFICATION: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log(
        "ERROR-API-CONTRACT-CHECK-PAYMENT-NOTIFICATION " + err.message
      );
    }
  };

  viewDetailContract = () => {
    const { data } = this.state;
    if (data.attachments) {
      if (data.attachments.length > 0) {
        this.props.navigation.navigate("LoanDetailContract", {
          navData: {
            contractID: this.navData.contractUuid,
            attachments: data.attachments,
            lstAdj: data.lstAdj
          }
        });
      } else {
        Context.application.showModalAlert(
          Context.getString("common_error_contract_file_not_found"),
          false
        );
      }
    } else {
      Context.application.showModalAlert(
        Context.getString("common_error_contract_file_not_found"),
        false
      );
    }
  };

  pressPaymentGuild = () => {
    //this.props.navigation.navigate("GuildPayment");
    this.props.navigation.navigate("GuildPayment");

    // this.props.navigation.navigate("PromotionDetail", {
    //   type: Util.Constant.WEB_STATIC.STATIC
    // });
  };

  viewAllHistory = () => {
    console.log("viewAllHistory");
    this.props.navigation.navigate("LoanPayHistory", {
      navData: {
        histories: this.state.histories.reverse()
      }
    });
  };

  onPressRemindPay = async () => {
    const isRemindPay = this.switchRemind.get();
    const message =
      isRemindPay !== 1
        ? Context.getString("loan_tab_detail_loan_remind_pay_on_message")
        : Context.getString("loan_tab_detail_loan_remind_pay_off_message");
    const updateValue = isRemindPay !== 1 ? 1 : 0;

    Context.application.showModalAlert(message, true, async () => {
      await this.updateRemindAPI(updateValue);
    });
    //
  };

  renderDetailCard() {
    const { data } = this.state;
    let contractNo;
    let productName;
    let loanAmount;
    let monthlyPayment;
    let monthlyDueDate;
    let haveInsurance;
    let urlImage;

    let productPrice;
    let endDueDate;
    let productPriceBHVC;

    if (data !== null) {
      console.log("data khác null");
      contractNo = data.contractNumber;
      productName = data.productName;
      loanAmount = data.loanAmount;
      monthlyPayment = data.monthlyInstallmentAmount;
      monthlyDueDate = data.monthlyDueDate;
      haveInsurance = data.isInsurance === "Y" ? true : false;
      endDueDate = data.endDue ? Util.HDDate.formatTo(data.endDue) : "";
      urlImage = data.urlImage ? data.urlImage : "";
    } else {
      console.log("data null");
      contractNo = "";
      productName = "";
      loanAmount = null;
      monthlyPayment = null;
      monthlyDueDate = null;
      haveInsurance = false;
      endDueDate = "";
      urlImage = "";
    }
    console.log("data khác null: " + haveInsurance);
    const textInsurance = haveInsurance
      ? Context.getString("common_yes")
      : Context.getString("common_no");
    return (
      <View style={styles.detail_card}>
        <View
          style={{
            position: "absolute",
            zIndex: 0,
            flex: 1,
            width: "50%",
            height: "70%",
            bottom: 0,
            right: 0,
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <HDFastImage
            source={{ uri: urlImage }}
            style={{
              flex: 1,
              width: '100%',
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: Context.getColor("blurColor"),
            justifyContent: "space-evenly",
            paddingHorizontal: 16,
            paddingVertical: 16
          }}
        >
          <HDText style={[styles.card_text, styles.bold, styles.row_margin_bottom]}>
            {Context.getString("loan_tab_detail_loan_contract_id") + contractNo}
          </HDText>

          <HDText style={[styles.card_text, styles.bold, styles.row_margin_bottom]}>
            {productName}
          </HDText>

          <HDNumberFormat
            value={loanAmount}
            style={[styles.card_amount, styles.bold, styles.row_margin_bottom]}
          />

          <View
            style={[{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            },
            styles.row_margin_bottom
            ]}
          >
            <HDText style={styles.card_text}>
              {Context.getString("loan_tab_detail_loan_pay_amount_month")}
            </HDText>
            <HDNumberFormat
              value={monthlyPayment}
              style={[styles.card_text, styles.bold]}
            />
          </View>

          <View
            style={[{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            },
            styles.row_margin_bottom
            ]}
          >
            <HDText style={styles.card_text}>
              {Context.getString("loan_tab_detail_loan_pay_date")}
            </HDText>
            {monthlyDueDate ? (
              <HDText style={[styles.card_text, styles.bold]}>
                {Context.getString("common_date") + " " + monthlyDueDate}
              </HDText>
            ) : null}
          </View>

          <View
            style={[{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            },
            styles.row_margin_bottom
            ]}
          >
            <HDText style={styles.card_text}>
              {Context.getString("loan_tab_detail_loan_insurance")}
            </HDText>
            <HDText style={[styles.card_text, styles.bold]}>
              {textInsurance}
            </HDText>
          </View>

          {/* View Contract Detail */}
          <View
            style={[{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }]}>
            <HDText style={styles.card_text}>
              {Context.getString("loan_tab_detail_loan_contract")}
            </HDText>
            <TouchableOpacity onPress={this.viewDetailContract}>
              <HDText style={[styles.card_text, styles.underline, styles.bold]}>
                {Context.getString("common_view_detail")}
              </HDText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderRemind() {
    return (
      <View style={[styles.remind_container, styles.shadow]}>
        <HDText>{Context.getString("loan_tab_detail_loan_remind")}</HDText>
        <HDSwitch
          ref={ref => (this.switchRemind = ref)}
          onPressSwitch={this.onPressRemindPay}
        />
      </View>
    );
  }

  renderChart = () => {
    const { data, histories } = this.state;
    let endDueDate;

    if (data !== null) {
      endDueDate = data.endDue ? Util.HDDate.formatTo(data.endDue) : "";
    } else {
      endDueDate = "";
    }

    return (
      <HDPieChart
        chartData={this.state.chartData}
        chartSize={193}
        innerRadius={49}
        style={{
          marginBottom: histories ? 24 : 0
        }}
        centerText={Context.getString("loan_tab_detail_loan_finish")}
        centerSubText={endDueDate}
      />
    );
  };

  renderHistory() {
    const { histories } = this.state;
    if (histories && histories.length > 0) {
      let items = histories.reverse();
      items = items.slice(0, 4);

      return (
        <View style={{ width: "100%" }}>
          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_detail_loan_history")}
            rightTitle={Context.getString("common_view_all")}
            onPressRight={this.viewAllHistory}
          />

          <View
            style={{ width: "100%", paddingHorizontal: Context.getSize(16) }}
          >
            <HDHistoryList
              items={items}
            // style={{ marginBottom: Context.getSize(77 + 32) }}
            //  isShowHeader
            />
          </View>
        </View>
      );
    }
    return null;
  }

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          // title={this.navData.loanType}
          title={this.state.navTitle}
          navigation={this.props.navigation}
        />
        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      </View>
    )
  }

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          // title={this.navData.loanType}
          title={this.state.navTitle}
          navigation={this.props.navigation}
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          {this.renderDetailCard()}

          {this.renderRemind()}

          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_detail_loan_term")}
          />
          {this.renderChart()}

          {this.renderHistory()}
        </ScrollView>

        <View style={styles.bottom_container}>
          <HDButton
            title={Context.getString("loan_tab_detail_loan_guild")}
            isShadow
            onPress={this.pressPaymentGuild}
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
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: Context.getSize(77 + 32)
  },
  detail_card: {
    width: Context.getSize(343),
    borderRadius: Context.getSize(6),
    marginTop: Context.getSize(16),
    marginBottom: Context.getSize(16),
    overflow: "hidden",
  },
  card_text: {
    color: Context.getColor("textWhite"),
    fontSize: Context.getSize(12)
  },
  row_margin_bottom: {
    marginBottom: 12
  },
  card_amount: {
    color: Context.getColor("textWhite"),
    fontSize: Context.getSize(16)
  },
  bold: {
    fontWeight: "bold"
  },
  underline: {
    textDecorationLine: "underline"
  },
  remind_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Context.getSize(343),
    height: Context.getSize(44),
    borderRadius: Context.getSize(6),
    paddingHorizontal: Context.getSize(16),
    marginBottom: Context.getSize(24),
    backgroundColor: Context.getColor("background")
  },
  switch: {
    width: Context.getSize(31),
    height: Context.getSize(17)
  },
  shadow: {
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  chart: {
    marginBottom: Context.getSize(24)
  },
  bottom_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Context.getSize(16),
    paddingTop: Context.getSize(8),
    paddingBottom: Context.getSize(24)
  },
  button_guild: {
    marginTop: Context.getSize(8)
  }
});
