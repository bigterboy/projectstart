import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import Context from "context";
import Util from 'util';
export default class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          selected: true,
          title: "Tất cả",
          imgURL: Context.getImage("tabPromotionSelectGray"),
          imgURLActive: Context.getImage("tabPromotionSelect"),
          type: ""
        },
        {
          id: 2,
          selected: false,
          title: "Tiền mặt",
          imgURL: Context.getImage("tabPromotionCash"),
          imgURLActive: Context.getImage("tabPromotionCashBlue"),
          type: Util.Constant.LOAN_TYPE.CL
        },
        {
          id: 3,
          selected: false,
          title: "Xe máy",
          imgURL: Context.getImage("tabPromotionBike"),
          imgURLActive: Context.getImage("tabPromotionBikeBlue"),
          type: Util.Constant.LOAN_TYPE.MC
        },
        {
          id: 4,
          selected: false,
          title: "Điện máy",
          imgURL: Context.getImage("tabPromotionElectricGray"),
          imgURLActive: Context.getImage("tabPromotionElectricBlue"),
          type: Util.Constant.LOAN_TYPE.ED
        },
        {
          id: 5,
          selected: false,
          title: "Vé máy bay",
          imgURL: Context.getImage("tabPromotionPlane"),
          imgURLActive: Context.getImage("tabPromotionPlaneBlue"),
          type: Util.Constant.LOAN_TYPE.PL
        }
      ]
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this._renderItem}
          bounces={false}
          horizontal={true}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  _renderItem = ({ item, index }) => {
    return (
      <CategoryItem data={item} index={index} onItemPress={this.onPressItem} />
    );
  };
  onPressItem = (item, selectedIndex) => {
    this.setState({
      ...this.state,
      items: this.state.items.map((item, index) => {
        return { ...item, selected: index == selectedIndex };
      })
    });
    this.props.onCategoryPress(item);
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#F3F5F6",
    marginBottom: 15
  },
  list: { flex: 1, width: "100%" },
  listContent: {
    justifyContent: "center",
    alignItems: "center"
  }
});
