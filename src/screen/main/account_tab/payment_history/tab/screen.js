import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { BaseScreen, Header, HDText } from "component";
import Context from "context";
import { TabView, TabBar } from "react-native-tab-view";
import TabLoan from "../loan";
import TabCard from "../card";

/**
 * <Function: use for waiting loading>
 * @param route title of tab.
 */
const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <HDText>Loading {route.title}…</HDText>
  </View>
);
export default class Screen extends BaseScreen {
  /**
   * <Function: constructor>
   * @param index index for tab
   * @param routes value for tab
   */
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "TabLoan", title: "Khoản vay" },
        { key: "TabCard", title: "Thẻ" }
      ]
    };
  }

  /**
   * <Function: use for open modal filtẻ>
   */
  rightOnPress = () => {
    this.props.showFilter();
  };
  componentDidUpdate() {}

  /**
   * <Function: add addListerner so that when comeback can call function what ever you want>
   */
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ ...this.state, isFocused: true });
    });
  }

  /**
   * <Function: destroy addListener>
   */
  componentWillUnmount() {
    this.focusListener.remove();
  }

  /**
   * <Function: render tab>
   * @param tabProps array value of tab
   */
  getTabView(tabProps) {
    return (
      <TabBar
        {...tabProps}
        pressColor="#999999"
        renderLabel={props => this.getLabelOfTab(props, tabProps)}
        indicatorStyle={styles.indicator}
        style={styles.tab}
      />
    );
  }

  /**
   * <Function: use for change color when you select tab>
   * @param props from parent.
   * @param tabProps from
   */
  getLabelOfTab(props, tabProps) {
    let { route } = props;
    let styleColorText;

    if (route.key === tabProps.navigationState.routes[this.state.index].key)
      styleColorText = {
        color: Context.getColor("textBlue1")
      };
    else styleColorText = { color: Context.getColor("hint") };
    return (
      <HDText style={[styles.label, styleColorText]}>
        {props.route.title}
      </HDText>
    );
  }
  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;
  _renderSceneMap = ({ route, jumpTo }) => {
    switch (route.key) {
      case "TabLoan":
        return <TabLoan jumpTo={jumpTo} type={this.props.type} />;
      case "TabCard":
        return <TabCard jumpTo={jumpTo} />;
    }
  };

  /**
   * <Function: render content of tab>
   */
  renderContent = () => {
    return (
      <TabView
        swipeEnabled
        lazy={true}
        lazyPreloadDistance={0}
        navigationState={this.state}
        renderScene={this._renderSceneMap}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        //onIndexChange={index => this.setState({ index })}  // don't delete
        onIndexChange={() => null} // use for disable button tab TabCard
        initialLayout={{
          width: Context.getWindow().width,
          height: 0
        }}
        renderTabBar={props => this.getTabView(props)}
        useNativeDriver={true}
      />
    );
  };

  /**
   * <Function: for waiting loading>
   */
  showLoading = () => {
    return <HDText style={styles.textLoading}>Đang tải...</HDText>;
  };

  /**
   * <Function: render screen>
   */
  render() {
    console.log("GET FILTER: " + this.props.type);
    return (
      <View style={styles.container}>
        <Header
          title="Lịch sử thanh toán"
          rightIcon={Context.getImage("paymentFilter")}
          rightOnPress={this.rightOnPress}
          navigation={this.props.navigation}
        />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  tab: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0
      },
      android: {
        elevation: 0
      }
    }),
    borderBottomWidth: 0.7,
    borderBottomColor: "#E8E9E9",
    height: 48,
    paddingTop: 0
  },
  indicator: {
    height: 2,
    backgroundColor: Context.getColor("textBlue1")
  },
  label: {
    color: Context.getColor("accent2"),
    textAlign: "center",
    fontSize: Context.getSize(14),
    fontWeight: "500"
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
