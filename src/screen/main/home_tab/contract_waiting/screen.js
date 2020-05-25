import React from "react";
import { StyleSheet, View, ScrollView, Animated } from "react-native";
import { BaseScreen, Header, HDContractList } from "component";
import Context from "context";
import Util from 'util'
import LocalStorage from "middleware/helper/LocalStorage";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      refreshing: false,
      contracts: []
    }

    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser()
    this.itemButtonTitle = null
    const { signType } = this.navData
    if (signType == 1) {
      this.getWaitingAPI()
    } else {
      this.itemButtonTitle = Context.getString("common_adjustment_item_button")
      this.getAdjustAPI()
    }
  }

  /**
   * Get Esign
   */
  getWaitingAPI = async () => {
    try {
      const user = await LocalStorage.getUser();
      Context.application.showLoading()
      const result = await Network.contractWaiting(user.customer.uuid);
      Context.application.hideLoading()

      if (result != null) {
        if (result.code === 200) {
          console.log("API-GET-WAITING-COMPLETE: " + JSON.stringify(result.payload))
          this.setState({
            contracts: result.payload
          });
        } else {
          console.log("ERROR-API-GET-WAITING: " + result.code)
          console.log("ERROR-API-GET-WAITING: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-WAITING: " + err.message);
      Context.application.hideLoading()
    }
  }

  /**
   * Get Adjustments
   */
  getAdjustAPI = async () => {
    try {
      const user = await LocalStorage.getUser();
      Context.application.showLoading()
      const result = await Network.contractWaitingAdjust(user.customer.uuid);
      Context.application.hideLoading()

      if (result != null) {
        if (result.code === 200) {
          console.log("API-GET-ADJUST-COMPLETE: " + JSON.stringify(result.payload))
          this.setState({
            contracts: result.payload
          });
        } else {
          console.log("ERROR-API-GET-ADJUST: " + result.code)
          console.log("ERROR-API-GET-ADJUST: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-ADJUST: " + err.message);
      Context.application.hideLoading()
    }
  }

  /**
   * Check time available For Sign
   */
  availableSignAPI = async (errMessage, callback) => {
    try {
      const result = await Network.esignAvailabeSign();
      if (result != null) {
        if (result.code === 200) {
          console.log("API-AVAILABLE-SIGN: " + JSON.stringify(result))
          if (result.payload != null) {
            if (result.payload.result == 0) {
              Context.application.showModalAlert(
                Util.String.format(
                  errMessage,
                  result.payload.esignFrom,
                  result.payload.esignTo
                ),
                false
              )
            } else if (result.payload.result == 1) {
              if (callback) callback()
            }
          } else {
            console.log("ERROR-API-AVAILABLE-SIGN")
          }
        } else {
          console.log("ERROR-API-AVAILABLE-SIGN: " + result.code)
          console.log("ERROR-API-AVAILABLE-SIGN: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-AVAILABLE-SIGN: " + err.message);
    }
  }

  pressSignNow = (item) => {
    const { signType } = this.navData
    let routerNamer = (signType === 1) ? "LoanESign" : "LoanESignSub"
    let errMessage = (signType === 1) ? Context.getString("common_warning_time_up_sign_esign") : Context.getString("common_warning_time_up_sign_adjustment")

    this.availableSignAPI(
      errMessage,
      () => {
        this.props.navigation.navigate(routerNamer, {
          navData: item
        });
      }
    )
  }

  /**
   * Press Delete Contract
   */
  deleteContract = (item, index) => {
    Context.application.showModalAlert(
      Context.getString("common_warning_delete_contract"),
      true,
      () => {
        setTimeout(() => {
          this.removeContractAPI(item.contractUuid, index)
        }, 500);
      }
    )
  }

  /**
   * API REMOVE CONTRACT
   */
  removeContractAPI = async (contractID, itemIndex) => {
    console.log("removeContractAPI: " + contractID + "-" + itemIndex)
    try {
      Context.application.showLoading();
      const result = await Network.loanRemoveContract(
        contractID,
        this.storeUser.customer.uuid
      )
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          console.log("API-LOAN-REMOVE-CONTRACT-COMPLETE: " + JSON.stringify(result))
          let contracts = this.state.contracts
          contracts.splice(itemIndex, 1)
          this.setState({
            ...this.state,
            contracts: contracts
          })
        } else if (result.code === 1437) {
          setTimeout(() => {
            Context.application.showModalAlert(
              Context.getString("loan_aler_contract_cannot_delete"),
              false
            );
          }, 500);
        } else {
          console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + result.code)
          console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      // console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + err.message)
      console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + err.message)
      Context.application.hideLoading();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.navData.navTitle}
          navigation={this.props.navigation}
        />

        <HDContractList
          style={{ marginTop: 0 }}
          itemButtonTitle={this.itemButtonTitle}
          items={this.state.contracts}
          cellType={3}
          isHorizontal={false}
          isSwipeable={true}
          haveRightAction={true}
          onPressRightAction={this.deleteContract}
          onPressSubButton={this.pressSignNow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  // content_container: {
  //   backgroundColor: 'transparent',
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  // scroll_container: {
  //   flex: 1,
  // },
  // header: {
  //   position: 'absolute',
  //   zIndex: 0,
  //   width: '100%',
  //   height: Context.getSize(Util.App.largeHeaderHeight())
  // }
});
