import React from "react";
import { StyleSheet, View, Share } from "react-native";
import {
  BaseScreen,
  Header,
  HDButton,
  HDWebView,
  HDAnimatedLoading
} from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";
const iconShare = Context.getImage("share");

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    /*
     * @param content Content for introduction payment
     */
    this.state = {
      bannerImage: null,
      title: "",
      content: "",
      item: [],
      navTitle: "",
      isShowButton: false, // ==> chuyển thành true khi muốn button chỗ có chỗ không
      height: 0,
      linkShare: null,
      isShowRightIcon: false,
      isLoading: true,
      type: this.props.navigation.getParam("type", "default value"),
      id: this.props.navigation.getParam("id", "default value")
    };
  }

  /**
   * <Function: get value and content from other screen >
   */
  componentDidMount = () => {
    this.setNavTitle();
  };

  componentWillUnmount = () => {
    // //Clean data screen redux
    this.props.cleanData();
  };

  finishLoading = () => {
    this.setState({ isLoading: false });
  };

  setNavTitle = async () => {
    console.log("VO DAY: ",this.state.type)


    switch (this.state.type) {
      case Util.Constant.TYPE_WEB_DETAIL.PROMOTION:
        this.setState({
          navTitle: Context.getString("promotion_tab_promotion_detail_nav")
        });
        break;

      case Util.Constant.TYPE_WEB_DETAIL.EVENT:
        this.setState({
          navTitle: Context.getString(
            "promotion_tab_promotion_detail_event_nav"
          )
        });
        break;
      case Util.Constant.TYPE_WEB_DETAIL.NEW:
        this.setState({
          navTitle: Context.getString("home_tab_group_header_news")
        });
        break;
      default:
        return;
    }

    this.detailAPI();
  };

  /*
   * <Function: get content from api>
   * Notice: get API DEPENT on what kind of type title: type: promotion, news, ...
   */
  detailAPI = async () => {
    setTimeout(async () => {
      try {
        let result = null;
        if (this.props.isLogin) {
          switch (this.state.type) {
            case Util.Constant.TYPE_WEB_DETAIL.PROMOTION:
              result = await Network.promotionDetailIndividual(this.state.id);
              break;
            case Util.Constant.TYPE_WEB_DETAIL.EVENT:
              result = await Network.newDetail(this.state.id);
              break;
            case Util.Constant.TYPE_WEB_DETAIL.NEW:
              result = await Network.newDetail(this.state.id);
              break;
            default:
              return;
          }
        } else {
          switch (this.state.type) {
            case Util.Constant.TYPE_WEB_DETAIL.PROMOTION:
              result = await Network.promotionDetailGeneral(this.state.id);
              break;
            case Util.Constant.TYPE_WEB_DETAIL.EVENT:
              result = await Network.newDetailGeneral(this.state.id);
              break;
            case Util.Constant.TYPE_WEB_DETAIL.NEW:
              result = await Network.newDetailGeneral(this.state.id);
              break;
            default:
              return;
          }
        }
        if (result != null) {
          if (result.code === 200) {
            if (result.payload != null) {
              await this.setState({
                item: result.payload,
                title: result.payload.title,
                content: result.payload.content,
                bannerImage: result.payload.imagePath,
                isShowButton: result.payload.validRegister
                  ? result.payload.validRegister
                  : false
              });
              if (result.payload.linkShare) {
                await this.setState({
                  linkShare: result.payload.linkShare,
                  isShowRightIcon: true
                });
              }
            }
          } else {
            console.log("ERROR-API-PROMOTION-DETAIL: " + result.code);
            console.log(
              "ERROR-API-PROMOTION-DETAIL: " +
                Network.getMessageFromCode(result.code)
            );
            if (result.code === 1117) {
              Context.application.showModalAlert(
                Context.getString("common_error_promotion_not_exist"),
                false,
                () => {
                  this.props.navigation.goBack();
                }
              );
            } else if (result.code === 1306) {
              Context.application.showModalAlert(
                Context.getString("common_error_new_not_exist"),
                false,
                () => {
                  this.props.navigation.goBack();
                }
              );
            }
          }
        }
      } catch (err) {
        console.log(JSON.stringify(err));
        console.log("ERROR-API-PROMOTION-DETAIL " + err.message);
        Context.application.showModalAlert(
          Context.getString("common_error_try_again"),
          false,
          () => {
            this.props.navigation.goBack();
          }
        );
      }

      this.finishLoading();
    }, 1000);
  };

  /*
   * <Function: click share button and share the link>
   *
   */
  onPressShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.linkShare,
        title: this.state.navTitle
      });
    } catch (error) {
      alert(error.message);
    }
  };

  /*
   * <Function: function for pressing button confirm to navigation different scrren>
   *
   * Notice: just using for screen promotion
   *
   */
  onPressNavigateToRegisterLoan = () => {
    this.props.navigation.navigate("LoanFillInforBeforConf", {
      navTitle: Context.getString("promotion_tab_promotion_register_nav"),
      itemPromotion: this.state.item
    });
  };

  /*
   * <Function: render button depent on what kind of screen>
   * Notice: just only render button in promotion screen
   */
  renderButton = () => {
    if (this.state.isShowButton === false) {
      return null;
    } else {
      return (
        <View style={styles.bottom_button_container}>
          <HDButton
            title={Context.getString("promotion_tab_promotion_detail_reg_now")}
            isShadow={true}
            onPress={this.onPressNavigateToRegisterLoan}
          />
        </View>
      );
    }
  };

  /**
   * <Function: Back To Previous Screen>
   */
  backToPrevious = () => {
    //Back button
    this.props.navigation.pop();
  };

  renderWebView = () => {
    if (!this.state.isLoading) {
      return (
        <HDWebView
          isShowButton={this.state.isShowButton}
          content={this.state.content}
          title={this.state.title}
          bannerImage={this.state.bannerImage}
        />
      );
    }
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.navTitle}
          navigation={this.props.navigation}
          rightIcon={iconShare}
          rightOnPress={this.state.isShowRightIcon ? this.onPressShare : null}
          isShowRightIcon={this.state.isShowRightIcon}
          leftOnPress={this.backToPrevious}
        />

        <HDAnimatedLoading style={{ flex: 1, height: "100%" }} />
      </View>
    );
  };

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.navTitle}
          navigation={this.props.navigation}
          rightIcon={iconShare}
          rightOnPress={this.state.isShowRightIcon ? this.onPressShare : null}
          isShowRightIcon={this.state.isShowRightIcon}
          leftOnPress={this.backToPrevious}
        />
        {this.renderWebView()}
        {this.renderButton()}
      </View>
    );
  };

  /*
   * <Function: render screen>
   */
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return this.renderLoading();
    } else {
      return this.renderWithoutLoading();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  banner_container: {
    width: "100%",
    height: Context.getSize(250),
    position: "absolute",
    zIndex: 0
  },
  content_container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  top_container: {
    width: "100%",
    height: Context.getSize(200)
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Context.getSize(82)
  },
  bottom_button_container: {
    //width: (359 / 375) * Dimensions.get('window').width,
    width: "95.73%",
    bottom: 0,
    alignSelf: "center",
    paddingHorizontal: Context.getSize(16),
    paddingTop: Context.getSize(8),
    paddingBottom: Context.getSize(16),
    backgroundColor: "white"
  },
  spaceBackBottomGroundButton: {
    position: "absolute",
    zIndex: -2,
    margin: "auto",
    //width: (359 / 375) * Dimensions.get('window').width,
    width: "95.73%",
    alignSelf: "center",
    bottom: 0,
    height: Context.getWindow().height,
    backgroundColor: "white"
  },
  title: {
    color: "#000",
    fontSize: Context.getSize(18),
    fontWeight: "bold",
    marginHorizontal: Context.getSize(16),
    marginBottom: Context.getSize(8),
    marginTop: Context.getSize(16),
    lineHeight: 26
  },
  textTitleWebView: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0.2,
    borderColor: "transparent"
  }
});

