import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Context from "context";
import { HDNumberFormat, HDText } from "component";
import Util from 'util'

export default class HistoryItem extends Component {
  reverseString = str => {
    let year = str.slice(0, 4);
    let month = str.slice(5, 7);
    let day = str.slice(8, 10);
    return day + "/" + month + "/" + year;
  };

  renderTypeName = type => {
    switch (type) {
      case Util.Constant.LOAN_TYPE.CL:
        return "Vay tiền mặt";
      case Util.Constant.LOAN_TYPE.CLO:
        return "Vay tiền mặt online";
      case Util.Constant.LOAN_TYPE.ED:
        return "Vay mua điện máy";
      case Util.Constant.LOAN_TYPE.MC:
        return "Vay mua xe máy";
      case Util.Constant.LOAN_TYPE.MB:
        return "Vay mua điện thoại";
      // ED: "ED", //Elictric
      // CL: "CL", //Cash
      // MC: "MC", //Motorbike
      // MB: "MB", // Mobile
      // CLO: "CLO" CASH ONLINE
    }
  };

  render() {
    let { data } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <HDText style={styles.title}>
              {Util.HDDate.formatTo(data.monthlyDueDate)}
              {/* {this.reverseString(data.monthlyDueDate)} */}
            </HDText>
            <HDText style={styles.description}>
              {this.renderTypeName(data.loanType)}
              {" - "}
              {data.contractCode}
            </HDText>
          </View>
          <HDText style={styles.money}>
            <HDNumberFormat value={data.monthlyInstallmentAmount} />
          </HDText>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 6,
    paddingTop: 9,
    backgroundColor: "white",
    overflow: "hidden"
  },
  title: {
    fontSize: Context.getSize(14),
    fontWeight: "500",
    color: Context.getColor("text")
  },
  description: {
    marginTop: 5,
    fontSize: Context.getSize(11),
    fontWeight: "500",
    color: Context.getColor("text")
  },
  money: {
    fontSize: Context.getSize(14),
    fontWeight: "500",
    color: Context.getColor("textBlue1")
  },
  line: {
    width: "100%",
    height: 0.7,
    marginTop: 12,
    backgroundColor: "#E8E9E9"
  }
});
