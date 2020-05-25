import React, { Component } from "react";
import { Platform, Keyboard, View, StatusBar, Linking, AppState } from "react-native";
import Router from "src/Router";
import ModalRequireChangePassword from "./modal_require_change_password";
import ModalOutToken from "./modal_out_token";
import ModalRegisterOption from "./modal_register_option"

import { NavigationActions } from "react-navigation";
import { ModalAlert, HDSpinner } from "component"

import LocalStorage from "middleware/helper/LocalStorage";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen'

import NetInfo from "@react-native-community/netinfo";
import AndroidOpenSettings from 'react-native-android-open-settings'

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }

    this.state = {
      isLoading: false,
      modalError: false,
      callbackAlert: null,
      expiredToken: false,
      // expiredPassword: false,
      // expiredPasswordType: Util.Constant.WARNING_PASSWORD_TYPE.EXPIRED,
      callbackWarningPass: null,
      countRequest: 0,              //Using for count number of api complete
    };
    Context.application = this;
    Context.setLanguage(this.props.language);
  }

  /**
   * Event when touch notification
   */
  viewNotification = data => {
    const { isLogin } = this.props;
    const access = parseInt(data.access);
    let navObj = null;

    if (!isLogin && access === 2) {
      navObj = {
        routeName: "Login"
      };
    } else {
      switch (parseInt(data.type)) {
        case Util.Constant.NOTIFICATION_TYPE.NEWS:
          navObj = {
            routeName: "PromotionDetail",
            params: {
              id: data.id,
              type: Util.Constant.TYPE_WEB_DETAIL.NEW
            },
            key: "PromotionDetail" + data.id
          };
          break;
        case Util.Constant.NOTIFICATION_TYPE.EVENT:
          navObj = {
            routeName: "PromotionDetail",
            params: {
              id: data.id,
              type: Util.Constant.TYPE_WEB_DETAIL.EVENT
            },
            key: "PromotionDetail" + data.id
          };
          break;
        case Util.Constant.NOTIFICATION_TYPE.PROMO:
          navObj = {
            routeName: "PromotionDetail",
            params: {
              id: data.id,
              type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION
            },
            key: "PromotionDetail" + data.id
          };
          break;
        case Util.Constant.NOTIFICATION_TYPE.REMIND_PAY:
          if (!isLogin) {
            navObj = {
              routeName: "Login"
            };
            break;
          } else {
            navObj = {
              routeName: "LoanDetailLoan",
              params: {
                navData: {
                  contractCode: data.contractCode
                }
              },
              key: "LoanDetailLoan" + data.id
            };
            break;
          }
      }
    }

    this.router.dispatch(NavigationActions.navigate(navObj));
  };

  componentDidMount = async () => {
    const { isLogin } = this.props

    AppState.addEventListener('change', this._handleAppStateChange);
    const typeId = await Util.FaceID.isSupported()
    this.props.biometricType(typeId)
    
    // SplashScreen.hide()
    this.checkFlow()
    //////////////////////////////////////////////////////////////////////////

    await Util.Firebase.checkPermission(async () => {
      const myFcmToken = await LocalStorage.getFcmToken()
      const storeUser = await LocalStorage.getUser();
      console.log("myfcmToken: " + myFcmToken)
      if (myFcmToken) {
        const result = await Network.followNotification(
          (isLogin) ? storeUser.customer.uuid : null,
          myFcmToken
        )
        console.log("API FOLLOW NOTIFICATION :" + result.code)
      }
    })

    const notificationOpen = await firebase.notifications().getInitialNotification();
    console.log("NOTIFIACTION OPEN", notificationOpen)
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      this.viewNotification(notification.data)
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    }

    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.Max
    ).setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // When have new notification update props.isReadAllNotification = true so that can see different icon bell

      if (this.props.isLogin || this.props.isLoginPhone) {
        this.props.updateNotificationIcon(true);
      }

      // Process your notification as required
      notification
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_notification_android')
        .android.setColor(Context.getColor('primary'))
        .android.setAutoCancel(true)

      firebase.notifications()
        .displayNotification(notification);
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      this.viewNotification(notification.data)
      firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });

    //Call additional api
    this.additionalAPI()
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();

    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  // componentDidUpdate(preProps) {
  //   if (this.props.popularErrors.expiredToken !== preProps.popularErrors.expiredToken) {
  //     const { expiredToken } = this.props.popularErrors
  //     //Expired Token
  //     if (expiredToken) {
  //       this.setState({
  //         expiredToken: true
  //       })
  //     } else {
  //       this.setState({
  //         expiredToken: false
  //       })
  //     }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.countRequest !== prevState.countRequest){
      if (this.state.countRequest === Util.Constant.NUMBER_API_APP_LOADING){
        SplashScreen.hide()
        // alert("SplashScreen Hide")
      }
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.countRequest !== nextState.countRequest){
  //     return false
  //   }
  //   return true
  // }

  /**
   * Additional API
   */
  additionalAPI = () => {
    this.bankListAPI()
    this.getProvincesAPI()
    this.getListStores()
    this.getLinkTicketAPI()
    this.policyGeneralAPI()
    this.policyESignAPI()
  }

  clearData = (callback) => {
    const { isLogin, isLoginPhone } = this.props
    let routeName = ""
    if (isLogin) {
      routeName = "Login"
    } else {
      if (isLoginPhone) {
        routeName = "RegisterPhoneEnterPhone"
      }
    }
    this.router.dispatch(NavigationActions.navigate({ routeName: routeName }));

    this.props.refreshExpiredToken()
    this.clearDataLoginPhone();
    this.props.cleanDataUserRedux();
    this.props.logout();
    LocalStorage.deleteUser();
    LocalStorage.deleteToken();
  }

  /**Log out when expired token */
  logout = () => {
    const { user } = this.props
    this.clearData()
    // this.logoutAPI(user.uuid)
  };

  // logoutAPI = async (uuid) => {
  //   try {
  //     const result = await Network.logout(uuid);
  //     LocalStorage.deleteToken();
  //     if (result != null) {
  //       if (result.code === 200) {
  //         console.log("ACCOUNT-LOGOUT-COMPLETE")
  //       } else {
  //         console.log("ERROR-ACCOUNT-LOGOUT: " + JSON.stringify(result.code));
  //       }
  //     }
  //   } catch (err) {
  //     console.log("ERROR-ACCOUNT-LOGOUT: " + err.message);
  //   }
  // }

  /**
   * Clear Data Login By Phone Before Login With Contract
   */
  clearDataLoginPhone = () => {
    this.props.logoutWithPhone()
  }

  showLoading = () => {
    this.setState({ isLoading: true });
  };
  hideLoading = () => {
    this.setState({ isLoading: false })
  };
  changeLanguage = key => {
    Context.setLanguage(key);
    this.props.changeLanguage(key);
    this.hideMsg();
    Keyboard.dismiss();
  };

  showRequirePassword = () => {
    this.modalPassword.showModal();
  };

  buttonPasswordPress = () => {
    this.router.dispatch(
      NavigationActions.navigate({
        routeName: "AccountChangePassword",
        params: { requireChange: true }
      })
    );
  };

  showModalAlert = (message, typeYesNo, callback = null) => {
    this.modalError.setErrorMessage(message, typeYesNo)
    this.setState({
      modalError: true,
      callbackAlert: callback
    })
  }

  hideModalAlert = () => {
    const { callbackAlert } = this.state
    this.setState({ modalError: false, callbackAlert: null }, () => {
      if (callbackAlert) callbackAlert()
    })
  }

  cancelModalAlert = () => {
    this.setState({
      modalError: false
    })
  }

  onConfirmExpired = () => {
    this.setState({
      expiredToken: false
    }, () => {
      this.logout()
    })
  }

  /**
   * Show Modal Required change Password
   */
  showModalChangePass = (type, callback) => {
    this.setState({
      callbackWarningPass: callback
    })
    this.props.showExpiredPass(type)
  }

  /**
   * Hide Modal Required Change Password
   */
  hideChangePass = (callback) => {
    this.props.refreshExpiredPass()
    if (callback) callback()
  }

  changePassNow = () => {
    this.router.dispatch(NavigationActions.navigate({
      routeName: "AccountChangePassword",
      params: {
        isShowForgot: true
      }
    }));
    this.props.refreshExpiredPass()
  }

  changePassLater = () => {
    const { callbackWarningPass } = this.state
    this.hideChangePass(() => {
      this.setState({ callbackWarningPass: null }, () => {
        if (callbackWarningPass) callbackWarningPass()
      })
    })
  }

  /**
   * Khi đã show cảnh báo sắp hết hạn password 
   * thì không cho show nữa cho tới khi load lại app từ splash screen
   */
  setWarnedChangePass = (value) => {
    this.props.warnedExpiredPassword(value)
  }

  /**
   * Show Modal Register Option
   */
  showModalRegOption = () => {
    this.props.showModalRegOption(true)
  }

  /**
   * Hide Modal Register Option
   */
  hideMdRegOption = () => {
    this.props.showModalRegOption(false)
  }

  /**
   * Show Register with Contract
   */
  onShowRegContract = () => {
    this.hideMdRegOption()
    setTimeout(() => {
      this.router.dispatch(NavigationActions.navigate({ routeName: "AuthFlow" }))
    }, 500);
  }

  checkFlow = () => {
    this.CheckConnectivity()
  }
  goToMain = () => {
    this.router.dispatch(NavigationActions.navigate({ routeName: "MainFlow" }))
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
        // this.goToMain();
      } else {
        SplashScreen.hide()
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
      // this.goToMain();
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  //LIST API USING FOR APP

  increaseComplete = () => {
    this.setState({
      countRequest: this.state.countRequest + 1
    }, ()=>{
      console.log("countRequest: " + this.state.countRequest)
      // if (this.state.countRequest === 6){
      //   alert("complete loading")
      // }
    })
  }

  /**
   * API GET BANK LIST
   */
  bankListAPI = async () => {
    try {
      const result = await Network.getBanksList()
      this.increaseComplete()
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
    // this.increaseComplete()
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
    // this.increaseComplete()

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
      this.increaseComplete()
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
      this.increaseComplete()
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
      this.increaseComplete()
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

  /**
  * Show Register with Phone
  */
  onShowRegPhone = () => {
    this.hideMdRegOption()
    setTimeout(() => {
      this.router.dispatch(NavigationActions.navigate({ routeName: "RegisterPhoneEnterPhone" }))
    }, 500);
  }

  /**
   * Render Modal Expired Token
   */
  renderOutToken = () => {
    const { popularErrors } = this.props
    if (popularErrors.expiredToken) {
      return (
        <ModalOutToken
          onConfirm={this.onConfirmExpired}
        />
      )
    }
    return null
  }

  /**
   * Modal Require Change Password
   */
  renderChangePassword = () => {
    const { popularErrors } = this.props
    if (popularErrors) {
      if (!popularErrors.expiredToken) {
        if (popularErrors.expiredPassword) {
          return (
            <ModalRequireChangePassword
              type={popularErrors.expiredPasswordType}
              onPressChange={this.changePassNow}
              onPressLater={this.changePassLater}
            />
          )
        }
        return null
      }
      return null
    }

    return null
  }

  /**
   * Modal Register Option
   * Choose register with contract or phone
   */
  renderRegisterOption = () => {
    return (
      <ModalRegisterOption
        isVisible={this.props.isShowRegOption}
        onHaveContract={this.onShowRegContract}
        onNoContract={this.onShowRegPhone}
        pressCancelX={this.hideMdRegOption}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <HDSpinner
          visible={this.state.isLoading}
        />

        <Router ref={ref => (this.router = ref)} />

        <ModalAlert
          ref={ref => this.modalError = ref}
          isVisible={this.state.modalError}
          onPressConfirm={this.hideModalAlert}
          onCancel={this.cancelModalAlert}
        />

        {this.renderOutToken()}

        {this.renderChangePassword()}

        {this.renderRegisterOption()}
      </View>
    );
  }
}

