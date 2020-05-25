import React from 'react';
import { Platform, Linking, AppState } from "react-native";
import { BaseScreen, LoadingApp } from 'component';
import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from 'react-native-android-open-settings'

export default class SplashScreen extends BaseScreen {
  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    setTimeout(this.checkFlow, 2000);
    const typeId = await Util.FaceID.isSupported()
    this.props.biometricType(typeId)

    this.bankListAPI()
    this.policyGeneralAPI()
    this.policyESignAPI()
    this.getProvincesAPI()
    this.getListStores()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  goToMain = () => {
    this.props.navigation.navigate('MainFlow');
  }
  goToLogin = () => {
    this.props.navigation.navigate('AuthFlow');
  }
  checkFlow = () => {
    this.CheckConnectivity()
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
    if (nextAppState === 'active') {
      this.CheckConnectivity()
    }
  };

  CheckConnectivity = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.goToMain();
      } else {
        // alert("You are offline!");
        Context.application.showModalAlert(
          Context.getString("common_warning_no_internet_connection"),
          false,
          () => {
            console.log("CheckConnectivity callback")
            if (Platform.OS === "android") {
              AndroidOpenSettings.wirelessSettings()
            } else {
              Linking.openURL('app-settings:')
            }
          }
        )
      }
    })
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Context.application.showModalAlert(
        Context.getString("common_warning_no_internet_connection"),
        false,
        () => {
          Linking.openURL('app-settings:')
          // this.CheckConnectivity()
        }
      )
    } else {
      this.goToMain();
    }
  };

  /**
   * API GET BANK LIST
   */
  bankListAPI = async () => {
    try {
      const result = await Network.getBanksList()
      if (result != null) {
        if (result.code === 200) {
          console.log("API-BANK-LIST: " + JSON.stringify(result.payload))
          await LocalStorage.saveBanks(result.payload)
        } else {
          console.log("ERROR-API-BANK-LIST: " + result.code);
        }
      }
    } catch (err) {
      console.log("ERROR-API-BANK-LIST: " + err.message);
    }
  }

  /**
   * API Bản điều khoản và điều kiện chung
   */
  policyGeneralAPI = async () => {
    const result = await Network.contractGetPolicy(
      Util.Constant.POLICY_RULE_TYPE.GENERAL
    );
    if (result != null) {
      if (result.code === 200) {
        console.log(
          "API-CONTRACT-GET-POLICY-GENERAL: " + JSON.stringify(result.payload)
        );

        this.props.saveBase64Policy(result.payload.data)
      } else {
        console.log("ERROR-API-CONTRACT-GET-POLICY-GENERAL: " + result.code);
        console.log(
          "ERROR-API-CONTRACT-GET-POLICY-GENERAL: " +
          Network.getMessageFromCode(result.code)
        );
      }
    }
  }

  /**
   * API Bản điều khoản và điều kiện sử dụng DV điện tử
   */
  policyESignAPI = async () => {
    const result = await Network.contractGetPolicy(
      Util.Constant.POLICY_RULE_TYPE.ESIGN
    );
    if (result != null) {
      if (result.code === 200) {
        console.log(
          "API-CONTRACT-GET-POLICY-ESIGN: " + JSON.stringify(result.payload)
        );

        this.props.saveBase64PolicyEsign(result.payload.data)
      } else {
        console.log("ERROR-API-CONTRACT-GET-POLICY-ESIGN: " + result.code);
        console.log(
          "ERROR-API-CONTRACT-GET-POLICY-ESIGN: " +
          Network.getMessageFromCode(result.code)
        );
      }
    }
  }

  /**
   * API Get List Provinces
   */
  getProvincesAPI = async () => {
    try {
      const result = await Network.getProvinces();
      if (result != null) {
        if (result.code === 200) {
          LocalStorage.saveProvinces(result.payload)
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-LIST-PROVINCES: " + err);
    }
  }

  /**
   * API Get Link Plane Ticket
   */
  getLinkTicketAPI = async () => {
    try {
      let result = await Network.getLinkFromAPI();
      if (result !== null) {
        if (result.code === 200) {
          console.log("API-GET-LINK-TICKET: " + JSON.stringify(result.payload));
          LocalStorage.saveLinkTicket(result.payload)
        } else {
          console.log("API-GET-LINK-TICKET-error: " + result.code);
          console.log(
            "ERROR-API-GET-LINK-TICKET: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-LINK-TICKET-CATCH: " + err.message);
    }
  };

  /**
   * Get List near Stores
   */
  getListStores = async () => {
    try {
      const result = await Network.getStoresList();
      if (result != null) {
        if (result.code === 200) {
          console.log("API-GET-STORES-COMPLETE: " + JSON.stringify(result));
          if (result.payload != null) {
            LocalStorage.saveListStores(result.payload)
          }
        } else {
          console.log("ERROR-API-GET-STORES: " + result.code);
          console.log(
            "ERROR-API-GET-STORES: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-STORES: " + err.message);
    }
  }

  render() {
    return (<LoadingApp />);
    // return null
  }
}
