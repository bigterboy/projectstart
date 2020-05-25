import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import {
  BaseScreen,
  Header,
  HDGroupHeader,
  HDContractList,
  HDContractListItem,
  HDLoanView,
  HDOffersList,
  ButtonImage,
  ModalMenu,
  ModalBuyTicket,
  HDText,
  HDButton,
  HDAnimatedLoading
} from "component";
import Context from "context";
import Util from "util";
import Network from "middleware/helper/Network";


export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      waiting: [],
      due: [],
      current: null,
      waitingComplete: false,
      dueComplete: false,
      currentComplete: false,
      promotions: [],
      isLoanEmpty: false,
      modalMenuVisible: false,
      modalBuyTicketVisible: false,
      menuPosition: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      isClickAddMoreLoan: false,
      isLoading: true
    };
  }

  componentDidUpdate() { }

  componentDidMount = async () => {
    const { isLogin, isLoginPhone } = this.props;
    this._navListener = this.props.navigation.addListener(
      "didFocus",
      payload => {
        if (isLogin) {
          console.log("FUNCTION WHEN COMBACK NAVIGATION: LOAN TAB: ");

          this.setState({ isLoading: true })

          //call api again to update screen
          this.contractListAPI();
          if (this.state.isClickAddMoreLoan) {
            this.setState({
              isClickAddMoreLoan: false
            });
          }
        }
      }
    );
  };

  componentWillUnmount = () => {
    console.log("componentWillUnmount TAB LOAN");
    if (this._navListener) {
      this._navListener.remove();
    }
  };

  //Get ContractList API
  contractListAPI = async () => {
    try {
      // Context.application.showLoading();
      const result = await Network.contractList(this.props.user.uuid);
      // Context.application.hideLoading();
      this.setState({ isLoading: false })
      if (result != null) {
        if (result.code === 200) {
          console.log("API-CONTRACT-LIST-COMPLETE: " + result.code);
          if (result.payload != null) {
            this.getWaiting(result.payload);
            this.getDue(result.payload);
            this.getCurrent(result.payload);
          } else {
            this.setState({
              ...this.state,
              isLoanEmpty: true
            });
          }
        } else {
          console.log("ERROR-API-CONTRACT-LIST: " + result.code);
          console.log(
            "ERROR-API-CONTRACT-LIST: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-CONTRACT-LIST: " + err.message);
      Context.application.hideLoading();
    }
  };

  //Get Promotion List
  promotionAPI = async () => {
    try {
      // Context.application.showLoading();
      const result = await Network.promotionIndividual(
        this.props.user.uuid,
        5,
        0
      );
      // Context.application.hideLoading();
      if (result != null) {
        if (result.code === 200) {
          if (result.payload != null) {
            this.setState({
              promotions: result.payload
            });
          }
        } else {
          console.log("ERROR-API-PROMOTION-LIST: " + result.code);
          console.log(
            "ERROR-API-PROMOTION-LIST: " +
            Network.getMessageFromCode(result.code)
          );
          // Context.application.showModalError(
          //   Network.getMessageFromCode(result.code)
          // )
        }
      }
    } catch (err) {
      console.log("ERROR-API-PROMOTION-LIST: " + err.message);
      Context.application.hideLoading();
      // Context.application.showModalError(
      //   Network.getMessageFromCode(result.code)
      // )
    }
  };

  /**
   * Check time available For Sign
   */
  availableSignAPI = async item => {
    try {
      const result = await Network.esignAvailabeSign();
      if (result != null) {
        if (result.code === 200) {
          console.log("API-AVAILABLE-SIGN: " + JSON.stringify(result));
          if (result.payload != null) {
            if (result.payload.result == 0) {
              Context.application.showModalAlert(
                Util.String.format(
                  Context.getString("common_warning_time_up_sign_esign"),
                  result.payload.esignFrom,
                  result.payload.esignTo
                ),
                false
              );
            } else if (result.payload.result == 1) {
              this.props.navigation.navigate("LoanESign", {
                navData: item
              });
            }
          } else {
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

  //Get waiting contract
  getWaiting = data => {
    const filterWaiting = data.filter(item => {
      return item.code == Util.Constant.contractType.CONTRACT_PRINTING;
      // return item.code == "MATURED"
    });

    if (filterWaiting) {
      if (filterWaiting.length > 0) {
        const data = filterWaiting[0].data;
        this.setState({
          ...this.state,
          waiting: data,
          waitingComplete: true,
          isLoanEmpty: false
        });
      } else {
        this.setState(
          {
            ...this.state,
            waiting: [],
            waitingComplete: true
          },
          () => {
            this.checkLoanEmpty();
          }
        );
      }
    }
  };

  //Get Due Contract
  getDue = data => {
    const filterDue = data.filter(item => {
      return item.code == Util.Constant.contractType.DUE;
      // return item.code == "MATURED"
    });

    if (filterDue) {
      if (filterDue.length > 0) {
        const data = filterDue[0].data;
        // var due = null;
        // if (data.length > 0) {
        //   due = data[data.length - 1];
        // }

        this.setState({
          ...this.state,
          due: data,
          dueComplete: true,
          isLoanEmpty: false
        });
      } else {
        this.setState(
          {
            ...this.state,
            due: [],
            dueComplete: true
          },
          () => {
            this.checkLoanEmpty();
          }
        );
      }
    }
  };

  //Get Current Contract
  getCurrent = data => {
    const filterCurrent = data.filter(item => {
      return item.code == Util.Constant.contractType.LIVE;
      // return item.code == "MATURED"
    });

    if (filterCurrent) {
      if (filterCurrent.length > 0) {
        const data = filterCurrent[filterCurrent.length - 1].data;
        var current = null;
        if (data.length > 0) {
          current = data[data.length - 1];
        }

        this.setState({
          ...this.state,
          current: current,
          currentComplete: true,
          isLoanEmpty: false
        });
      } else {
        this.setState(
          {
            ...this.state,
            current: null,
            currentComplete: true
          },
          () => {
            this.checkLoanEmpty();
          }
        );
      }
    }
  };

  //Check for show promotion and Loans Type if no contracts
  checkLoanEmpty = () => {
    const {
      waiting,
      due,
      current,
      waitingComplete,
      dueComplete,
      currentComplete
    } = this.state;

    if (waitingComplete && dueComplete && currentComplete) {
      if (waiting.length == 0 && due.length == 0 && current === null) {
        this.setState(
          {
            isLoanEmpty: true
          },
          () => {
            this.promotionAPI();
          }
        );
      }
    }
  };

  onPressRegNow = () => {
    this.props.navigation.navigate("LoanESign");
  };

  onShowDetail = item => {
    this.props.navigation.navigate("LoanDetailLoan", {
      navData: item
    });
  };

  //Show Guild Payment
  onShowGuild = () => {
    //this.props.navigation.navigate("GuildPayment");
    this.props.navigation.navigate("GuildPayment");

    // this.props.navigation.navigate("PromotionDetail", {
    //   type: Util.Constant.WEB_STATIC.STATIC,
    // });
  };

  onShowEsign = item => {
    this.availableSignAPI(item);
  };

  onPressQuickMenu = () => {
    this.setState({
      ...this.state,
      modalMenuVisible: true
    });
  };

  /**
   * Danh sách hợp đồng hiện tại
   */
  viewCurrentContracts = () => {
    this.props.navigation.navigate("LoanCurrentContract", {
      showGuildDelete: false
    });
  };

  /**
   * Danh sách hợp đồng đợi ký
   */
  viewWaitContracts = () => {
    this.props.navigation.navigate("ContractWaiting", {
      navData: {
        navTitle: Context.getString("home_tab_contract_waiting_nav"),
        signType: Util.Constant.LIST_CONTRACT_TYPE.ESIGN
      }
    });
  };

  //Select Loan Type
  onSelectLoan = (item, index) => {
    if (index === 2) {
      this.showModalTicket();
    } else if (index === 0) {
      this.props.navigation.navigate("LoanRegister", {});
    } else if (index === 1) {
      this.props.navigation.navigate("LoanRegisterOther", {});
    }
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

  onShowPromoDetail = item => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION,
    });
  };

  //Render promotions if no contracts
  renderIfEmpty = () => {
    if (this.state.isLoanEmpty) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: "100%" }}>
            <HDText style={styles.status_empty_text}>
              {Context.getString("loan_tab_manager_loan_empty_status")}
            </HDText>
          </View>

          <HDLoanView
            style={styles.loan_container}
            onPressItem={this.onSelectLoan}
          />

          {this.renderPromo()}
        </View>
      );
    }
    // return null
  };

  //render Promotions
  renderPromo() {
    const { promotions } = this.state;
    if (promotions.length > 0) {
      return (
        <View style={{ width: "100%" }}>
          <HDGroupHeader
            leftTitle={Context.getString("home_tab_group_header_promotion")}
            rightTitle={Context.getString("common_view_all")}
            onPressRight={() =>
              this.props.navigation.navigate("MainPromotionTab")
            }
          />

          <HDOffersList
            items={this.state.promotions}
            onPressItem={this.onShowPromoDetail}
          ></HDOffersList>
        </View>
      );
    }
  }

  renderWaiting = () => {
    const { waiting } = this.state;
    if (waiting.length > 0) {
      return (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: Context.getSize(8)
          }}
        >
          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_manager_loan_waiting")}
            rightTitle={Context.getString("common_view_all")}
            onPressRight={this.viewWaitContracts}
            style={{ marginBottom: Context.getSize(8) }}
          />

          <HDContractList
            items={waiting}
            isShowPagination={false}
            cellType={0}
            onPressSubButton={this.onShowEsign}
          />
        </View>
      );
    }
    return null;
  };

  renderDue = () => {
    const { due } = this.state;
    if (due.length > 0) {
      return (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: Context.getSize(8)
          }}
        >
          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_manager_loan_due")}
            style={{
              // marginTop: Context.getSize(24),
              marginBottom: Context.getSize(8)
            }}
          />
          {/* <HDContractListItem
            item={this.state.due}
            cellType={4}
            sHorizontal={false}
            onPressMaster={this.onShowDetail}
            onPressItem={this.onShowGuild}
            style={styles.item_container}
            isShadow
          /> */}

          <HDContractList
            items={this.state.due}
            isShowPagination={false}
            cellType={4}
            onPressMaterItem={this.onShowDetail}
            onPressSubButton={this.onShowGuild}
          />
        </View>
      );
    }
    return null;
  };

  renderCurrent = () => {
    if (this.state.current) {
      return (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <HDGroupHeader
            leftTitle={Context.getString("loan_tab_manager_loan_current")}
            rightTitle={Context.getString("common_view_all")}
            onPressRight={this.viewCurrentContracts}
            style={{ marginBottom: Context.getSize(8) }}
          />
          <HDContractListItem
            item={this.state.current}
            cellType={4}
            sHorizontal={false}
            onPressMaster={this.onShowDetail}
            onPressItem={this.onShowGuild}
            style={styles.item_container}
            isShadow
          />
        </View>
      );
    }
    return null;
  };

  renderLoans = () => {
    if (!this.state.isLoanEmpty) {
      return (
        <ScrollView
          ref={ref => (this.scroll = ref)}
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
        >
          {this.renderWaiting()}

          {this.renderDue()}

          {this.renderCurrent()}
        </ScrollView>
      );
    }
    // return null
  };

  menuBackdrop = () => {
    win = Context.getWindow();
    width = win.width;
    height = win.height;
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: height,
          width: width,
          backgroundColor: "black",
          opacity: 0.7
        }}
      ></View>
    );
  };

  _onLayoutMenu = ({
    nativeEvent: {
      layout: { x, y, width, height }
    }
  }) => {
    this.setState({
      menuPosition: {
        x: x,
        y: y,
        width: width,
        height: height
      }
    });
  };

  renderQuickMenu = () => {
    if (!this.state.modalMenuVisible && !this.state.isClickAddMoreLoan) {
      return (
        <ButtonImage
          ref={ref => (this.quickMenu = ref)}
          onLayout={this._onLayoutMenu}
          iconSource={Context.getImage("menuPlus")}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: Context.getSize(48),
            height: Context.getSize(48),
            borderRadius: Context.getSize(48 / 2),
            backgroundColor: Context.getColor("accent2")
          }}
          iconStyle={{
            width: Context.getSize(16),
            height: Context.getSize(16)
          }}
          isShadow
          onPress={this.onPressQuickMenu}
        />
      );
    }
    return null;
  };

  onPressAddButtonLoan = () => {
    this.setState({ modalMenuVisible: false });
    this.props.navigation.navigate("LoanAddInfo");
    this.setState({
      isClickAddMoreLoan: true
    });
  };

  /**
   * Event Press Sign up when login by phone
   */
  onPressSignUp = () => {
    this.props.navigation.navigate("AuthFlow");
  };

  renderWithLogin = () => {
    const { isLoading } = this.state
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Header title={Context.getString("loan_tab_manager_loan_nav")} />
          <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
        </View>
      )
    }

    return (
      <View style={styles.container} >
        <Header title={Context.getString("loan_tab_manager_loan_nav")} />

        {this.renderLoans()}
        {this.renderIfEmpty()}
        {this.renderQuickMenu()}

        <ModalMenu
          isVisible={this.state.modalMenuVisible}
          menuPosition={this.state.menuPosition}
          onPressItem={() => this.onPressAddButtonLoan()}
          onPressClose={() => this.setState({ modalMenuVisible: false })}
        />

        <ModalBuyTicket
          isVisible={this.state.modalBuyTicketVisible}
          pressCancelX={this.hideModalTicket}
        />

      </View>
    );
  };

  renderWithLoginPhone = () => {
    return (
      <View style={styles.container}>
        <Header title={Context.getString("loan_tab_manager_loan_nav")} />

        <View style={styles.login_phone_container}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={Context.getImage("loanLoginPhone")}
              style={styles.login_phone_image}
              resizeMode="contain"
            />

            <HDText style={styles.login_phone_title}>
              {Context.getString("loan_tab_login_phone_can_not_use_title")}
            </HDText>
            <HDText style={styles.login_phone_message}>
              {Context.getString("loan_tab_login_phone_can_not_use_message")}
            </HDText>
          </View>

          <View style={styles.login_phone_button}>
            <HDButton
              title={Context.getString("loan_tab_login_phone_button_sign_up")}
              isShadow
              onPress={this.onPressSignUp}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { isLogin } = this.props;
    if (isLogin) {
      return this.renderWithLogin();
    } else {
      return this.renderWithLoginPhone();
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("#7F7F7F")
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Context.getSize(8),
    paddingBottom: Context.getSize(32)
  },
  item_container: {
    width: Context.getSize(343),
    height: Context.getSize(158)
  },
  status_empty_text: {
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    lineHeight: 19,
    color: Context.getColor("textStatus"),
    marginTop: Context.getSize(24),
    marginBottom: Context.getSize(16),
    paddingHorizontal: Context.getSize(16)
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  loan_container: {
    marginBottom: Context.getSize(16)
  },

  login_phone_container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 49
  },
  login_phone_image: {
    width: Context.getSize(265),
    height: Context.getSize(230),
    marginBottom: 24
  },
  login_phone_title: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(19),
    fontWeight: "bold",
    marginBottom: 8,
    color: Context.getColor("textStatus")
  },
  login_phone_message: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: "400",
    textAlign: "center",
    color: Context.getColor("textStatus")
  },
  login_phone_button: {
    width: "100%",
    paddingHorizontal: 16
  }
});
