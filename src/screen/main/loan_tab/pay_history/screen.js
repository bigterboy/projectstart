import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, Header, HDHistoryList } from "component";
import Context from "context";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      histories: []
    }
    this.navData = this.props.navigation.getParam('navData')
  }

  componentDidUpdate() { }
  componentDidMount() {
    this.setState({
      histories: this.navData.histories
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={Context.getString("loan_tab_pay_history_nav")} navigation={this.props.navigation} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_content}
        >
          <HDHistoryList
            items={this.state.histories}
            isShowHeader={true}
            style={{ marginTop: 24 }} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scroll_content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom:24
  }
});
