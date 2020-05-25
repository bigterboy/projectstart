import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { HDText } from "component";
import Context from "context";

export default class CategoryItem extends Component {
  _onItemPress = () => {
    if (this.props.onItemPress)
      this.props.onItemPress(this.props.data, this.props.index);
  };
  render() {
    let { data } = this.props;
    return (
      <TouchableOpacity
        style={styles.touchContainer}
        onPress={this._onItemPress}
      >
        <View style={styles.viewCircle}>
          <Image
            style={styles.icon}
            source={data.selected ? data.imgURLActive : data.imgURL}
          />
        </View>
        <HDText style={styles.title(data.selected)}>{data.title}</HDText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    width: 0.2* Context.getWindow().width,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  viewCircle: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    backgroundColor: "#FFF",
    borderColor: Context.getColor("hint"),
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  title: selected => {
    return {
      marginTop: 8,
      fontSize: 11,
      fontWeight: "500",
      textAlign: "center",
      alignSelf: "center",
      color: selected ? Context.getColor("accent2") : Context.getColor("hint")
    };
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  }
});
