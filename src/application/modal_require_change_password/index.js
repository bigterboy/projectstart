import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View, Text, Image
} from "react-native";
import { HDButton, HDText } from "component";
import Context from "context";
import PropTypes from 'prop-types';

const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
      "REAL_WINDOW_HEIGHT"
    );

export default class ModalRequireChangePassword extends Component {

  _onPressChange = () => {
    if (this.props.onPressChange) this.props.onPressChange()
  }

  _onPressLater = () => {
    if (this.props.onPressLater) this.props.onPressLater()
  }

  renderHeader = () => {
    const { type } = this.props
    const bgHeader = (type === 1) ? Context.getColor("accent") : Context.getColor("primary")
    const icHeader = (type === 1) ? Context.getImage("icPopupRemindPass") : Context.getImage("icPopupExpiredPass")
    return (
      <View
        style={[
          styles.header_container,
          {backgroundColor:bgHeader}
        ]}>
        <Image
          source={icHeader}
          style={styles.header_image}
          resizeMode='contain'
        />
      </View>
    )
  }

  renderMessage = () => {
    const { type } = this.props
    const message = (type === 1) ?
      Context.getString("modal_required_change_password_message_remind") :
      Context.getString("modal_required_change_password_message_expired")
    return (
      <HDText style={styles.content_message}>{message}</HDText>
    )
  }

  renderMainBtn = () => {
    const { type } = this.props
    const marginBottom = (type === 1) ? 8 : 24
    return (
      <HDButton
        title={Context.getString("component_modal_change_password_button")}
        style={{ marginBottom: marginBottom }}
        isShadow={true}
        onPress={this._onPressChange}
      />
    );
  }

  renderSubBtn = () => {
    const { type } = this.props
    if (type === 1) {
      return (
        <HDButton
          title={Context.getString("component_modal_change_password_do_later")}
          style={{ backgroundColor: 'transparent' }}
          textStyle={{
            fontWeight: '400',
            color: Context.getColor("textBlack")
          }}
          onPress={this._onPressLater}
        />
      )
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.content_container}>
          {this.renderHeader()}

          <View style={{
            width: '100%',
            paddingHorizontal: 24,
            paddingVertical: 16
          }}>
            <HDText style={styles.content_title}>{Context.getString("modal_required_change_password_title")}</HDText>

            {this.renderMessage()}
          </View>

          <View style={{ width: '100%', paddingHorizontal: 16 }}>
            {this.renderMainBtn()}

            {this.renderSubBtn()}
          </View>
        </View>
      </View>
    );
  }
}

ModalRequireChangePassword.propTypes = {
  type: PropTypes.number,  // type: 1: remind  2:expired
  onPressChange: PropTypes.func,
  onPressLater: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Context.getColor("modalBackground"),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 100
  },
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  content_container: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  header_container: {
    width: '100%',
    height: Context.getSize(127),
    justifyContent: 'center',
    alignItems: 'center'
  },
  header_image: {
    width: Context.getSize(65),
    height: Context.getSize(95)
  },
  content_title: {
    fontSize: Context.getSize(16),
    fontWeight: '500',
    lineHeight: Context.getSize(20),
    marginBottom: Context.getSize(8)
  },
  content_message: {
    fontSize: Context.getSize(14),
    fontWeight: '400',
    lineHeight: Context.getSize(20)
  }
});
