import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { BaseScreen, Header, HDButton, HDStepBar } from "component";
import Context from "context";
import Network from "middleware/helper/Network";

// import Contract from '../contract'
// import Overview from '../overview'
// import Complete from '../complete'
// import Sign from '../sign'

//import resource from 'resource'

export default class HDEsignHeader extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      detailData: null,
      navigationTitle: "",
      stepItems: [
        {
          name: Context.getString("loan_tab_esign_overview")
        },
        {
          name: Context.getString("loan_tab_esign_contract")
        },
        {
          name: Context.getString("loan_tab_esign_sign")
        },
        {
          name: Context.getString("loan_tab_esign_complete")
        }
      ],
      subTitle: [
        Context.getString("loan_tab_esign_tab_nav_step_01"),
        Context.getString("loan_tab_esign_tab_nav_step_02"),
        Context.getString("loan_tab_esign_tab_nav_step_03"),
        Context.getString("loan_tab_esign_tab_nav_step_04")
      ]
    };
    //this.navData = this.props.navigation.getParam("navData");
  }

  //componentDidUpdate() {}
  componentDidMount() {
    //clear esign object
    // this.props.updateEsignObj();
    // this.props.updateEsignStep(1);
    // this.props.saveContractBase64(null);
    // this.props.saveUserAgree(false);
    // this.props.updateStatusMonthly(false);
    // this.props.updateStatusBankUser(false);
    // this.props.updateStatusBankAcc(false);
    // this.props.updateStatusBankName(false);
    // this.props.updateStatusChassis(false);
    // this.props.updateStatusEnginer(false);
    // this.contractDetailAPI();
    this.stepBar.setStep(this.props.step);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { objEsign } = nextProps;
  //   switch (objEsign.currentStep) {
  //     case 1:
  //       this.stepBar.setStep(1);
  //       this.setState({
  //         navigationTitle: Context.getString("loan_tab_esign_tab_nav_step_01")
  //       });
  //       return;
  //     case 2:
  //       this.stepBar.setStep(2);
  //       this.setState({
  //         navigationTitle: Context.getString("loan_tab_esign_tab_nav_step_02")
  //       });
  //       return;
  //     case 3:
  //       this.stepBar.setStep(3);
  //       this.setState({
  //         navigationTitle: Context.getString("loan_tab_esign_tab_nav_step_03")
  //       });
  //       return;
  //     case 4:
  //       this.stepBar.setStep(4);
  //       this.setState({
  //         navigationTitle: Context.getString("loan_tab_esign_tab_nav_step_04")
  //       });
  //       return;
  //   }
  // }

  // onPressNavBack = () => {
  //   const { objEsign } = this.props;
  //   if (objEsign.currentStep > 1) {
  //     this.props.updateEsignStep(objEsign.currentStep - 1);
  //   } else {
  //     this.props.navigation.goBack();
  //   }
  // };

  // contractDetailAPI = async () => {
  //   try {
  //     Context.application.showLoading();
  //     var result = await Network.contractDetail(this.navData.contractCode);
  //     Context.application.hideLoading();

  //     if (result != null) {
  //       if (result.code === 200) {
  //         console.log(
  //           "API-DETAIL-LOAN-COMPLETE" + JSON.stringify(result.payload.contract)
  //         );
  //         this.props.updateEsignObj(result.payload.contract);
  //         this.setState({
  //           detailData: result.payload.contract
  //         });
  //       } else {
  //         console.log("ERROR-API-DETAIL-LOAN " + result.code);
  //         console.log(
  //           "ERROR-API-DETAIL-LOAN " + Network.getMessageFromCode(result.code)
  //         );
  //         // Context.application.showModalError(
  //         //   Network.getMessageFromCode(result.code)
  //         // )
  //       }
  //     }
  //   } catch (err) {
  //     console.log("ERROR-API-DETAIL-LOAN " + err.message);
  //     Context.application.hideLoading();
  //   }
  // };

  //   renderTabOverview = () => {
  //     const { objEsign, navigation } = this.props
  //     // if (objEsign.currentStep === 1) {
  //     //   return <Overview navigation={navigation} />
  //     // }

  //     return <Overview navigation={navigation} />

  //     //return null
  //   }

  //   renderTabContract = () => {
  //     const { objEsign, navigation } = this.props
  //     if (objEsign.currentStep === 2) {
  //       return <Contract navigation={navigation} />
  //     }
  //     return null
  //   }

  //   renderTabSign = () => {
  //     const { objEsign } = this.props
  //     if (objEsign.currentStep === 3) {

  //       return <Sign navigation={this.props.navigation} />
  //     }
  //     return null
  //     // return <Sign navigation={this.props.navigation} />
  //   }

  //   renderTabComplete = () => {
  //     const { objEsign, navigation } = this.props
  //     if (objEsign.currentStep === 4) {
  //       return <Complete navigation={navigation} />
  //     }
  //     return null
  //     // return <Complete />
  //   }

  render() {
    const { objEsign } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_esign_tab_nav")}
          subTitle={this.state.subTitle[this.props.subTitle]}
          navigation={this.props.navigation ? this.props.navigation : null}
          leftOnPress={this.props.leftOnPress ? this.props.leftOnPress : null}
        />

        <View style={styles.content_container}>
          <HDStepBar
            ref={ref => (this.stepBar = ref)}
            items={this.state.stepItems}
          />
          {this.props.children}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  content_container: {
    flex: 1
  },
  step_container: {
    width: "100%",
    height: Context.getSize(34),
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  step_text: {
    fontSize: Context.getSize(12),
    fontWeight: "500",
    color: Context.getColor("textBlue1")
  }
});
