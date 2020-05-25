import React from "react";
import { StyleSheet, View, Platform, Image } from "react-native";
import { BaseScreen, Header, HDButton, HDText } from "component";
import Context from "context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import TabAll from "../all";
//import TabMy from "../my/list";
const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <HDText>Loading {route.title}…</HDText>
  </View>
);
export default class Screen extends BaseScreen {
  /**
   * <FUNCTION: constructor>
   */
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "TabAll", title: "Ưu đãi chung" },
        { key: "TabMy", title: "Ưu đãi dành cho\nQuý khách" }
      ],
      currentTabIndex: 0 // 0: Uư đãi chung 1: Ưu đãi riêng
    };
  }
  /**
   * <Function: click filter button on the right top>
   */
  rightOnPress = () => {
    this.props.showFilter();
  };

  /**
   * <Function: add addListerner so when you comeback tab screen can call it again>
   */
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ ...this.state, isFocused: true });
    });
  }

  componentDidUpdate() {}

  /**
   * <Function: remove addlistener>
   */
  componentWillUnmount() {
    this.focusListener.remove();
  }

  /**
   * <Function: render tab bar>
   * @param tabProps: props from parent component
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
   * <Function: get label and return text with style>
   * @param props props from parent component
   * @param tabProps props from parent component
   */
  getLabelOfTab(props, tabProps) {
    let { route } = props;
    let styleColorText;
    if (route.key === tabProps.navigationState.routes[this.state.index].key)
      styleColorText = { color: Context.getColor("textBlue1") };
    else styleColorText = { color: Context.getColor("hint") };
    return (
      <HDText style={[styles.label, styleColorText]}>
        {props.route.title}
      </HDText>
    );
  }
  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  /**
   * <Function: render 2 tab promotion for promotion general and promotion for user>
   * @param route: value from json
   * @param jumpTo: value to jumb to
   */
  _renderSceneMap = ({ route, jumpTo }) => {
    switch (route.key) {
      case "TabAll":
        return (
          <TabAll
            navigation={this.props.navigation}
            jumpTo={jumpTo}
            tab={1}
            currentTabIndex={this.state.index}
          />
        );
      case "TabMy":
        if (this.props.isLogin === true || this.props.isLoginPhone === true) {
          return (
            <TabAll
              navigation={this.props.navigation}
              jumpTo={jumpTo}
              tab={2}
              currentTabIndex={this.state.index}
            />
          );
        } else {
          return <View style={{ flex: 1 }}>{this.renderWithoutLogin()}</View>;
        }
    }
  };

  /**
   * <Function: render content without signin>
   */
  renderWithoutLogin = () => {
    return (
      <View style={styles.containerWithoutLogin}>
        <Image
          source={Context.getImage("errorLoading")}
          style={styles.imageWithoutLogin}
        />
        <HDText style={styles.textTitle}>
          {Context.getString("promotion_tab_without_login")}
        </HDText>
        <HDText style={styles.textContent}>
          {Context.getString("promotion_tab_without_login_announcement")}
        </HDText>
        <View style={styles.space}>
          <HDButton
            title={Context.getString("auth_login_button_login")}
            isShadow={true}
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              ...styles.buttonLogin
            }}
          />
        </View>
      </View>
    );
  };

  /**
   * <Function: render content of tabview>
   */
  renderContent = () => {
    return (
      <TabView
        swipeEnabled={false}
        lazy={true}
        lazyPreloadDistance={0}
        navigationState={this.state}
        renderScene={this._renderSceneMap}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
        onIndexChange={index => this.setState({ index })}
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
   * <Function: render when is loading>
   */
  // showLoading = () => {
  //   return <HDText style={styles.textLoading}>Đang tải...</HDText>;
  // };

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("promotion_tab_promotion_detail_nav")}
        />
        {this.renderContent()}
        {/* {this.state.isFocused ? this.renderContent() : this.showLoading()} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  tab: {
    backgroundColor: "#FFF",
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
    borderBottomColor: "#E8E9E9"
    //height: Context.getSize(52),
    //paddingTop: 0
    //height: "100%"
    //justifyContent: "center",
    //alignItems: "center",
    //height: Context.getSize(52)
  },
  indicator: {
    height: Context.getSize(2),
    backgroundColor: Context.getColor("textBlue1")
  },
  label: {
    color: Context.getColor("textBlue1"),
    //height: "100%",
    //width: "100%",
    //textAlignVertical: "center",
    textAlign: "center",
    //textalignHo
    fontSize: Context.getSize(14),
    fontWeight: "500"
    //margin: 0,
    //padding: 0,
    //marginTop: 0
    //justifyContent: 'center',
    //alignItems: "center",
    //textAlign: ",
    //borderWidth: 1,
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
  },
  containerWithoutLogin: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Context.getSize(20),
    backgroundColor: "#F3F5F6"
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
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20)
  },
  space: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Context.getSize(30)
  },
  buttonLogin: {
    flex: 1,
    marginBottom: Context.getSize(16)
  },
  imageWithoutLogin: {
    //width: (260 / 375) * Context.getWindow().width,
    //height: (252 / 812) * Context.getWindow().height,
    width: Context.getSizeCustome(260),
    height: Context.getSizeCustome(252),
    marginTop: Context.getSize(25)
    //borderWidth: 1
  }
});
