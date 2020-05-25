import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView
} from "react-native";
import { BaseScreen, HDText, HDAnimatedLoading } from "component";
import HistoryItem from "./HistoryItem";
import HeaderItem from "./HeaderItem";
import Context from "context";
import Network from "middleware/helper/Network";
import Util from "util";

/**
 * <Function: use for waiting loading>
 * @param isFetching check is fetching new data
 * @param isLoading check is loading
 * @param items array data of payment history
 */
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isLoading: true,
      items: []
    };
  }

  /**
   * <Function: get api history contract>
   */
  componentDidMount = () => {
    this.historyPaymentAPI();
  };

  /**Finish Loading */
  finnishLoading = () => {
    this.setState({ isLoading: false })
  }

  historyPaymentAPI = async () => {
    try {
      let result = await Network.historyByContract(
        this.props.user.uuid,
        "",
        "",
        ""
      );

      if (result.code === 200) {
        console.log("API-HISTORY-PAYMENT-COMPLETE: " + JSON.stringify(result.payload));
        this.setState({
          items: result.payload
        });
      }
    } catch (error) {
      console.log("API-HISTORY-PAYMENT-ERROR: " + error);
    }

    this.finnishLoading()
  };

  /**
   * <Function: render content for filter>
   */
  renderContent = () => {
    const { items } = this.state;
    let filterItems = [];
    if (this.props.type === "") {
      filterItems = items;
    } else {
      if (this.props.type === Util.Constant.LOAN_TYPE.CL) {
        filterItems = items.filter(item => {
          return (
            item.loanType === this.props.type ||
            item.loanType === Util.Constant.LOAN_TYPE.CLO
          );
        });
      } else {
        filterItems = items.filter(item => {
          return item.loanType === this.props.type;
        });
      }
    }

    if (filterItems.length > 0) {
      return (
        <View style={styles.form_container}>
          {this.renderHeader()}

          {filterItems.map((item, index) => {
            return (
              <HistoryItem key={"item-" + index} data={item} index={index} />
            );
          })}
        </View>
      );
    } else {
      if (!this.state.isLoading) {
        return (
          <HDText style={styles.noData}>
            {Context.getString("common_data_null")}
          </HDText>
        );
      }
      return null;
    }
  };

  renderLoading = () => {
    return (
      <HDAnimatedLoading style={{ flex: 1, height: '100%'}} />
    )
  }

  renderWithoutLoading = () => {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scroll_content}
      >
        {this.renderContent()}
      </ScrollView>
    );
  }


  /**
   * <Function: render screen>
   */
  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return this.renderLoading()
    } else {
      return this.renderWithoutLoading()
    }
  }

  /**
   * <Function: set is fetching to refresh new data>
   */
  onRefresh = () => {
    this.setState({ isFetching: true }, function () {
      // alert("refresh data");
      this.setState({ isFetching: false });
    });
  };

  /**
   * <Function: render header item>
   */
  renderHeader = () => {
    return <HeaderItem />;
  };
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  scroll_content: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  list: {
    flex: 1,
    width: "100%"
  },
  form_container: {
    backgroundColor: "white",
    shadowColor: "#9B9B9B",
    shadowOpacity: 1,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    paddingBottom: 5,
    elevation: 3
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderRadius: 20,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  }
});
