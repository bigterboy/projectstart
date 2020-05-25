import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Image,
  Alert
} from "react-native";
import { BaseScreen, Header, HDText } from "component";
import MenuItem from "./component/MenuItem";
import UserInfo from "./component/UserInfo";
import LocalStorage from "middleware/helper/LocalStorage";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";
import { th } from "date-fns/locale";

export default class Screen extends BaseScreen {
  /**
   * <Function: constructor>
   * @param switchOn check do you want to use authorize by faceID or finger print
   * @param user array data user
   */
  constructor(props) {
    super(props);
    this.state = {
      switchOn: false,
      user: []
    };

    this.storeUser = null;
    this.storeBiometric = null;
  }

  /**
   * <Function: get user from storage>
   */
  getStoreUser = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.storeBiometric = await LocalStorage.getUserBiometric();
  };

  /**
   * <Function: check is login
   */
  componentDidMount = async () => {
    const { isLogin, isLoginPhone, regPhoneNumber } = this.props;
    //Check login if isn't login go to screen login
    if (isLogin) {
      await this.getStoreUser();
      //get information to state user
      await this.getHeaderInfo();
      const switchOn = await this.getStateSwitch();
      if (this.fingerPrintButton) {
        const switchValue = this.fingerPrintButton.getSwitchValue();
        if (!switchValue) {
          switchOn ? this.fingerPrintButton.toggleSwitch() : null;
        }
      }
    } else {
      // if (!isLoginPhone) {
      //   this.props.navigation.navigate("AuthFlow");
      //   return;
      // }
    }
  };

  /**
   * <Function: update new data user>
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      //console.log("TAI SSSSSS: " + JSON.stringify(nextProps));
      this.setState({
        user: nextProps.user
      });
    }
  }

  /**Check Log When User agree Biometric */
  checkLogAPI = async () => {
    const { biometricType } = this.props;
    let actionType = "";

    if (biometricType !== -1) {
      if (biometricType === 2 || biometricType === 3) {
        actionType = Util.Constant.CHECK_LOG_ACTION.SET_FINGER;
      } else if (biometricType === 1) {
        actionType = Util.Constant.CHECK_LOG_ACTION.SET_FACE;
      }
    }

    try {
      var result = await Network.checkLogAction(
        this.storeUser.customer.uuid,
        "",
        actionType
      );

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "BIOMETRIC-CHECK-LOG-COMPLETE" + JSON.stringify(result.payload)
          );
        } else {
          console.log("ERROR-API-BIOMETRIC-CHECK-LOG " + result.code);
        }
      }
    } catch (err) {
      console.log("ERROR-API-BIOMETRIC-CHECK-LOG " + err.message);
    }
  };

  /**
   * Get Encrypted Password
   */
  getEncryptedPassAPI = async () => {
    try {
      var result = await Network.getEncryptedPassword(
        this.storeUser.customer.uuid,
      );
      if (result != null) {
        if (result.code === 200) {
          console.log("API-GET-ENCRYPTED-PASS-COMPLETE" + JSON.stringify(result.payload));
          const username = this.storeUser.customer.username
          await LocalStorage.saveUserBiometric({
            username: username,
            encrypted: result.payload
          });
        } else {
          console.log("ERROR-API-GET-ENCRYPTED-PASS " + result.code);
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-ENCRYPTED-PASS " + err.message);
    }
  };

  /**
   * <Function: get state switch to know what does user want to use authorize by finger print or faceID or not
   */
  getStateSwitch = async () => {
    if (this.storeBiometric != null) {
      const username = this.storeUser.customer.username;
      const bioUsername = this.storeBiometric.username;
      if (username === bioUsername) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  /**
   * <Function: get data user>
   */
  getHeaderInfo = async () => {
    const user = await LocalStorage.getUser();
    this.setState({
      user: user.customer
    });
  };

  /**
   * <Function: go to screen account profile>
   */
  goToProfile = () => {
    this.props.navigation.navigate("AccountProfile");
  };

  /**
   * <Function: go to change password account>
   */
  changePassword = () => {
    this.props.navigation.navigate("AccountChangePassword");
  };

  /**
   * <Function: show modal when click card management because this function is not avalable>
   */
  cardManagement = () => {
    // this.props.navigation.navigate("AccountCardManagement");
    Context.application.showModalAlert(
      Context.getString("common_warning_card_feature_no_support"),
      false
    );
  };

  /**
   * <Function: go to account payment history screen>
   */
  paymentHistory = () => {
    this.props.navigation.navigate("AccountPaymentHistory");
  };

  /**
   * <Function: go to account policy screen>
   */
  policy = () => {
    this.props.navigation.navigate("AccountPolicy", {
      typeFilePolicy: Util.Constant.POLICY_RULE_TYPE.ESIGN,
      navHeader: Context.getString("main_account_tab_policy_short")
    });
  };

  /**
   * <Function: go to policy rule screen>
   */
  condition = () => {
    this.props.navigation.navigate("AccountPolicy", {
      typeFilePolicy: Util.Constant.POLICY_RULE_TYPE.GENERAL,
      navHeader: Context.getString("main_account_tab_condition_short")
    });
  };

  /**
   * <Function: go to question screen>
   */
  fab = () => {
    this.props.navigation.navigate("AccountFAB");
  };

  /**clear data when logout */
  clearData = async () => {
    const {isLogin} = this.props
    let routerName = (isLogin) ? "Login" : "RegisterPhoneEnterPhone"
    this.props.logout();
    Context.application.clearDataLoginPhone();
    this.props.navigation.navigate(routerName);
    await LocalStorage.deleteUser();
    await LocalStorage.deleteToken();
    await this.props.cleanDataUserRedux();
    Context.application.setWarnedChangePass(false);
  };

  /**
   * <Function: click button sign out>
   */
  logout = async () => {
    this.clearData();
    try {
      const result = await Network.logout(this.storeUser.customer.uuid);
      if (result != null) {
        if (result.code === 200) {
        } else {
          console.log("ERROR-ACCOUNT-LOGOUT: " + JSON.stringify(result.code));
        }
      }
    } catch (err) {
      console.log("ERROR-ACCOUNT-LOGOUT: " + err.message);
    }
  };

  /**
   * <Function: call this function when switch on to check faceID or finger print>
   */
  toggleFingerprint = () => {
    let value = this.fingerPrintButton.toggleSwitch();
    console.log("toggleFingerprint: " + value);
    if (value) {
      Util.FaceID.auth(async error => {
        if (error.isError) {
          this.fingerPrintButton.toggleSwitch();
          if (error.message) {
            Alert.alert(error.message);
          }
        } else {
          this.getEncryptedPassAPI()
          this.checkLogAPI();
        }
      });
    } else {
      Util.FaceID.auth(async error => {
        if (error.isError) {
          this.fingerPrintButton.toggleSwitch();
          if (error.message) {
            Alert.alert(error.message);
          }
        } else {
          await LocalStorage.deleteUserBiometric();
        }
      });
    }
  };

  /**
   * Get User Avatar
   */
  getUserAvatar = () => {
    const { user } = this.props
    if (user) {
      return user.avatar
        ? "data:image/png;base64," + this.props.avatarBase64
        : null
    }
    return null
  }

  /**
   * Get User Avatar
   */
  getFullName = () => {
    const { user } = this.props
    if (user) {
      return this.props.user.fullName ? this.props.user.fullName : ""
    }
    return ""
  }

  /**
   * Get User Phone Number
   */
  getPhoneNumber = () => {
    const { user } = this.props
    if (user) {
      return this.props.user.phoneNumber ? this.props.user.phoneNumber : ""
    }
    return ""
  }


  /**Render Biometric Authenticate by device */
  renderItemBiometric = () => {
    const { biometricType } = this.props;
    let title = "";

    console.log("renderItemBiometric: " + biometricType);

    if (biometricType !== -1) {
      if (biometricType === 2 || biometricType === 3) {
        title = Context.getString("main_account_tab_fingerprint");
      } else if (biometricType === 1) {
        title = Context.getString("main_account_tab_face_id");
      }
      return (
        <MenuItem
          ref={ref => {
            this.fingerPrintButton = ref;
          }}
          icon={Context.getImage("iconFace")}
          title={title}
          showArrow={false}
          showSwitch={true}
          switchOn={this.state.switchOn}
          onPress={this.toggleFingerprint}
        />
      );
    }
    return null;
  };

  /**
   * Render Box only show when Login
   */
  renderWithLogin = () => {
    if (this.props.isLogin) {
      return (
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.boxContainer}>
            <MenuItem
              icon={Context.getImage("iconLock")}
              title={Context.getString("main_account_tab_change_pass")}
              onPress={this.changePassword}
            />

            {this.renderItemBiometric()}

            <MenuItem
              icon={Context.getImage("iconCreditCard")}
              title={Context.getString("main_account_tab_card_management")}
              // onPress={this.cardManagement}
              disableFeature={true}
            />
            <MenuItem
              icon={Context.getImage("icon_History")}
              title={Context.getString("main_account_tab_payment_history")}
              showLine={false}
              onPress={this.paymentHistory}
            />
          </View>

          <View style={styles.space} />
        </View>
      );
    }
  };

  renderCopyRight = () => {
    const { isLogin } = this.props;
    let version =
      Context.getString("common_version_app") + Util.String.getVersionApp();
    if (Util.String.getVersionApp() === "1.0.0") {
      version += " (" + Util.String.getVersionBuild() + ")";
    }

    return (
      <View
        style={{
          width: "100%"
        }}
      >
        <View style={styles.line_container}>
          <View style={styles.line} />
        </View>

        <View style={styles.copy_right_container}>
          <HDText style={styles.textCopyright} numberOfLines={1}>
            {Util.Constant.COPY_RIGHT_APP}
          </HDText>
          <HDText style={styles.textVersion}>{version}</HDText>
        </View>
      </View>
    );
  };

  /**
   * Render Logout
   */
  renderLogout = () => {
    const { isLogin, isLoginPhone } = this.props;
    if (isLogin || isLoginPhone) {
      return (
        <View style={styles.boxContainer}>
          <MenuItem
            icon={Context.getImage("icon_Power")}
            title={Context.getString("main_account_tab_logout")}
            titleStyle={styles.textLogout}
            showLine={false}
            showArrow={false}
            onPress={this.logout}
          />
        </View>
      );
    }
  };

  renderUserLoginPhone = () => {
    const { isLoginPhone, regPhoneNumber } = this.props;
    if (isLoginPhone) {
      return (
        <View style={styles.login_phone_user_info}>
          <Image
            source={Context.getImage("loginPhoneAvatar")}
            style={styles.login_phone_avatar}
          />
          <HDText style={styles.login_phone_phone}>{regPhoneNumber}</HDText>
        </View>
      );
    }
  };

  /**
   * <Function: render screen>
   */
  render() {
    const { isLogin, isLoginPhone, regPhoneNumber } = this.props;

    if (isLogin) {
      return (
        <View style={styles.container}>
          <Header title={Context.getString("main_account_tab_nav")} />

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.scroll_container}
          >
            <View style={styles.userInfo}>
              <UserInfo
                onPress={this.goToProfile}
                avatar={this.getUserAvatar()}
                name={this.getFullName()}
                phone={this.getPhoneNumber()}
              />
            </View>
            <View style={styles.space} />

            {this.renderWithLogin()}

            <View style={styles.boxContainer}>
              <MenuItem
                icon={Context.getImage("icon_Policy")}
                title={Context.getString("main_account_tab_policy")}
                onPress={this.policy}
              />
              <MenuItem
                icon={Context.getImage("icon_Rules")}
                title={Context.getString("main_account_tab_condition")}
                onPress={this.condition}
              />
              <MenuItem
                icon={Context.getImage("icon_Question")}
                title={Context.getString("main_account_tab_fab")}
                showLine={false}
                onPress={this.fab}
              />
            </View>
            <View style={styles.space} />

            {this.renderLogout()}

            <View style={styles.space} />

            {this.renderCopyRight()}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header title={Context.getString("main_account_tab_nav")} />

          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              {this.renderUserLoginPhone()}

              <View style={styles.space} />

              <View style={styles.boxContainer}>
                <MenuItem
                  icon={Context.getImage("icon_Policy")}
                  title={Context.getString("main_account_tab_policy")}
                  onPress={this.policy}
                />
                <MenuItem
                  icon={Context.getImage("icon_Rules")}
                  title={Context.getString("main_account_tab_condition")}
                  onPress={this.condition}
                />
                <MenuItem
                  icon={Context.getImage("icon_Question")}
                  title={Context.getString("main_account_tab_fab")}
                  showLine={false}
                  onPress={this.fab}
                />
              </View>
              <View style={styles.space} />

              {this.renderLogout()}

              <View style={styles.space} />
            </View>
            {this.renderCopyRight()}
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  headContainer: {
    height: 180
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: Context.getSize(Util.App.largeHeaderHeight())
  },
  headImage: {
    backgroundColor: Context.getColor("primary"),
    position: "absolute",
    flex: 1,
    height: "100%",
    bottom: 30
  },
  userInfo: {
    marginTop: Context.getSize(24),
    width: Context.getSize(343),
    height: Context.getSize(90)
  },
  boxContainer: {
    width: Context.getSize(343),
    backgroundColor: "white",
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  },
  space: { height: Context.getSize(24) },
  textLogout: {
    color: Context.getColor("textRed"),
    fontWeight: "500"
  },
  line_container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: Context.getColor("separatorLine")
  },
  copy_right_container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8
  },
  textCopyright: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(16),
    color: Context.getColor("textBlack")
  },
  textVersion: {
    fontSize: Context.getSize(14),
    color: Context.getColor("textBlack")
  },

  login_phone_user_info: {
    flexDirection: "row",
    width: Context.getSize(343),
    height: Context.getSize(90),
    alignItems: "center",
    borderRadius: 10,
    marginTop: Context.getSize(24),
    paddingHorizontal: 16,
    backgroundColor: "white",

    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  },
  login_phone_avatar: {
    width: Context.getSize(46),
    height: Context.getSize(46),
    borderRadius: Context.getSize(46 / 2),
    marginRight: 16
  },
  login_phone_phone: {
    fontSize: Context.getSize(18),
    fontWeight: "500",
    color: Context.getColor("textBlack")
  }
});
