import React from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { BaseScreen, Header, HDAnimatedLoading } from "component";
import NewsItem from "./NewsItem";
import EventItem from "./EventItem";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import Util from "util";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      type: null,
      headerTitle: null,
      news: [],
      isLoading: true
    };
  }

  componentDidMount = async () => {
    await this.getDataFromNav()
    this.getTitleHeader()
    setTimeout(async () => {
      await this.newsAPI()
      this.finishLoading()
    }, 1000);
  };

  componentWillUnmount() {
  }

  finishLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  getDataFromNav = () => {
    this.setState({
      type: this.props.navigation.getParam("type")
    });
  };

  getTitleHeader = () => {
    if(this.state.type === Util.Constant.TYPE_WEB_DETAIL.EVENT){
      this.setState({
        headerTitle: Context.getString("home_tab_group_header_event")
      });
    }else if(this.state.type === Util.Constant.TYPE_WEB_DETAIL.NEW){
      this.setState({
        headerTitle: Context.getString("home_tab_news_list_nav")
      });
    }
  };

  //News (Tin tức)
  newsAPI = async () => {
    try {
      let result = null;
      if (this.props.isLogin) {
        if (this.state.type === Util.Constant.TYPE_WEB_DETAIL.EVENT) {
          result = await Network.newHomeLogged(this.props.user.uuid, 0, 0, 1);
        } else if (this.state.type === Util.Constant.TYPE_WEB_DETAIL.NEW) {
          result = await Network.newHomeLogged(this.props.user.uuid, 0, 0, 2);
        }
      } else {
        if (this.state.type === Util.Constant.TYPE_WEB_DETAIL.EVENT) {
          result = await Network.newHome(0, 1);
        } else if (this.state.type === Util.Constant.TYPE_WEB_DETAIL.NEW) {
          result = await Network.newHome(0, 2);
        }
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
      console.log("ERROR-API-NEWS: " + err.message);
    }
    //Context.application.hideLoading();
  };

  _onRefresh = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        await this.newsAPI();
        this.setState({ isFetching: false });
      }
    );
  };

  renderContent = () => {
    const {news } = this.state;
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[Context.getColor("accent2")]}
            refreshing={this.state.isFetching}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.list}
        data={news}
        keyExtractor={item => item.id}
        renderItem={this._renderItem}
        //bounces={false}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
      />
    );
  };
  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.setState({ isFetching: false });
    });
  };

  _listItem = (item, index) => {
    switch (this.state.type) {
      case Util.Constant.TYPE_WEB_DETAIL.EVENT:
        return (
          <EventItem
            data={item}
            index={index}
            onItemPress={this.onPressItem}
          />
        );
      case Util.Constant.TYPE_WEB_DETAIL.NEW:
        return (
          <NewsItem
            data={item}
            index={index}
            onItemPress={this.onPressItem}
          />
        );
    }
  };

  _renderItem = ({ item, index }) => {
    return this._listItem(item, index);
  };

  onPressItem = (item, index) => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: this.state.type
    });
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.headerTitle}
          navigation={this.props.navigation}
        />
        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      </View>
    );
  }

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.headerTitle}
          navigation={this.props.navigation}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  list: { flex: 1, width: "100%" },
  listContent: {
    paddingBottom: 16
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
  }
});
