import React, { Component } from "react";
import { HDEsignHeader, HDAnimatedLoading } from "component";
import Context from "context";
import Network from "middleware/helper/Network";

import Overview from "../overview";

export default class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: null,
      navigationTitle: Context.getString("loan_tab_esign_tab_nav_step_01"),
      isLoading: true
    };
    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidMount = async () => {
    //clear esign object
    await this.contractDetailAPI();

    // this.props.updateEsignStep(1);
    this.props.saveContractBase64(null);
    this.props.saveUserAgree(false);

    this.props.updateStatusMonthly(false);
    this.props.updateStatusBankUser(false);
    this.props.updateStatusBankAcc(false);
    this.props.updateStatusBankName(false);
    this.props.updateStatusChassis(false);
    this.props.updateStatusEnginer(false);
  };

  finishLoading = () => {
    this.setState({ isLoading: false })
    this.props.updateEsignStep(1);
  }

  onPressNavBack = () => {
    const { objEsign } = this.props;
    if (objEsign.currentStep > 1) {
      this.props.updateEsignStep(objEsign.currentStep - 1);
    } else {
      this.props.navigation.goBack();
    }
  };

  contractDetailAPI = async () => {
    try {
      var result = await Network.contractDetail(this.navData.contractCode);

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-DETAIL-LOAN-COMPLETE" + JSON.stringify(result.payload.contract)
          );
          await this.props.updateEsignObj(result.payload.contract);
          this.setState({
            detailData: result.payload.contract,
            isLoading: false
          });
        } else {
          console.log("ERROR-API-DETAIL-LOAN " + result.code);
          console.log(
            "ERROR-API-DETAIL-LOAN " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-DETAIL-LOAN " + err.message);
      Context.application.hideLoading();
    }
    this.finishLoading()
  };

  onPressLoanManager = () => {
    this.props.navigation.navigate("MainLoanTab");
  };

  renderOverView = () => {
    if (!this.state.isLoading) {
      return (
        <Overview navigation={this.props.navigation} loanCode={this.navData.loanCode} />
      );
    }
  };

  renderLoading = () => {
    const { isLoading } = this.state
    if (isLoading) {
      return <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
    }
    return null
  }

  renderWithoutLoading = () => {
    const { isLoading } = this.state
    if (!isLoading) {
      return this.renderOverView()
    }
    return null
  }

  render() {
    const { navigation } = this.props;

    return (
      <HDEsignHeader
        navigation={navigation}
        subTitle={0}
        step={1}
        leftOnPress={this.onPressLoanManager}
      >
        {this.renderLoading()}
        {this.renderWithoutLoading()}
      </HDEsignHeader>
    );
  }
}

// const styles = StyleSheet.create({

// });
