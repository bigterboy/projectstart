import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { BaseScreen, ModalPopupEmail, HDText, HDEsignHeader } from "component";
import Util from "util";
import Context from "context";
import { FormComplete } from "./component";
import BottomButton from "../component/BottomButton";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

const bottomHeight = Context.getSize(77);
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalEmail: true
    };
  }

  // componentDidUpdate() {}
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
  };

  hideModalEmail = () => {
    this.setState({
      modalEmail: false
    });
  };

  onPressLoanManager = async () => {
    await this.props.navigation.navigate("MainLoanTab");
  };

  callSendMailAPI = async email => {
    const { objEsign } = this.props;
    const data = objEsign.data;
    try {
      //Phản hồi lại modal send mail
      this.modalEmail.complete();

      const result = await Network.contractSendFile(
        data.contractUuid,
        this.storeUser.customer.uuid,
        email,
        Util.Constant.SEND_MAIL_TYPE.ESIGN
      );

      if (result != null) {
        if (result.code === 200) {
          console.log("SEND-FILE-COMPLETE");
        } else {
          console.log("ERROR-API-SEND-FILE: " + result.code);
          console.log(
            "ERROR-API-SEND-FILE: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-SEND-FILE: " + err.message);
    }
  };

  renderStatusED = () => {
    const { objEsign } = this.props;
    return (
      <View style={styles.status_container}>
        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_ED_1")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {" "}
            {objEsign.data.contractNumber}{" "}
          </HDText>
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_ED_2")}
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_ED_3")}
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_ED_4")}
        </HDText>
      </View>
    );
  };

  renderStatusCL = () => {
    const { objEsign } = this.props;
    return (
      <View style={styles.status_container}>
        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_1")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {" "}
            {objEsign.data.contractNumber}{" "}
          </HDText>
        </HDText>

        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_CL_2")}
        </HDText>
        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_3")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {Util.String.formatMoney(objEsign.data.loanAmount)}
          </HDText>
        </HDText>

        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_4")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {Util.String.securityBank(objEsign.data.accountNo)}
          </HDText>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_5")}
          </HDText>
        </HDText>

        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_6")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {objEsign.data.bankName}
          </HDText>
        </HDText>

        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_7")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_8")}
          </HDText>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_CL_9")}
          </HDText>
        </HDText>
      </View>
    );
  };

  renderStatusMC = () => {
    const { objEsign } = this.props;
    return (
      <View style={styles.status_container}>
        <HDText style={styles.status_align}>
          <HDText style={styles.status_text}>
            {Context.getString("loan_tab_esign_complete_status_part_MC_1")}
          </HDText>
          <HDText style={styles.status_text_bold}>
            {" "}
            {objEsign.data.contractNumber}{" "}
          </HDText>
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_MC_2")}
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_MC_3")}
        </HDText>
        <HDText style={styles.status_text}>
          {Context.getString("loan_tab_esign_complete_status_part_MC_4")}
        </HDText>
      </View>
    );
  };

  renderCompleteStatus = () => {
    const { objEsign } = this.props;
    if (objEsign.data) {
      switch (objEsign.data.loanType) {
        case Util.Constant.LOAN_TYPE.ED:
          return this.renderStatusED();
        case Util.Constant.LOAN_TYPE.CL:
          return this.renderStatusCL();
        case Util.Constant.LOAN_TYPE.MC:
          return this.renderStatusMC();
      }
    }
  };

  render() {
    return (
      <HDEsignHeader subTitle={3} step={4}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scroll_container}
          >
            <View style={styles.complete_container}>
              <Image
                style={styles.complete_image}
                source={Context.getImage("complete")}
                resizeMode="contain"
              />
              {this.renderCompleteStatus()}
            </View>

            <View style={styles.info}>
              <FormComplete />
            </View>
          </ScrollView>

          <BottomButton
            title={Context.getString("loan_tab_esign_button_loan_manager")}
            onPress={this.onPressLoanManager}
          />

          <ModalPopupEmail
            ref={ref => (this.modalEmail = ref)}
            isVisible={this.state.modalEmail}
            onSendEmail={this.callSendMailAPI}
            pressCancelX={this.hideModalEmail}
          />
        </View>
      </HDEsignHeader>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: bottomHeight + 16
  },
  complete_container: {
    width: "100%",
    marginBottom: 24
  },
  complete_image: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: Context.getSize(310)
  },
  status_container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 89 + 24
  },
  status_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    color: Context.getColor("textBlue1"),
    textAlign: "center",
    lineHeight: Context.getSize(20)
  },
  status_align: {
    textAlign: "center"
  },
  status_text_bold: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    color: Context.getColor("textBlue1")
  },
  info: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
