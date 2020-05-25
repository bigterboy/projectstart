import React from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { BaseScreen } from "component";
import PromotionItem from "../../component/PromotionItem";
import CategoryView from "../../component/CategoryView";
import Util from 'util'
import Context from "context";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      items: [],
    };
  }

  render() {
    console.log("CO CHAY CAI NAY KHOGN");
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={this._renderHeader}
          refreshControl={
            <RefreshControl
              colors={[Context.getColor("accent2")]}
              refreshing={this.state.isFetching}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.list}
          data={this.props.tab === 1 ? this.state.items : this.state.item2}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          bounces={false}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      // alert("refresh data");
      this.setState({ isFetching: false });
    });
  };
  _renderHeader = () => {
    return <CategoryView onCategoryPress={this._onCategoryPress} />;
  };
  _onCategoryPress = category => {
    alert(JSON.stringify(category));
  };
  _renderItem = ({ item, index }) => {
    return (
      <PromotionItem data={item} index={index} onItemPress={this.onPressItem} />
    );
  };
  onPressItem = (item, index) => {
    this.props.navigation.navigate("PromotionDetail", {
      id: item.id,
      type: Util.Constant.TYPE_WEB_DETAIL.PROMOTION,
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: { flex: 1, width: "100%" },
  listContent: {}
});
