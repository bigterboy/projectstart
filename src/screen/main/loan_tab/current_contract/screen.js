import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BaseScreen,
  Header,
  HDContractList,
  HDAnimatedLoading
} from "component";
import Context from "context";
import Util from 'util'
import LocalStorage from "middleware/helper/LocalStorage";
import Network from "middleware/helper/Network";

import ModalGuildDelete from './component/ModalGuildDelete'

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.navData = this.props.navigation.getParam('navData')

    this.state = {
      contracts: [],
      tooltipItem: null,
      isShowTooltip: false,
      isLoading: true
    }
  }

  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser()
    this.listContractAPI()
  }

  /**Finish Loading */
  finishLoading = () => {
    this.setState({ isLoading: false })
  }

  //Load List Contract
  listContractAPI = async () => {
    try {
      const result = await Network.contractList(this.storeUser.customer.uuid)
      if (result != null) {
        if (result.code === 200) {
          if (result.payload != null) {
            this.getCurrent(result.payload)
          } else {
            this.setState({
              contracts: []
            })
          }
        } else {
          console.log("ERROR-API-CONTRACT-LIST: " + result.code)
          console.log("ERROR-API-CONTRACT-LIST: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-CONTRACT-LIST: " + err.message)
    }
    this.finishLoading()
  }

  removeContractAPI = async (contractID, itemIndex) => {
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
        } else if (result.code === 1444) {
          setTimeout(() => {
            Context.application.showModalAlert(
              Context.getString("loan_aler_contract_customer_cannot_delete"),
              false
            );
          }, 500);
        } else {
          console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + result.code)
          console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-LOAN-REMOVE-CONTRACT: " + err.message)
      Context.application.hideLoading();
    }
  }

  //Get Current Contract
  getCurrent = (data) => {
    const filterCurrent = data.filter((item) => {
      return item.code == Util.Constant.contractType.LIVE
    })

    if (filterCurrent) {
      if (filterCurrent.length > 0) {
        const data = filterCurrent[0].data
        console.log("contract: " + JSON.stringify(data))
        this.setState({
          contracts: data
        }, () => {
          this.createTooltipItem()
        })
      } else {
        this.setState({
          ...this.state,
          contracts: []
        })
      }
    }
  }

  //Create Tooltip Item
  createTooltipItem = () => {
    const { firstTimeUseContract } = this.props

    if (firstTimeUseContract) {
      const { contracts } = this.state
      if (this.props.navigation.getParam("showGuildDelete")) {
        this.setState({
          tooltipItem: contracts[0],
          isShowTooltip: true
        })
      }
    }

  }

  hideModalTooltip = () => {
    this.setState({
      isShowTooltip: false
    }, () => {
      if (this.props.firstTimeUseContract) {
        this.props.updateFirsTimeUsing()
      }
    })
  }

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

  onNavBackToLoan = () => {
    this.props.navigation.navigate("MainLoanTab");
  }

  onShowDetail = (item) => {
    this.props.navigation.navigate("LoanDetailLoan", {
      navData: item
    });
  }

  //Show Guild Payment
  onShowGuild = () => {
    //this.props.navigation.navigate("GuildPayment")

    this.props.navigation.navigate("GuildPayment");
    // this.props.navigation.navigate("PromotionDetail", {
    //   type: Util.Constant.WEB_STATIC.STATIC
    // });
  }

  renderWithoutLoading = () => {
    const { contracts, isLoading } = this.state
    const { isShowTooltip } = this.state

    if (!isLoading) {
      if (contracts.length > 0) {
        return (
          <View style={[
            styles.content_container,
            { marginTop: isShowTooltip ? Context.getSize(158 + 16) : 0 }
          ]}>
            <HDContractList
              items={this.state.contracts}
              cellType={4}
              isHorizontal={false}
              isSwipeable={true}
              haveRightAction={true}
              onPressRightAction={this.deleteContract}
              onPressMaterItem={this.onShowDetail}
              onPressSubButton={this.onShowGuild}
            />
          </View>
        );
      }
      return null
    }
    return null
  }

  renderLoading = () => {
    const { isLoading } = this.state
    if (isLoading) {
      return <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_current_contract_nav")}
          navigation={this.props.navigation}
          leftOnPress={this.onNavBackToLoan}
        />

        {this.renderLoading()}
        {this.renderWithoutLoading()}

        <ModalGuildDelete
          isVisible={this.state.isShowTooltip}
          item={this.state.tooltipItem}
          onBackdropPress={this.hideModalTooltip}
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
  content_container: {
    flex: 1,
  },

});
