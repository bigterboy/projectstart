import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseScreen, Header } from "component";
import { HDText } from "component";
import Util from 'util'
import Context from "context";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    if (!this.props.isLogin) {
      this.props.navigation.navigate("AuthFlow");
    }
  }

  componentDidUpdate() { }
  componentDidMount() {
    if (this.props.isLogin) {
      this._navListener = this.props.navigation.addListener(
        "didFocus",
        async payload => {
          console.log("FUNCTION WHEN COMBACK NAVIGATION CARD");
          Context.application.showModalAlert(
            Context.getString("common_warning_card_feature_no_support"),
            false
          );
        }
      );
    }
  }

  componentWillUnmount = () => {
    if (this.props.isLogin) {
      this._navListener.remove();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Thẻ" />
        <View style={styles.content}>
          <HDText>Đang cập nhật ...</HDText>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  }
});
