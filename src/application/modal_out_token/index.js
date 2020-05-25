import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { HDButton, HDText } from "component"
import Context from "context";

export default class ModalOutToken extends Component {

  _onConfirm = () => {
    if (this.props.onConfirm) this.props.onConfirm()
  }

  render() {
    return (
      <View style={styles.err_token_container}>
        <View style={styles.err_token_box}>
          <HDText style={styles.err_token_text}>{Context.getString("common_expired_token_message")}</HDText>
          <HDButton
            title={Context.getString("common_expired_token_button")}
            isShadow={true}
            onPress={this._onConfirm}
          />
        </View>
      </View>
    );
  }
}

ModalOutToken.propTypes = {
  onConfirm: PropTypes.func
};

const styles = StyleSheet.create({
  err_token_container: {
    width: '100%',
    height: '100%',
    backgroundColor: Context.getColor("modalBackground"),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 100
  },
  err_token_box: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  err_token_text: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(22),
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 16,
    color: Context.getColor("textBlack"),
  }
});
