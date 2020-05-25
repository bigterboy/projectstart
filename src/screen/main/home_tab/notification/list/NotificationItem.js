import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import PropTypes from 'prop-types';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { HDText } from "component";
import Context from "context";


export default class NotificationItem extends Component {
  _onDeletePress = () => {
    if (this.props.onDeletePress)
      this.props.onDeletePress(this.props.data, this.props.index);
  };
  _onItemPress = () => {
    if (this.props.onItemPress)
      this.props.onItemPress(this.props.data, this.props.index);
  };

  _renderRightAction = () => {
    return (
      <View style={styles.containerDelete}>
        <TouchableOpacity
          style={styles.touchDelete}
          onPress={this._onDeletePress}
        >
          <Image
            source={Context.getImage("deleteItem")}
            style={styles.iconDelete}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderContent = () => {
    const { data, isSwipeable } = this.props
    let title = (data.title) ? (data.title.toUpperCase()) : ""
    let content = (data.content) ? (data.content) : ""
    let colorTitle = Context.getColor("textBlue1")
    if (isSwipeable) {
      if (data.isRead === 1) {
        colorTitle = Context.getColor("textBlack")
      }else{
        colorTitle = Context.getColor("textBlue1")
      }
    }
    return (
      <TouchableOpacity
        style={styles.touchContainer}
        onPress={this._onItemPress}>
        <View style={styles.viewContainer}>
          <View style={styles.textContainer}>
            <HDText
              style={[
                styles.title,
                { color: colorTitle }]}
              numberOfLines={1}>
              {title}
            </HDText>
            <HDText
              style={styles.description}
              numberOfLines={2}>
              {content}
            </HDText>
          </View>
          <Image
            source={Context.getImage("arrowRight")}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let { isSwipeable } = this.props;

    if (isSwipeable) {
      return (
        <Swipeable
          containerStyle={styles.container}
          renderRightActions={this._renderRightAction}>
          {this.renderContent()}
        </Swipeable>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.renderContent()}
        </View>
      )
    }
  }
}

NotificationItem.propTypes = {
  //Data of notification item
  data: PropTypes.object,
  //This prop check user can delete or not delete base login status
  isSwipeable: PropTypes.bool   
}

const styles = StyleSheet.create({
  container: {
    width: Context.getWindow().width,
    paddingHorizontal: 15,
    marginBottom: 15,
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
  },
  touchContainer: {
    width: "100%"
  },
  viewContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#C0CDD5",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  textContainer: { flex: 1, marginRight: 16 },
  title: {
    fontSize: Context.getSize(14),
    fontWeight: "500",
    color: Context.getColor("focusBorder"),
    marginBottom: Context.getSize(6)
  },
  description: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    color: Context.getColor("notifySubTitle")
  },
  arrow: {
    width: Context.getSize(14),
    height: Context.getSize(14)
  },
  containerDelete: {
    height: "100%",
    width: Context.getSize(98),
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16
  },
  touchDelete: {
    width: Context.getSize(50),
    height: Context.getSize(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Context.getSize(50 / 2),
    backgroundColor: "white"
  },
  iconDelete: {
    resizeMode: "contain",
    width: Context.getSize(16),
    height: Context.getSize(16)
  }
});
