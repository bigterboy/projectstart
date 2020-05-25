import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
import PropTypes from "prop-types";
import Context from "context";
import { HDText } from "component";

const S_WIDTH = Dimensions.get("window").width;
const C_WIDTH = S_WIDTH - 40;

const imgLogo = Context.getImage("loanViewLogo");
const imgBike = Context.getImage("iconLoanBike");
const imgTicket = Context.getImage("iconLoanTicket");
const imgMoney = Context.getImage("iconLoanMoney");

export default class HDLoanView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: Context.getString("component_loan_view_money"),
          image: imgMoney,
          url: "https://www.hdsaison.com.vn"
        },
        {
          id: 2,
          name: Context.getString("component_loan_view_bike"),
          image: imgBike,
          url: "https://www.hdsaison.com.vn"
        },
        {
          id: 3,
          name: Context.getString("component_loan_view_plane_ticket"),
          image: imgTicket,
          url: "https://www.hdsaison.com.vn"
        }
      ]
    };
  }

  renderItem = () => {
    return this.state.items.map((item, idx) => {
      return (
        <TouchableHighlight
          key={idx}
          onPress={() =>
            this.props.onPressItem ? this.props.onPressItem(item, idx) : null
          }
          underlayColor="transparent"
        >
          <View style={styles.item_container}>
            <Image source={item.image} style={styles.item_icon} />
            <HDText style={styles.item_text}>{item.name}</HDText>
          </View>
        </TouchableHighlight>
      );
    });
  };

  pressItem(idx) {}

  render() {
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        <View style={styles.top_container}>
          <HDText style={styles.top_title}>
            {Context.getString("component_loan_view_title")}
          </HDText>
          <Image
            source={imgLogo}
            style={styles.top_logo}
            resizeMode="contain"
          ></Image>
        </View>

        <View style={styles.line_container}></View>

        <View style={styles.bottom_container}>{this.renderItem()}</View>
      </View>
    );
  }
}

HDLoanView.propTypes = {
  onPressItem: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // width: '100%',
    width: Context.getSize(343),
    height: Context.getSize(158),
    borderRadius: Context.getSize(5),
    backgroundColor: "white",
    shadowOpacity: 1,
    shadowColor: "#bdbdbd",
    shadowOffset: { width: 0, height: 1 },
    // marginBottom: Context.getSize(30),
    elevation: 3,
  },
  top_container: {
    flexDirection: "row",
    width: "100%",
    height: Context.getSize(50),
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16
  },
  top_title: {
    fontSize: Context.getSize(16),
    fontWeight: "500",
    color: Context.getColor("loanViewText"),
    marginRight: 8
  },
  top_logo: {
    width: Context.getSize(99),
    height: Context.getSize(22),
    //marginTop: (4 / 812) * Context.getWindow().height
    marginTop:
      Platform.OS === "ios"
        ? (4.5 / 812) * Context.getWindow().height
        : (7.5 / 748.8571428571429) * Context.getWindow().height
  },
  line_container: {
    width: "98%",
    height: 1,
    backgroundColor: "#EFEFEF"
  },
  bottom_container: {
    flex: 2,
    width: C_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  item_container: {
    width: C_WIDTH / 3,
    justifyContent: "center",
    alignItems: "center"
  },
  item_icon: {
    width: Context.getSize(56),
    height: Context.getSize(50),
    marginBottom: Context.getSize(10)
  },
  item_text: {
    fontSize: Context.getSize(12),
    lineHeight: Context.getSize(15),
    fontWeight: "500",
    color: Context.getColor("loanViewText")
  }
});
