import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  BaseScreen,
  Header,
  HDStepBar,
  HDAnimatedLoading
} from "component";
import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";

import Contract from '../contract'
import Overview from '../overview'
import Complete from '../complete'
import Sign from '../sign'

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      detailData: null,
      navigationTitle: Context.getString("loan_tab_esign_sub_tab_nav_step_01"),
      stepItems: [
        {
          name: Context.getString("loan_tab_esign_sub_overview"),
        },
        {
          name: Context.getString("loan_tab_esign_sub_contract")
        },
        {
          name: Context.getString("loan_tab_esign_sub_sign")
        },
        {
          name: Context.getString("loan_tab_esign_sub_complete")
        }
      ],
    }
    this.navData = this.props.navigation.getParam('navData')
  }

  componentDidUpdate() { }
  componentDidMount() {
    //clear esign object
    this.props.updateEsignObj()
    this.props.saveContractBase64(null)
    this.props.saveUserAgree(false)
    this.adjustDetailAPI()
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = this.state
    const { objEsign } = nextProps
    if (!isLoading) {
      switch (objEsign.currentStep) {
        case 1:
          this.stepBar.setStep(1)
          this.setState({
            navigationTitle: Context.getString("loan_tab_esign_sub_tab_nav_step_01")
          })
          return
        case 2:
          this.stepBar.setStep(2)
          this.setState({
            navigationTitle: Context.getString("loan_tab_esign_sub_tab_nav_step_02")
          })
          return
        case 3:
          this.stepBar.setStep(3)
          this.setState({
            navigationTitle: Context.getString("loan_tab_esign_sub_tab_nav_step_03")
          })
          return
        case 4:
          this.stepBar.setStep(4)
          this.setState({
            navigationTitle: Context.getString("loan_tab_esign_sub_tab_nav_step_04")
          })
          return
      }
    }
  }

  /**Adjustment Detail API */
  adjustDetailAPI = async () => {
    try {
      var result = await Network.contractAdjustDetail(this.navData.contractCode)

      if (result != null) {
        if (result.code === 200) {
          console.log("API-ADJUST-DETAIL-COMPLETE" + JSON.stringify(result.payload))
          this.props.updateEsignObj(result.payload)
          this.setState({
            detailData: result.payload
          })
        } else {
          console.log("ERROR-API-ADJUST-DETAIL " + result.code)
          console.log("ERROR-API-ADJUST-DETAIL " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-ADJUST-DETAIL-CATCH " + err.message)
      Context.application.hideLoading();
    }

    this.finishLoading()
  }

  /**Finish Loading */
  finishLoading = () => {
    this.setState({ isLoading: false })
    this.props.updateEsignStep(1)
  }

  onPressNavBack = () => {
    const { objEsign } = this.props
    if (objEsign.currentStep > 1) {
      this.props.updateEsignStep(objEsign.currentStep - 1)
    } else {
      this.props.navigation.goBack()
    }
  }

  renderTabOverview = () => {
    const { objEsign, navigation } = this.props
    if (objEsign.currentStep === 1) {
      return <Overview navigation={navigation} />
    }
    return null
  }

  renderTabContract = () => {
    const { objEsign, navigation } = this.props
    if (objEsign.currentStep === 2) {
      return <Contract navigation={navigation} />
    }
    return null
  }

  renderTabSign = () => {
    const { objEsign } = this.props
    if (objEsign.currentStep === 3) {

      return <Sign navigation={this.props.navigation} />
    }
    return null
    // return <Sign navigation={this.props.navigation} />
  }

  renderTabComplete = () => {
    const { objEsign, navigation } = this.props
    if (objEsign.currentStep === 4) {
      return <Complete navigation={navigation} />
    }
    return null

    // return <Complete navigation={navigation}/>
  }

  renderLoading = () => {
    const { objEsign } = this.props
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_esign_sub_tab_nav")}
          subTitle={this.state.navigationTitle}
          navigation={
            (objEsign.currentStep !== 4) ? this.props.navigation : null
          }
          leftOnPress={this.onPressNavBack}
        />

        <HDStepBar
          ref={ref => this.stepBar = ref}
          items={this.state.stepItems}
        />

        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      </View>
    )
  }

  renderWithoutLoading = () => {
    const { objEsign } = this.props
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_esign_sub_tab_nav")}
          subTitle={this.state.navigationTitle}
          navigation={
            (objEsign.currentStep !== 4) ? this.props.navigation : null
          }
          leftOnPress={this.onPressNavBack}
        />

        <HDStepBar
          ref={ref => this.stepBar = ref}
          items={this.state.stepItems}
        />

        {this.renderTabOverview()}

        {this.renderTabContract()}

        {this.renderTabSign()}

        {this.renderTabComplete()}

      </View>
    )
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
  content_container: {
    flex: 1,
  },
  step_container: {
    width: "100%",
    height: Context.getSize(34),
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  step_text: {
    fontSize: Context.getSize(12),
    fontWeight: '500',
    color: Context.getColor("textBlue1")
  },

});
