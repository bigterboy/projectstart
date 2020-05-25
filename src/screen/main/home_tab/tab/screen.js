import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  RefreshControl,
} from "react-native";
import Context from "context";
import {
  BaseScreen,
  HandleBack,
  ModalConfirm,
  HDLoanView,
  HDGuidView,
  HDGroupHeader,
  HDUserHeaderBar,
  HDBanner,
  HDNewsListH,
  HDOffersList,
  HDLargeHeader,
  HDRemindView,
  ModalWaiting,
  ModalRemindPay,
  ModalBuyTicket,
  HDContractListItem,
  ModalAdjustment,
  HDUserHeader
} from "component";
import Util from "util";
import LocalStorage from "middleware/helper/LocalStorage";
import Network from "middleware/helper/Network";

const AnimatedUserHeader = Animated.createAnimatedComponent(HDUserHeaderBar)
const AnimatedHeader = Animated.createAnimatedComponent(HDUserHeader)

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalExitVisible: false,
      modalBuyTicketVisible: false,
      modalWaiting: false,
      modalAdjust: false,
      modalRemindPay: false,
      modalRegOption: false,
      fullname: null,
      phone: null,
      avatar: null,
      refreshing: false,
      scrollY: new Animated.Value(0),
      contractCellType: 0,
      promotions: [],
      events: [],
      news: [],

      waitings: [],
      adjustments: [],
      duePays: [],
      linkTicket: "",

      //Data Modal Esign, Adjust, Remind Payment
      adDataModal: null,
      waDataModal: null,
      duDataModal: null,

      //Check user close modal or close when navigate
      isNavigate: false,
      existNotify: false,
      //Using for count request Contract
      countRequest: 0
    };

    this.waitings = []
    this.adjustments = []
    this.duePays = []
  }

  increaseCount = () => {
    this.setState({ countRequest: this.state.countRequest + 1 })
  }

  componentDidMount = async () => {
    const { isLogin, isLoginPhone } = this.props
    if (!isLogin && !isLoginPhone) {
      this.props.updateNotificationIcon(false);
    }

    if (isLogin) this.contractsAPI()

    this._navListener = this.props.navigation.addListener("didFocus", payload => {
      this.getHeaderInfo();
      this.reloadAPI();
      this.noReloadAPI()
    });
  };

  showPopupContract = () => {
    setTimeout(() => {
      if (this.adjustments.length > 0) {
        this.showMdAdjust();
      } else {
        if (this.waitings.length > 0) {
          this.showMdWaiting();
        } else {
          if (this.duePays.length > 0) {
            this.showMdRemind();
          }
        }
      }
    }, 250);
  }

  componentWillUnmount = () => {
    this._navListener.remove();
  };

  /**
   * No Reload API (only use when pull to refresh)
   */
  noReloadAPI = async () => {
    this.promotionAPI();
    this.eventsAPI();
    this.newsAPI();
  }

  /**
   * Reload API (Call when screen appear)
   */
  // reloadAPI = async () => {
  //   const { user } = this.props
  //   if (user) {
  //     // alert(JSON.stringify(user))
  //     this.checkExistNotifyAPI(user.uuid)
  //   }

  //   if (this.props.isLogin) {
  //     if (user.requireChangePassword == 1) {
  //       Context.application.showModalChangePass(
  //         Util.Constant.WARNING_PASSWORD_TYPE.EXPIRED
  //       )
  //     } else {
  //       if (this.props.isWarnedPassword) {
  //         this.contractsAPI()
  //       } else {
  //         await this.passwordExpiredAPI();
  //       }
  //     }
  //   }
  // };
  reloadAPI = async () => {
    const { user } = this.props
    if (user) {
      this.checkExistNotifyAPI(user.uuid)
    }

    if (this.props.isLogin) {
      if (user.requireChangePassword == 1) {
        Context.application.showModalChangePass(
          Util.Constant.WARNING_PASSWORD_TYPE.EXPIRED
        )
      } else {
        if (this.props.isWarnedPassword) {
          this.showPopupContract()
        } else {
          await this.passwordExpiredAPI();
        }
      }
    }
  };

  /**Call API contract adjustment, esign, remind payment */
  contractsAPI = async () => {
    this.getAdjustmentAPI();
    this.getWaitingAPI();
    this.getDuePayAPI();
  };

  goToMain = () => {
    this.props.navigation.navigate("MainFlow");
  };
  goToLogin = () => {
    this.props.navigation.navigate("AuthFlow");
  };
  showModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: true
    });
  };
  hideModalExit = () => {
    this.setState({
      ...this.state,
      modalExitVisible: false
    });
  };
  showModalTicket = () => {
    this.setState({
      ...this.state,
      modalBuyTicketVisible: true
    });
  };
  hideModalTicket = () => {
    this.setState({
      ...this.state,
      modalBuyTicketVisible: false
    });
  };

  exitApp = () => {
    this.hideModalExit();
    Util.App.exitApp();
  };
  logout = () => {
    this.hideModalLogout();
    this.props.logout();
  };

  onBackPress = () => {
    //this.showModalExit();
    //return true;
  };

  getHeaderInfo = async () => {
    const { isLogin, isLoginPhone, user } = this.props
    if (isLogin || isLoginPhone) {
      if (!this.props.avatarBase64) {
        this.props.saveImageBase64URL(user.avatar);
      }
    }
  };

  getUserHeaderName = () => {
    const { isLogin, isLoginPhone, user } = this.props
    if (isLogin) {
      if (user) {
        return (this.props.user.fullName) ? this.props.user.fullName : ""
      } else {
        return ""
      }
    } else {
      return (isLoginPhone) ? "" : "Đăng nhập"
    }
  }

  getUserHeaderPhone = () => {
    const { isLogin, isLoginPhone, regPhoneNumber, user } = this.props
    if (isLogin) {
      if (user) {
        return (this.props.user.phoneNumber) ? this.props.user.phoneNumber : ""
      }
      return ""
    } else {
      return (isLoginPhone) ? regPhoneNumber : "Nhấp để đăng nhập"
    }
  }

  getUserHeaderAvatar = () => {
    const { isLogin, user } = this.props
    if (isLogin) {
      if (user) {
        return user.avatar ? "data:image/png;base64," + this.props.avatarBase64 : null
      } else {
        return null
      }
    } else {
      return null
    }
  }

  //Get Promotion List
  promotionAPI = async () => {
    const { isLogin, isLoginPhone, user } = this.props
    try {
      let result = null;
      if ((isLogin) || (isLoginPhone)) {
        result = await Network.promotionIndividual(user.uuid, 5, 0);
      } else {
        result = await Network.promotionGeneral(5);
      }
      if (result !== null) {
        if (result.code === 200) {
          console.log(
            "PROMOTION-LIST-COMPLETE: " + JSON.stringify(result.payload)
          );
          this.setState({
            promotions: result.payload
          });
        } else {
          console.log("ERROR-API-PROMOTION-LIST: " + result.code);
          console.log(
            "ERROR-API-PROMOTION-LIST: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-PROMOTION-LIST-CATCH: " + err.message);
    }
  };

  //Events (Khuyến mãi)
  eventsAPI = async () => {
    const { isLogin, isLoginPhone, user } = this.props;
    try {
      let result = null;
      if ((isLogin) || (isLoginPhone)) {
        result = await Network.newHomeLogged(user.uuid, 5, 0, 1);
      } else {
        result = await Network.newHome(5, 1);
      }
      if (result != null) {
        if (result.code === 200) {
          console.log("API-EVENTS-COMPLETE: " + JSON.stringify(result.payload));
          this.setState({
            events: result.payload
          });
        } else {
          console.log("ERROR-API-EVENTS: " + result.code);
          console.log(
            "ERROR-API-EVENTS: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-EVENTS-CATCH: " + err.message);
    }
  };

  /**News (Tin tức)*/
  newsAPI = async () => {
    const { isLogin, isLoginPhone, user } = this.props;
    try {
      let result = null;
      if ((isLogin) || (isLoginPhone)) {
        result = await Network.newHomeLogged(user.uuid, 5, 0, 2);
      } else {
        result = await Network.newHome(5, 2);
      }

      if (result != null) {
        if (result.code === 200) {
          //console.log("API-NEWS-COMPLETE: " + JSON.stringify(result.payload));
          this.setState({
            news: result.payload
          });
        } else {
          console.log("ERROR-API-NEWS: " + result.code);
          console.log(
            "ERROR-API-NEWS: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-NEWS-CATCH: " + err.message);
    }
  };

  /**API Get Waiting Contract (eSign) */
  getWaitingAPI = async () => {
    const { user } = this.props
    try {
      const result = await Network.contractWaiting(user.uuid);
      this.increaseCount()
      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-GET-WAITING-COMPLETE: " + JSON.stringify(result.payload)
          );
          const data = result.payload;
          this.waitings = JSON.parse(JSON.stringify(data))

          this.setState({
            waitings: data,
            waDataModal: data.length > 0 ? data[data.length - 1] : null
          });

        } else {
          console.log("ERROR-API-GET-WAITING: " + result.code);
          console.log(
            "ERROR-API-GET-WAITING: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-WAITING-CATCH: " + err.message);
    }

  };

  /**API Get Adjustment */
  getAdjustmentAPI = async () => {
    const { user } = this.props
    try {
      const result = await Network.contractWaitingAdjust(user.uuid);
      this.increaseCount()
      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-GET-ADJUSTMENT-COMPLETE: " + JSON.stringify(result.payload)
          );
          const data = result.payload;
          this.adjustments = JSON.parse(JSON.stringify(data))

          this.setState({
            adjustments: data,
            adDataModal: data.length > 0 ? data[data.length - 1] : null
          });
        } else {
          console.log("ERROR-API-GET-ADJUSTMENT: " + result.code);
          console.log(
            "ERROR-API-GET-ADJUSTMENT: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-ADJUSTMENT-CATCH: " + err.message);
    }
  };

  /**
   * Hợp đồng đến hạn thanh toán để show popup
   */
  getDuePayAPI = async () => {
    const { user } = this.props
    try {
      const result = await Network.contractRemindPay(user.uuid);
      this.increaseCount()
      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-GET-REMIND-PAY-COMPLETE: " + JSON.stringify(result.payload)
          );
          const data = result.payload;
          this.duePays = JSON.parse(JSON.stringify(data))

          this.setState({
            duePays: data,
            duDataModal: data.length > 0 ? data[data.length - 1] : null
          });
        } else {
          console.log("ERROR-API-GET-REMIND-PAY: " + result.code);
          console.log(
            "ERROR-API-GET-REMIND-PAY: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-REMIND-PAY-CATCH: " + err.message);
    }
  };

  /**
   * Check time available For Sign
   */
  availableSignAPI = async (errMessage, callback) => {
    try {
      const result = await Network.esignAvailabeSign();
      if (result != null) {
        if (result.code === 200) {
          console.log("API-AVAILABLE-SIGN: " + JSON.stringify(result));
          if (result.payload != null) {
            if (result.payload.result == 0) {

              setTimeout(() => {
                Context.application.showModalAlert(
                  Util.String.format(
                    errMessage,
                    result.payload.esignFrom,
                    result.payload.esignTo
                  ),
                  false
                );
              }, 500);

            } else if (result.payload.result == 1) {
              if (callback) callback();
            }
          } else {
            console.log("ERROR-API-AVAILABLE-SIGN");
          }
        } else {
          console.log("ERROR-API-AVAILABLE-SIGN: " + result.code);
          console.log(
            "ERROR-API-AVAILABLE-SIGN: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-AVAILABLE-SIGN: " + err.message);
    }
  };

  /**
   * Check Password Expired
   * Show number of day will expired
   */
  passwordExpiredAPI = async () => {
    const { user } = this.props
    try {
      const result = await Network.checkPasswordExpired(user.uuid);
      if (result != null) {
        if (result.code === 200) {
          console.log("API-CHECK-PASS-EXPIRED: " + JSON.stringify(result));
          if (result.payload != null) {
            const warning = result.payload.warning;
            const daysLeft = result.payload.daysLeft;

            if (warning) {
              if (daysLeft > 0) {
                Context.application.showModalChangePass(
                  Util.Constant.WARNING_PASSWORD_TYPE.WARNING,
                  () => {
                    this.showPopupContract()
                  })
                Context.application.setWarnedChangePass(true)
              }
            } else {
              this.showPopupContract()
            }
          } else {
            console.log("ERROR-API-CHECK-PASS-EXPIRED");
          }
        } else {
          console.log("ERROR-API-CHECK-PASS-EXPIRED: " + result.code);
          console.log(
            "ERROR-API-CHECK-PASS-EXPIRED: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-CHECK-PASS-EXPIRED: " + err.message);
    }
  };

  /**
   * API CHECK EXIST NOTIFICATION
   */
  checkExistNotifyAPI = async (customerUuid) => {
    try {
      const result = await Network.checkReadAllNotification(customerUuid);
      if (result != null) {
        if (result.code === 200) {
          console.log("API-CHECK-READ-ALL-NOTIFY: " + result.payload);
          //this.setState({existNotify: result.payload})
          this.props.updateNotificationIcon(result.payload);
        } else {
          console.log("ERROR-API-CHECK-READ-ALL-NOTIFY: " + result.code);
          console.log(
            "ERROR-API-CHECK-READ-ALL-NOTIFY: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-CHECK-READ-ALL-NOTIFY: " + err.message);
    }
  }

  _onRefresh = async () => {
    // Util.App.waitTimeOut().then(() => this.setState({
    //   refreshing: false
    // }));
    this.setState(
      {
        refreshing: true
      },
      async () => {
        this.contractsAPI()
        await this.noReloadAPI()
        await this.reloadAPI();

        this.setState({ refreshing: false });
      }
    );
  };

  onShowAccountInfo = () => {
    const { isLogin, isLoginPhone } = this.props
    if (isLogin) {
      this.props.navigation.navigate("MainAccountTab");
      console.log("GO TO MainAccountTab");
    } else {
      if (isLoginPhone) {
        this.props.navigation.navigate("MainAccountTab");
      } else {
        Context.application.showModalRegOption()
      }
    }
  };

  onPressNotify = () => {
    this.props.navigation.navigate("NotificationList");
  };

  /**
   * signType: 1:ESign - 2:Adjustment
   */
  onShowListContract = (signType = 1) => {
    let navTitle = Context.getString("home_tab_contract_waiting_nav");
    if (signType === 2) navTitle = Context.getString("home_tab_contract_adjustment_nav");
    this.props.navigation.navigate("ContractWaiting", {
      navData: {
        navTitle: navTitle,
        signType: signType
      }
    });
  };

  onSelectLoan = (item, index) => {
    if (index === 2) {
      this.showModalTicket();
    } else if (index === 0) {
      this.props.navigation.navigate("LoanRegister", {
        //loanType: index
      });
    } else if (index === 1) {
      this.props.navigation.navigate("LoanRegisterOther", {
        //loanType: index
      });
    }
  };

  viewAllPromotion = () => {
    this.props.navigation.navigate("MainPromotionTab");
  };

  onSelectGuild = index => {
    if (index == 0) {
      this.props.navigation.navigate("GuildNearStore");
    } else if (index == 1) {
    } else if (index == 2) {
      this.props.navigation.navigate("GuildPayment");

      // this.props.navigation.navigate("PromotionDetail", {
      //   type: Util.Constant.WEB_STATIC.STATIC
      // });
    }
  };

  //Ký hợp đồng hoặc phụ lục hợp đồng
  onPressSign = item => {
    this.availableSignAPI(
      Context.getString("common_warning_time_up_sign_esign"),
      () => {
        this.props.navigation.navigate("LoanESign", {
          navData: item
        });
      }
    );
  };

  /**
   * Sign Adjustment
   */
  onPresSignAdjust = item => {
    this.availableSignAPI(
      Context.getString("common_warning_time_up_sign_adjustment"),
      () => {
        this.props.navigation.navigate("LoanESignSub", {
          navData: item
        });
      }
    );
  };

  //View Promotion Detail
  pressPromotion = item => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION,
    });
  };

  //View Event Detail
  pressEvent = item => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.EVENT,
    });
  };

  //View new detail
  viewAllNew = () => {
    this.props.navigation.navigate("NewsList", {
      type: Util.Constant.TYPE_WEB_DETAIL.NEW
    });
  };

  //View Events detail
  viewAllEvents = () => {
    this.props.navigation.navigate("NewsList", {
      type: Util.Constant.TYPE_WEB_DETAIL.EVENT
    });
  };

  pressNew = item => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.NEW,
    });
  };

  /**Show Modal Waiting Contract */
  showMdWaiting = () => {
    this.setState({
      modalWaiting: true
    });
  };

  /**Hide Modal Waiting Contract */
  hideMdWaiting = () => {
    this.setState({
      modalWaiting: false
    });
  };
  /**Event after hide modal to show other modal */
  onMdWaitingHide = () => {
    this.waitings.pop()
    if (!this.state.isNavigate) {
      if (this.waitings.length > 0) {
        let idx = this.waitings.length - 1
        this.setState({ waDataModal: this.waitings[idx] })
      } else {
        if (this.duePays.length > 0) {
          this.showMdRemind()
        }
      }
    }
  };

  /**Show Modal Adjustment Contract */
  showMdAdjust = () => {
    this.setState({
      modalAdjust: true
    });
  };

  /**Hide Modal Adjustment Contract */
  hideMdAdjust = () => {
    this.setState({
      modalAdjust: false
    });
  };
  /**Event after hide modal to show other modal */
  onMdAdjustHide = () => {
    this.adjustments.pop()
    if (!this.state.isNavigate) {
      if (this.adjustments.length > 0) {
        let idx = this.adjustments.length - 1
        this.setState({ adDataModal: adjustments[idx] });
        this.showMdAdjust();
      } else {
        if (this.waitings.length > 0) {
          this.showMdWaiting();
        } else if (this.duePays.length > 0) {
          this.showMdRemind();
        }
      }
    }
  };

  /**Show modal Remind payment */
  showMdRemind = () => {
    this.setState({
      modalRemindPay: true
    });
  };

  /**Hide modal Remind payment */
  hideMdRemind = () => {
    this.setState({
      modalRemindPay: false
    });
  };
  /**Event after hide modal to show other modal */
  onMdRemindHide = () => {
    this.duePays.pop()
    if (!this.state.isNavigate) {
      if (this.duePays.length > 0) {
        let idx = this.duePays.length - 1
        this.setState({ duDataModal: this.duePays[idx] });
        this.showMdRemind();
      }
    }
  };

  /**
   * Sign Adjustment from popup
   */
  onConfirmMdAdjust = item => {
    // this.hideMdAdjust()
    this.setState(
      {
        modalAdjust: false,
        isNavigate: true
      },
      () => {
        this.availableSignAPI(
          Context.getString("common_warning_time_up_sign_adjustment"),
          () => {
            this.props.navigation.navigate("LoanESignSub", {
              navData: item
            });
          }
        );
      }
    );
  };

  /**
   * Sign Esign from popup
   */
  onConfirmMdWait = item => {
    this.setState(
      {
        modalWaiting: false,
        isNavigate: true
      },
      () => {
        this.availableSignAPI(
          Context.getString("common_warning_time_up_sign_esign"),
          () => {
            this.props.navigation.navigate("LoanESign", {
              navData: item
            });
          }
        );
      }
    );
  };

  /**
   * View Guild Payment
   */
  onConfirmMdRemindPay = () => {
    // this.hideMdRemind();
    this.setState(
      {
        modalRemindPay: false,
        isNavigate: true
      },
      () => {
        this.props.navigation.navigate("GuildPayment");

        // this.props.navigation.navigate("PromotionDetail", {
        //   type: Util.Constant.WEB_STATIC.STATIC
        // });
      }
    );
  };

  //Ưu đãi
  renderPromotions = () => {
    const { promotions } = this.state;
    const leftTitle = this.props.isLogin || this.props.isLoginPhone
      ? Context.getString("home_tab_group_header_promotion")
      : Context.getString("home_tab_group_header_promotion_new");
    if (promotions.length > 0) {
      const length = promotions.length;
      return (
        <View
          style={{
            width: "100%",
            marginBottom: Context.getSize(0),
          }}
        >
          <HDGroupHeader
            leftTitle={leftTitle}
            rightTitle={promotions.length > 1 ? Context.getString("common_view_all") : null}
            onPressRight={this.viewAllPromotion}
          />

          <HDOffersList
            items={this.state.promotions}
            onPressItem={this.pressPromotion}
            style={{ marginBottom: 0 }}
          />
        </View>
      );
    }
    return null;
  };

  //renderEvents
  renderEvents = () => {
    const { events } = this.state;
    if (events) {
      if (events.length > 0) {
        return (
          <View style={{ width: "100%" }}>
            <HDGroupHeader
              leftTitle={Context.getString("home_tab_group_header_event")}
              rightTitle={
                events.length > 2 ? Context.getString("common_view_all") : null
              }
              onPressRight={this.viewAllEvents}
            />

            <HDBanner
              ref={(c) => { this._carousel = c; }}
              isShowPagination={true}
              items={this.state.events}
              onPressItem={this.pressEvent}
              style={{ marginBottom: 0 }}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  };

  renderNews = () => {
    const { news } = this.state;
    if (news) {
      const length = news.length;

      console.log("NEWS LENGH MOI LA: + +  + + + ", news.length)

      if (length > 0) {
        console.log("RENDER NEWS O TRONG KHONGGNNGNG");
        return (
          <View style={{ width: "100%", marginTop: Context.getSize(0) }}>
            <HDGroupHeader
              leftTitle={Context.getString("home_tab_group_header_news")}
              rightTitle={news.length > 2 ? Context.getString("common_view_all") : null}
              onPressRight={this.viewAllNew}
            />

            <HDNewsListH items={this.state.news} onPressItem={this.pressNew} />
          </View>
        );
      }
      return null;
    }
    return null;
  };

  /** Show waiting contracts with more than 2 item*/
  renderMoreWaiting = () => {
    const { waitings } = this.state;
    const length = waitings.length;
    if (length > 1) {
      return (
        <HDRemindView
          numOfContract={length}
          onPress={this.onShowWaitingContract}
        />
      );
    }
    return null;
  };

  /** Show Adjustment contracts (PLHD)*/
  // renderAdjust = () => {
  //   const { adjustments } = this.state
  //   const length = adjustments.length
  //   if (length > 0) {
  //     return (
  //       <HDContractList
  //         items={this.state.adjustments}
  //         isShowPagination={true}
  //         isHorizontal={true}
  //         cellType={5}
  //         style={{ marginBottom: 32 }}
  //         onPressSubButton={this.onPresSignAdjust}
  //       />
  //     )
  //   }
  //   return null
  // }

  renderGuild = () => {
    return (
      <View style={{ width: "100%" }}>
        <HDGroupHeader
          leftTitle={Context.getString("home_tab_group_header_guild")}
        />
        <HDGuidView onPressItem={this.onSelectGuild} />
      </View>
    );
  };

  /**
   * Group Loan and contract esign, adjustment 1 item
   */
  groupContract = () => {
    const { waitings, adjustments } = this.state;

    waitingItem = () => {
      if (waitings.length == 1) {
        return (
          <HDContractListItem
            item={waitings[0]}
            cellType={0}
            style={{
              ...styles.item_container,
              marginRight: 16
            }}
            onPressItem={this.onPressSign}
          />
        );
      }
    };

    adjustItem = () => {
      if (adjustments.length == 1) {
        return (
          <HDContractListItem
            item={adjustments[0]}
            cellType={5}
            style={{
              ...styles.item_container,
              marginRight: 16
            }}
            onPressItem={this.onPresSignAdjust}
          />
        );
      }
    };

    return (
      <ScrollView
        horizontal={true}
        style={styles.scroll_loan}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled={true}
        contentContainerStyle={styles.scroll_loan_content}
      >
        {adjustItem()}
        {waitingItem()}

        <View>
          <HDLoanView
            onPressItem={this.onSelectLoan}
          />
        </View>
      </ScrollView>
    );
  };

  /**
   * Group contract esign, adjustment more than 1 item
   */
  groupMoreContract = () => {
    const { waitings, adjustments } = this.state;

    waitingItem = () => {
      const length = waitings.length;
      if (length > 1) {
        return (
          <HDRemindView
            numOfContract={length}
            type={1}
            onPress={() => this.onShowListContract(1)}
          />
        );
      }
    };

    adjustItem = () => {
      const length = adjustments.length;
      if (length > 1) {
        return (
          <HDRemindView
            numOfContract={length}
            type={2}
            style={{ marginRight: 16 }}
            onPress={() => this.onShowListContract(2)}
          />
        );
      }
    };

    return (
      <ScrollView
        horizontal={true}
        style={styles.scroll_loan}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled={true}
        contentContainerStyle={styles.scroll_loan_content}
      >
        {adjustItem()}
        {waitingItem()}
      </ScrollView>
    );
  };

  renderModalAdjust = () => {
    const { isLogin } = this.props;
    if (isLogin) {
      const { adjustments, adDataModal } = this.state;
      if (adjustments.length > 0) {
        return (
          <ModalAdjustment
            data={adDataModal}
            isVisible={this.state.modalAdjust}
            onPressConfirm={this.onConfirmMdAdjust}
            pressCancelX={this.hideMdAdjust}
            onModalHide={this.onMdAdjustHide}
          />
        );
      }
    }
  };

  renderModalWaiting = () => {
    const { isLogin } = this.props;
    if (isLogin) {
      const { waitings, waDataModal } = this.state;
      if (waitings.length > 0) {
        return (
          <ModalWaiting
            data={waDataModal}
            isVisible={this.state.modalWaiting}
            onPressConfirm={this.onConfirmMdWait}
            pressCancelX={this.hideMdWaiting}
            onModalHide={this.onMdWaitingHide}
          />
        );
      }
    }
  };

  renderModalRemindPay = () => {
    const { isLogin } = this.props;
    if (isLogin) {
      const { duePays, duDataModal } = this.state;
      if (duePays.length > 0) {
        return (
          <ModalRemindPay
            data={duDataModal}
            isVisible={this.state.modalRemindPay}
            onPressConfirm={this.onConfirmMdRemindPay}
            pressCancelX={this.hideMdRemind}
            onModalHide={this.onMdRemindHide}
          />
        );
      }
    }
  };

  restartAutoPlay = () => {
    if (this._carousel) {
      this._carousel.restartAutoPlay();
    }
  };

  render() {
    //Mặc định
    const opacityHeaderBar = this.state.scrollY.interpolate({
      inputRange: [0, 5],
      outputRange: [1, 0]
    });

    //Xuất hiện khi scroll
    const opacityHeader = this.state.scrollY.interpolate({
      inputRange: [0, 250],
      outputRange: [0, 1]
    });

    return (

      <HandleBack onBack={this.onBackPress}>
        <View
          style={{
            flex: 1,
            backgroundColor: Context.getColor("background")
          }}>
        </View>

        <View style={styles.container}>
          <AnimatedHeader
            loginByPhone={this.props.isLoginPhone}
            name={this.getUserHeaderName()}
            phone={this.getUserHeaderPhone()}
            avatar={this.getUserHeaderAvatar()}
            style={{ marginTop: Util.App.statusBarHeight() + Context.getSize(10) }}
            onPressBar={this.onShowAccountInfo}
            //existNotify = {this.state.existNotify}
            existNotify={this.props.isReadAllNotification}
            onPressNotify={this.onPressNotify}
            style={{
              backgroundColor: Context.getColor("primary"),
              opacity: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: Util.App.statusBarHeight() + 50,
              zIndex: 10,
              opacity: opacityHeader
            }}
          />

          <ScrollView
            ref="PTRListView"
            style={styles.scroll_container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "flex-start",
              alignItems: "center"
            }}
            refreshControl={
              <RefreshControl
                style={{ justifyContent: "center", alignItems: "center" }}
                tintColor={Context.getColor("primary")}
                progressBackgroundColor="pink"
                title={Context.getString("common_re_loading")}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])}
            onScrollEndDrag={() => this.restartAutoPlay()}
          >

            <HDLargeHeader style={{ position: 'absolute', zIndex: 0, left: 0, right: 0 }} />


            <AnimatedUserHeader
              loginByPhone={this.props.isLoginPhone}
              name={this.getUserHeaderName()}
              phone={this.getUserHeaderPhone()}
              avatar={this.getUserHeaderAvatar()}
              style={{
                marginTop: Util.App.statusBarHeight() + Context.getSize(10),
                opacity: opacityHeaderBar
              }}
              onPressBar={this.onShowAccountInfo}
              //existNotify = {this.state.existNotify}
              existNotify={this.props.isReadAllNotification}
              onPressNotify={this.onPressNotify}
            />

            {this.groupMoreContract()}

            {this.groupContract()}

            {/* {this.renderMoreWaiting()} */}

            {/* {this.renderAdjust()} */}

            {this.renderPromotions()}

            {this.renderEvents()}

            {this.renderNews()}

            {this.renderGuild()}
          </ScrollView>

          <ModalConfirm
            content={Context.getString("app_exit_question")}
            isVisible={this.state.modalExitVisible}
            onAccept={this.exitApp}
            onCancel={this.hideModalExit}
          />

          <ModalBuyTicket
            isVisible={this.state.modalBuyTicketVisible}
            pressCancelX={() => this.setState({ modalBuyTicketVisible: false })}
          />

          {this.renderModalWaiting()}

          {this.renderModalAdjust()}

          {this.renderModalRemindPay()}

        </View>
      </HandleBack>
    );
  }
}
const styles = StyleSheet.create({
  scroll_container: {
    flex: 1
  },
  container: {
    backgroundColor: Context.getColor("background"),
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  scroll_loan: {
    marginBottom: 0
  },
  scroll_loan_content: {
    paddingHorizontal: Context.getSize(16),
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Context.getSize(8)
  },
  item_container: {
    width: Context.getSize(343 - 16),
    height: Context.getSize(158)
  }
});
