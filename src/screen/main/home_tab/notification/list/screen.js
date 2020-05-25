import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { BaseScreen, Header, HDText, HDAnimatedLoading } from "component";
import NotificationItem from "./NotificationItem";
import Util from "util";
import Context from "context";
import LocalStorage from "middleware/helper/LocalStorage";
import Network from "middleware/helper/Network";

class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.page = 1;
    this.size = Util.Constant.NOTIFICATION_LIST_PAGE_SIZE;
    this.state = {
      loadingFooter: false,
      isFetching: false,
      notifyItems: [],
      isBlank: false,
      isFinishLoad: false, //Đã load hết item
      isLoading: true //First time loading screen
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.listNotifyAPI(this.page);
    }, 1000);

    if (this.props.isLogin === true || this.props.isLoginPhone === true) {
      this._navListener = this.props.navigation.addListener(
        "didFocus",
        () => this.checkExistNotifyAPI(this.props.user.uuid)
      );
    }
  }

  componentWillUnmount = () => {
    if (this._navListener) {
      this._navListener.remove();
    }
  };

  /**Hide Loading Screen */
  finishLoading = () => {
    this.setState({ isLoading: false })
  }

  /**
   * API Lấy danh sách notification
   */
  listNotifyAPI = async currPage => {
    try {
      // if (currPage == 1 && !this.state.isFetching)
      // Context.application.showLoading();

      if (currPage !== 1) this.showFooterLoading()

      const user = await LocalStorage.getUser();
      const userUuid = user ? user.customer.uuid : null;

      let result = await Network.getListNotification(
        userUuid,
        currPage,
        this.size
      );
      this.finishLoading()

      if (result !== null) {
        if (result.code === 200) {
          console.log(
            "API-GET-LIST-NOTIFICATION: " + JSON.stringify(result.payload)
          );
          if (result.payload.length > 0) {
            if (currPage == 1) {
              this.setState({
                isFinishLoad: false,
                loadingFooter: false,
                notifyItems: result.payload,
                isBlank: false
              });
            } else {
              let notifyItems = this.state.notifyItems;
              let items = notifyItems.concat(result.payload);
              this.setState({
                isFinishLoad: false,
                loadingFooter: false,
                notifyItems: items,
                isBlank: false
              });
            }
          } else {
            this.finishLoading();

            if(this.page === 1){
              this.setState({
                notifyItems: result.payload,
              })
            }
            this.setState(
              {
                isFinishLoad: true,
                loadingFooter: false,
                isBlank: this.page === 1 ? true : false
              },
              () => {
                //Set lại giá trị page hiện tại khi load không có dữ liệu
                if (this.page > 1) this.page -= 1;
              }
            );
          }
        } else {
          this.finishLoading()
          this.setState({ loadingFooter: false });
          console.log("ERROR-API-GET-LIST-NOTIFICATION: " + result.code);
          console.log(
            "ERROR-API-GET-LIST-NOTIFICATION: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      this.finishLoading()
      console.log("ERROR-API-GET-LIST-NOTIFICATION: " + err.message);
    }
  };

  /**
   * API Read Notification
   */
  readNotifyAPI = async id => {
    try {
      let result = await Network.readNotification(id);
      if (result !== null) {
        if (result.code === 200) {
          console.log("API-READ-NOTIFICATION: " + JSON.stringify(result));
        } else {
          console.log("ERROR-API-READ-NOTIFICATION: " + result.code);
          console.log(
            "ERROR-API-READ-NOTIFICATION: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-READ-NOTIFICATION-CATCH: " + err.message);
    }
  };

  readAllAPI = async () => {
    try {
      const user = await LocalStorage.getUser();
      let result = await Network.readAllNotification(user.customer.uuid);
      if (result !== null) {
        if (result.code === 200) {
          console.log("API-READ-ALL-NOTIFICATION: " + JSON.stringify(result));
          this.props.updateNotificationIcon(false);
        } else {
          console.log("ERROR-API-READ-ALL-NOTIFICATION: " + result.code);
          console.log(
            "ERROR-API-READ-ALL-NOTIFICATION: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-READ-ALL-NOTIFICATION: " + err.message);
    }
  };

  /**Show Footer Loading */
  showFooterLoading = () => {
    this.setState({ loadingFooter: true })
  }

  /**
   * Load danh sách phân trang
   */
  handleLoadMore = () => {
   
    const { isFinishLoad } = this.state;
    if (!isFinishLoad) {
      if (!this.state.loadingFooter) {
        this.page = this.page + 1;
        this.listNotifyAPI(this.page);
      }
    }
  };

  renderContent = () => {
    const { notifyItems, isBlank } = this.state;
    if (notifyItems.length > 0) {
      return (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[Context.getColor("accent2")]}
              refreshing={this.state.isFetching}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.list}
          data={notifyItems}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore}
        />
      );
    } else {
      if (isBlank) {
        return (
          <View style={styles.blank_container}>
            <HDText style={styles.blank_status}>
              {Context.getString("common_warning_no_notification")}
            </HDText>
          </View>
        );
      } else {
        return null;
      }
    }
  };

  renderFooter = () => {
    if (!this.state.loadingFooter) return null;
    return (
      <ActivityIndicator size="small" color={Context.getColor("primary")} />
    );
  };

  /**
   * Refresh List Notification
   */
  onRefresh = async () => {
    this.page = 1;
    await this.setState({
      isFetching: true,
      isBlank: false,
      isFinishLoad: false,
    });
    await this.listNotifyAPI(this.page);
    this.setState({ isFetching: false });
  };

  /**
   * Get Swipeable Status when user Login or not login
   */
  getSwipeableStatus = () => {
    const { isLogin, isLoginPhone } = this.props;
    if (isLogin || isLoginPhone) {
      return true;
    } else {
      return false;
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <NotificationItem
        data={item}
        index={index}
        isSwipeable={this.getSwipeableStatus()}
        onDeletePress={this.onDeleteItem}
        onItemPress={this.onPressItem}
      />
    );
  };

  /**
   * Press item notification
   * @function onPressItem
   * @param  {} item
   * @param  {} index
   */
  onPressItem = (item, index) => {
    let { notifyItems } = this.state;
    const { isLogin, isLoginPhone } = this.props;

    // console.log("PROPS LA ",this.props)

    console.log("onPressItem: " + JSON.stringify(item));

    if (isLogin || isLoginPhone) {
      this.readNotifyAPI(item.id);
      notifyItems[index].isRead = 1;
      this.setState({
        notifyItems: notifyItems
      });
    }

    switch (item.type) {
      case Util.Constant.NOTIFICATION_TYPE.NEWS:
        this.props.navigation.navigate("PromotionDetail", {
          id: item.newsId,
          type: Util.Constant.TYPE_WEB_DETAIL.NEW
        });
        break;
      case Util.Constant.NOTIFICATION_TYPE.EVENT:
        this.props.navigation.navigate("PromotionDetail", {
          id: item.newsId,
          type: Util.Constant.TYPE_WEB_DETAIL.EVENT
        });
        break;
      case Util.Constant.NOTIFICATION_TYPE.PROMO:
        this.props.navigation.navigate("PromotionDetail", {
          id: item.promotionId,
          type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION
        });
        break;
      case Util.Constant.NOTIFICATION_TYPE.REMIND_PAY:
        if (isLogin) {
          this.props.navigation.navigate("LoanDetailLoan",{
            navData:{
              contractCode: item.contractCode
            }
          });
        }
        break;
    }
  };

  onDeleteItem = async (item, index) => {
    console.log("onDeleteItem: " + JSON.stringify(item));
    try {
      let result = await Network.deleteNotification(item.id);
      if (result !== null) {
        if (result.code === 200) {
          console.log(
            "API-DELETE-NOTIFICATION-COMPLETE: " +
              JSON.stringify(result.payload)
          );
          var items = this.state.notifyItems;
          const itemDelete = items.splice(index, 1);
          console.log(items.length);
          this.setState({
            ...this.state,
            notifyItems: items,
            isBlank: items.length === 0  ? true : false
          });
        } else {
          console.log("ERROR-API-DELETE-NOTIFICATION: " + result.code);
          console.log(
            "ERROR-API-DELETE-NOTIFICATION: " +
              Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-DELETE-NOTIFICATION: " + err.message);
    }
    ////
  };

  /**
   * Event Read All
   */
  onReadAll = () => {
    const { notifyItems } = this.state;
    if (notifyItems.length > 0) {
      notifyItems.forEach(item => {
        item.isRead = 1;
      });
      this.setState({ notifyItems: notifyItems });
      this.readAllAPI();
    }
  };

  showReadAll = () => {
    const { isLogin, isLoginPhone } = this.props;
    if (isLogin || isLoginPhone) {
      return Context.getImage("readAllNotification");
    } else {
      return null;
    }
  };

  /**
   * API CHECK EXIST NOTIFICATION
   */
  checkExistNotifyAPI = async customerUuid => {
    try {
      const result = await Network.checkReadAllNotification(customerUuid);
      if (result != null) {
        if (result.code === 200) {
          console.log("API-CHECK-READ-ALL-NOTIFY-COMPLETE: ", result)
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
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("home_tab_notification_list_nav")}
          navigation={this.props.navigation}
          rightIcon={this.showReadAll()}
          rightOnPress={this.onReadAll}
        />
        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      </View>
    )
  }

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("home_tab_notification_list_nav")}
          navigation={this.props.navigation}
          rightIcon={this.showReadAll()}
          rightOnPress={this.onReadAll}
        />
        {this.renderContent()}
      </View>
    );
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
export default Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  list: { flex: 1, width: "100%" },
  listContent: {
    paddingVertical: 16
  },
  blank_container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: "transparent"
  },
  blank_status: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getString(19),
    fontWeight: "bold",
    color: Context.getColor("textStatus"),
    textAlign: "center"
  }
});
