import React, { Component } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";

import { HDTextInput, ModalCombobox, HDBankInput } from "component";

import Util from "util";
import Context from "context";
import LocalStorage from "middleware/helper/LocalStorage";

export default class FormBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBanks: [],
      modalBank: false,
      isEditAccountName: true,
      isEditAccountNo: true,
      isEditBankName: true,
      isRunTheFirstTime: true
    };
  }

  componentDidMount = async () => {
    const { objEsign } = this.props;
    console.log("RUN 11111: ", objEsign);
    const arrBanks = await LocalStorage.getBanks();

    const list = arrBanks.map(item => {
      item["name"] = "(" + item.code + ")" + " - " + item.name;
      return item;
    });
    this.setState({
      listBanks: list
    });
    this.mapData(objEsign.data, true);
    this.setState({
      isRunTheFirstTime: false
    });
  };

  componentWillReceiveProps(nextProps) {
    this.mapData(nextProps.objEsign.data, false);

    if(nextProps.objEsign.currentStep > 1){
      this.setState({
        isEditAccountName: false,
        isEditAccountNo: false,
        isEditBankName: false,
      })
    }

  }

  componentDidUpdate = (preProps, preStates) => {
    const currObj = this.props.objEsign;
    const preObj = preProps.objEsign;

    if (currObj.emptyBankUser) {
      this.accountName.setErrorState(true);
    } else {
      this.accountName.setErrorState(false);
    }

    if (currObj.emptyBankAccount) {
      this.accountNo.setErrorState(true);
    } else {
      this.accountNo.setErrorState(false);
    }

    if (currObj.emptyBankName) {
      this.bankName.setErrorState(true);
    } else {
      this.bankName.setErrorState(false);
    }
  };

  mapData = (data, isRunTheFirstTime) => {
    if (data) {
      // console.log("VO LOAD DATA: ",)

      const accountName = data.accountName ? data.accountName : "";
      const accountNo = data.accountNo ? data.accountNo : "";
      const bankName = data.bankName ? data.bankName : "";

      console.log(
        "VO LOAD DATA: ",
        data,
        accountName,
        accountNo,
        bankName,
        isRunTheFirstTime
      );

      //Load bank Info
      this.accountName.setText(accountName);
      this.accountNo.setText(accountNo)
      this.bankName.setText(bankName)

      console.log("CHAY XUOG DOUI KHONG V");

      if (isRunTheFirstTime) {
        if (accountName) {
          this.setState({
            isEditAccountName: false
          });
        }
        if (accountNo) {
          this.setState({
            isEditAccountNo: false
          });
        }
        if (bankName) {
          this.setState({
            isEditBankName: false
          });
        }
      }
    }
  };

  showModalBank = () => {
    this.setState({
      modalBank: true
    });
  };

  hideModalBank = () => {
    this.setState({
      modalBank: false
    });
  };

  onSelectBank = (item, index) => {
    const bankName = item.name;
    this.props.updateEsignObj({
      bankName: bankName
    });
    this.props.updateStatusBankName(false);
    this.bankName.setErrorState(false);
    this.hideModalBank();
  };

  /**
   * Change Input Account Name
   */
  onChangeAccName = text => {
    this.props.updateEsignObj({
      accountName: text
    });
    this.props.updateStatusBankUser(false);
    this.accountName.setErrorState(false);
  };

  /** Change Input Account No*/
  onChangeAccNo = text => {
    this.props.updateEsignObj({
      accountNo: text
    });
    this.props.updateStatusBankAcc(false);
    this.accountNo.setErrorState(false);
  };

  renderFormBank = () => {
    return (
      <View style={{ width: "100%" }}>
        <HDTextInput
          ref={ref => (this.accountName = ref)}
          placeholder={Context.getString(
            "loan_tab_add_confirm_bank_account_user"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_bank_account_user")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          showLabel={true}
          onChangeTextInput={this.onChangeAccName}
          editable={this.state.isEditAccountName}
        />

        <HDBankInput
          ref={ref => (this.accountNo = ref)}
          placeholder={Context.getString(
            "loan_tab_add_confirm_bank_account_no"
          )}
          placeholderTextColor={Context.getColor("placeholderColor1")}
          label={Context.getString("loan_tab_add_confirm_bank_account_no")}
          containerStyle={styles.input}
          inputContainerStyle={styles.input_container}
          labelStyle={styles.input_label}
          inputStyle={styles.input_text}
          showLabel={true}
          onChangeText={this.onChangeAccNo}
          maxLength={Util.Constant.INPUT_BANK_NO_LENGTH}
          editable={this.state.isEditAccountNo}
        />

        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.touch_area}
            onPress={this.state.isEditBankName ? this.showModalBank : null}
          />
          <HDTextInput
            ref={ref => (this.bankName = ref)}
            placeholder={Context.getString("loan_tab_add_confirm_bank_name")}
            placeholderTextColor={Context.getColor("placeholderColor1")}
            label={Context.getString("loan_tab_add_confirm_bank_name")}
            containerStyle={{ ...styles.input, marginBottom: 8 }}
            inputContainerStyle={styles.input_container}
            labelStyle={styles.input_label}
            inputStyle={styles.input_text}
            editable={false}
            showLabel={true}
          />
        </View>
      </View>
    );
  };

  render() {
    const { listBanks } = this.state;
    console.log("GIA TRI CUA INPUT 2 la: ", this.state.isEditAccountNo);
    return (
      <View style={styles.form}>
        {this.renderFormBank()}

        <ModalCombobox
          title={Context.getString("common_bank_select")}
          searchPlaceholder={Context.getString("common_bank_search")}
          items={listBanks}
          isVisible={this.state.modalBank}
          onPressItem={this.onSelectBank}
          pressCancelX={this.hideModalBank}
        />
      </View>
    );
  }
}

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
