import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { HDText } from "component"
import Context from "context";

export default class UserInfo extends Component {
  getArrow() {
    return (
      <Image source={Context.getImage("arrowRight")} style={styles.arrow} />
    );
  }

  renderImageAvata = () => {
    if (this.props.avatar) {
      return (
        <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
      );
    }
    return <Image source={Context.getImage("avatar")} style={styles.avatar} />
  };

  renderName = () => {
    const { name } = this.props
    if (name) {
      return (
        <HDText
          style={styles.name}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {name}
        </HDText>
      )
    }
    return null
  }

  renderPhone = () => {
    const { name, phone } = this.props
    if (phone) {
      return (
        <HDText
          style={
            (name) ? styles.phone : styles.name
          }>
          {this.props.phone}
        </HDText>
      )
    }
    return null
  }

  render() {
    return (
      <TouchableOpacity
        style={[this.props.style, styles.container]}
        onPress={this.props.onPress}
      >
        {this.renderImageAvata()}

        <View style={styles.textContainer}>
          {this.renderName()}
          {this.renderPhone()}
        </View>
        {this.getArrow()}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
    height: 80,
    borderRadius: 10,
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
    }),
    flex: 1
  },
  avatar: {
    width: Context.getSize(50),
    height: Context.getSize(50),
    alignSelf: "center",
    resizeMode: "cover",
    marginLeft: 6,
    borderRadius: Context.getSize(50 / 2),
    borderWidth: 0.3,
    borderColor: "#F3F5F6"
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
    justifyContent: "center",
  },
  arrow: {
    width: Context.getSize(16),
    height: Context.getSize(16),
    alignSelf: "center",
    resizeMode: "contain"
  },
  name: {
    fontSize: Context.getSize(18),
    lineHeight: Context.getSize(22),
    color: Context.getColor("textBlack"),
    fontWeight: "500",
  },
  phone: {
    marginTop: 1,
    fontSize: Context.getSize(12),
    lineHeight: Context.getSize(14),
    fontWeight: '400',
    color: '#606060'
  }
});
