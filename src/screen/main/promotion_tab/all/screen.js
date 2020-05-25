import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image
} from "react-native";
import { BaseScreen, HDText, HDAnimatedLoading } from "component";
import PromotionItem from "../component/PromotionItem";
import CategoryView from "../component/CategoryView";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      items: [],
      type: "",
      isLoading: true,
      currentTabIndex: this.props.currentTabIndex
    };
  }

  /**
   * <Function: add listener so when you comback can call function again>
   */
  componentDidMount = async () => {
    // Context.application.showLoading();
    this.setState({ isLoading: true });
    setTimeout(async () => {
      await this.getDataFromAPI();
      // Context.application.hideLoading();
      this.setState({ isLoading: false });
    }, 1000);

    // this._navListener = this.props.navigation.addListener(
    //   "didFocus",
    //   async payload => {
    //     await this.getDataFromAPI();
    //   }
    // );
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentTabIndex !== prevProps.currentTabIndex) {
      if (this.state.items.length === 0) {        
        this.getDataFromAPI();
      }
    }
  }

  /**
   * <Function: check props.tab>
   */
  getDataFromAPI = async () => {
    if (this.props.tab === 1) {
      try {
        let result = await Network.promotionGeneral(0);
        if (result.code === 200) {
          this.setState({
            items: result.payload
          });
        }
        // this.setState({
        //   isLoading: false
        // });
      } catch (error) {
        console.log("ERROR: " + JSON.stringify(error));
      }
    } else if (this.props.user !== null) {
      try {
        let result = await Network.promotionIndividual(
          this.props.user.uuid,
          0,
          2
        );
        console.log("RESULT PROMOTION LOGGED" + JSON.stringify(result));
        if (result.code === 200) {
          this.setState({
            items: result.payload
          });
        }
        // this.setState({
        //   isLoading: false
        // });
      } catch (error) {
        console.log("ERROR: " + JSON.stringify(error));
      }
    }
  };

  /**
   * <Function: refresh new data from api>
   */
  _onRefresh = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        await this.getDataFromAPI();
        this.setState({ isFetching: false });
      }
    );
  };

  /**
   * <Function: render item for list>
   * @param items data to render
   */
  renderContent = items => {
    if (items.length !== 0) {
      return this.state.isLoading ? (
        this.showLoading()
      ) : (
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={this._renderHeader}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                tintColor={Context.getColor("primary")}
                title={Context.getString("common_re_loading")}
                onRefresh={this._onRefresh}
              />
            }
            style={styles.list}
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={this._renderItem}
            contentContainerStyle={styles.listContent}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    } else if (this.state.isLoading === false) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", backgroundColor: "#F3F5F6" }}
        >
          <Image
            source={Context.getImage("img_null_Loading")}
            style={styles.imgNull}
          />
          <HDText style={styles.noData}>
            {Context.getString("promotion_tab_all_no_data")}
          </HDText>
        </View>
      );
    }
  };

  /**
   * <Function: render screen>
   */
  render() {
    //console.log("currentTabIndex la", this.state.currentTabIndex)
    const { items, isLoading } = this.state;
    if (isLoading) {
      return <HDAnimatedLoading style={{ flex: 1, height: "100%" }} />;
    } else {
      return <View style={{ flex: 1 }}>{this.renderContent(items)}</View>;
    }
  }
  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.setState({ isFetching: false });
    });
  };
  _renderHeader = () => {
    return <CategoryView onCategoryPress={this._onCategoryPress} />;
  };
  _renderItem = ({ item, index }) => {
    if (this.state.type === Util.Constant.LOAN_TYPE.CL) {
      if (
        item.type === this.state.type ||
        item.type === Util.Constant.LOAN_TYPE.CLO
      ) {
        return (
          <PromotionItem
            data={item}
            index={index}
            onItemPress={this.onPressItem}
          />
        );
      }
    } else {
      if (item.type === this.state.type || this.state.type === "") {
        return (
          <PromotionItem
            data={item}
            index={index}
            onItemPress={this.onPressItem}
          />
        );
      }
    }
  };
  onPressItem = (item, index) => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION
    });
  };
  _onCategoryPress = category => {
    this.setState({
      type: category.type
    });
  };
  showLoading = () => {
    return <HDText style={styles.textLoading}>Đang tải...</HDText>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerWithoutLogin: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Context.getSize(20)
  },
  textTitle: {
    textAlign: "center",
    marginTop: Context.getSize(16),
    fontWeight: "bold",
    fontSize: Context.getSize(16)
  },
  textContent: {
    textAlign: "center",
    marginTop: Context.getSize(16),
    fontSize: Context.getSize(14)
  },
  list: { flex: 1, width: "100%" },
  listContent: {
    alignItems: "center"
  },
  space: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Context.getSize(32)
  },
  buttonLogin: {
    flex: 1,
    marginBottom: Context.getSize(16)
  },
  textLoading: {
    alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100%"
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: Context.getSize(24),
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(19),
    fontWeight: "bold",
    color: Context.getColor("textStatus")
  },
  imgNull: {
    width: Context.getWindow().width,
    height: Context.getSize(252),
    resizeMode: "contain",
    marginTop: Context.getSize(25)
  }
});
