import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseScreen, Header, HDButton, HDComplete, HDText } from "component";
import Util from "util";
import Context from "context";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.navData = this.props.navigation.getParam("navData");
  }

  /**
   * <Function get data from storage>
   */
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.setState({
      username: this.storeUser.customer.username
    });
  };

  /**
   * <Function: show popup and click button>
   */
  onPressContinue = () => {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();
    const routes = parent.state.routes;
    const filter = routes.filter(route => {
      return route.routeName == "ForgotEnterContract";
    });
    //Filter for pop to previous screen
    if (filter) {
      if (filter.length > 0) {
        this.props.navigation.pop(5);
      } else {
        this.props.navigation.pop(4);
      }
    }
  };

  /**
   * <Function: render screen complete>
   */
  renderCompleteStatus = () => {
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <HDText style={styles.status}>
          {Context.getString("auth_forgot_complete_status")}
        </HDText>
        <HDText>
          <HDText style={styles.sub_status}>
            {Context.getString("auth_forgot_complete_sub_status")}
          </HDText>
          <HDText style={styles.username}>{this.state.username}</HDText>
        </HDText>
      </View>
    );
  };

  /**
   * <Function: render screen>
   */
  render() {
    const { objEsign } = this.props;
    let contractCode = "";
    if (objEsign.data) {
      contractCode = objEsign.data.contractNumber;
    }
    return (
      <View style={styles.container}>
        <Header title={Context.getString("auth_forgot_complete_nav")} />
        <View style={styles.content_container}>
          <HDComplete componentText={this.renderCompleteStatus()} />

          <View style={styles.button_container}>
            <HDButton
              title={
                Context.getString("auth_forgot_complete_button_continue_sign") +
                " " +
                contractCode
              }
              isShadow={true}
              onPress={this.onPressContinue}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content_container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16
  },
  button_container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  status: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    lineHeight: Context.getSize(20),
    color: Context.getColor("textStatus"),
    textAlign: "center",
    marginBottom: 8
  },
  sub_status: {
    fontSize: Context.getSize(14),
    fontWeight: "500",
    color: Context.getColor("textBlack"),
    textAlign: "center"
  },
  username: {
    color: Context.getColor("textBlue1"),
    fontWeight: "bold"
  }
});
