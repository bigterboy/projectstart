import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  BackHandler,
  ToastAndroid
} from "react-native";
import { BaseScreen, Header, HDButton, HDComplete } from "component";
import Context from "context";

// Have 2 type of screen use this component
// case 1(default): Context.getString("loan_tab_register_loan_nav") Đăng ký vay
// case 2: Context.getString("promotion_tab_promotion_register_nav") // Đăng ký nhận ưu đãi

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      navTitle: Context.getString("loan_tab_register_loan_nav"),
      content: Context.getString("loan_tab_register_loan_finish"),
      titleButton: Context.getString("loan_tab_register_loan_returnMain")
    };
  }

  /**
   * <Function: add listener>
   */
  componentDidMount = async () => {
    //Get header title:
    const navTitle = await this.props.navigation.getParam("navTitle");
    if (navTitle) {
      this.setState({
        navTitle: navTitle,
        content: Context.getString(
          "loan_tab_register_loan_from_promotion_finish"
        ),
        titleButton: Context.getString(
          "loan_tab_register_loan_return_promotion_tab"
        )
      });
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  };

  /**
   * <Function: add listener>
   */
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  /**
   * <Function: so that android can not go back>
   */
  handleBackButton() {
    //ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    return true;
  }

  onPressConfirm = async () => {
    switch (this.state.navTitle) {
      case Context.getString("loan_tab_register_loan_nav"):
        this.props.navigation.popToTop(); // for default screen
        break;
      case Context.getString("promotion_tab_promotion_register_nav"):
        this.props.navigation.navigate("MainPromotionTab"); // for default screen
        break;
      default:
        return;
    }
  };

  renderComplete = () => {
    return (
      <HDComplete
        textStyle={styles.textStyle}
        //status={Context.getString("loan_tab_register_loan_finish")}
        status={this.state.content}
        //style={styles.complete}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.navTitle}
          // navigation={this.props.navigation}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}
          scrollEnabled={false}
        >
          {this.renderComplete()}
          <HDButton
            title={this.state.titleButton}
            style={styles.confirm_button}
            onPress={() => this.onPressConfirm()}
            isShadow={true}
          />
        </ScrollView>
        <View style={[styles.bottom_container, styles.shadowBox]}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Context.getSize(24)
  },
  form_loan_container: {
    width: Context.getSize(343),
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Context.getColor("background"),
    borderWidth: 1,
    borderColor: "#E5EAEF",
    shadowOpacity: 0.2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  bottom_container: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  confirm_button: {
    width: Context.getSize(343),
    height: Context.getSize(50),
    marginBottom: Context.getSize(20),
    fontWeight: "bold",
    marginTop: Context.getSize(24)
  },

  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.0,
    elevation: 3
  },
  complete: {
    //marginTop: 24
  },
  textStyle: {
    color: Context.getColor("textBlue1"),
    fontWeight: "500",
    fontSize: Context.getSize(14)
  }
});
