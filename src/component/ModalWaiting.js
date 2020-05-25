import React, { Component } from "react";
import {
  StyleSheet, View,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from 'prop-types';
import Util from 'util'
import Context from "context";
import { HDButton, HDFastImage, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalWaiting extends Component {

  renderStatus = () => {
    const { data } = this.props
    if (data) {
      return (
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <View style={styles.status_container}>
            <HDText style={styles.status_text}>{data.status}</HDText>
          </View>
        </View>
      )
    }
    return null
  }

  renderRight = () => {
    const { data } = this.props
    imageProduct = () => {
      if (data) {
        if (data.urlImage) {
          return (
            <HDFastImage
              source={{ uri: data.urlImage }}
              style={styles.product_image}
            />
          )
        }
      }
    }

    return (
      <View style={styles.right_container}>
        {this.renderStatus()}
        {imageProduct()}
      </View>
    )
  }

  renderTitle = () => {
    const { data } = this.props
    let title = Context.getString("component_modal_waiting_title")
    if (data) {
      if (data.loanCode == Util.Constant.LOAN_TYPE.CL) {
        title = Context.getString("component_modal_waiting_title_CL")
      }
    }
    return (
      <View style={styles.top_container}>
        <HDText style={styles.title_text}>{title}</HDText>
      </View>
    )
  }

  renderBottom = () => {
    const { data } = this.props
    const loanType = (data.loanType) ? data.loanType : ""
    const amount = (data.loanAmount) ? data.loanAmount : 0
    const endDate = (data.endDate) ? Util.HDDate.formatTo(
      data.endDate
    ) : ""

    return (
      <View style={styles.bottom_container}>
        <View style={styles.contract}>
          <View style={{
            paddingTop: 16,
            paddingLeft: 16,
            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 1,
            height: '100%'
          }}>
            <HDText style={styles.loan_type}>{loanType}</HDText>
            <HDText style={styles.loan_amount}>{Util.String.formatMoney(amount)}</HDText>

            <HDText>
              <HDText style={styles.date_prefix}>{Context.getString("component_contract_item_expire_date")}</HDText>
              <HDText style={styles.date_text}>{endDate}</HDText>
            </HDText>
          </View>

          {this.renderRight()}
        </View>

        <HDButton
          title={Context.getString("component_modal_remind_sign_now")}
          isShadow
          onPress={() => this.props.onPressConfirm ? this.props.onPressConfirm(data) : null}
        />
      </View>
    )
  }

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.50}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
        }}
        {...this.props}
      >

        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
              style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 8 }}
            >
              <Image
                source={Context.getImage("closePopup")}
                style={styles.close_icon}
              />
            </TouchableOpacity>
          </View>

          <ImageBackground source={Context.getImage("popupRemindSign")}
            resizeMode='stretch'
            style={{
              width: '100%',
              height: Context.getSize(410),
            }}
            imageStyle={{ flex: 1 }}>

            {this.renderTitle()}
            {this.renderBottom()}
          </ImageBackground>

        </View>
      </Modal>
    );
  }
}

ModalWaiting.propTypes = {
  data: PropTypes.object,
  onPressConfirm: PropTypes.func,
}

const styles = StyleSheet.create({
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  container: {
    width: win.width,
    height: win.height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  top_container: {
    width: '100%',
    height: Context.getSize(102),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24
  },
  title_text: {
    color: Context.getColor("textBlack"),
    fontSize: Context.getSize(14),
    fontWeight: '400',
    lineHeight: Context.getSize(20),
    textAlign: 'center'
  },
  contract: {
    width: '100%',
    height: Context.getSize(143),
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: Context.getColor("cellBorder"),
    shadowOpacity: 0.5,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  loan_type: {
    fontSize: Context.getSize(12),
    fontWeight: 'bold',
    lineHeight: Context.getSize(18)
  },
  loan_amount: {
    fontSize: Context.getSize(18),
    fontWeight: 'bold',
    lineHeight: Context.getSize(22),
    color: Context.getColor("textBlue1"),
    marginBottom: 8,
  },
  date_prefix: {
    fontSize: Context.getSize(12),
    fontWeight: '400',
    lineHeight: Context.getSize(18),
    color: Context.getColor("textBlack")
  },
  date_text: {
    fontSize: Context.getSize(12),
    fontWeight: 'bold',
    lineHeight: Context.getSize(18),
    color: Context.getColor("textBlue1")
  },
  right_container: {
    position: 'absolute',
    zIndex: 0,
    right: 0,
    width: Context.getSize(176),
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 8,
    paddingLeft: 16,
    borderBottomRightRadius: 6,
    overflow: 'hidden'
  },
  product_image: {
    flex: 1,
    width: '100%',
  },
  status_container: {
    width: '100%',
    height: Context.getSize(22),
    alignItems: 'center',
    borderRadius: Context.getSize(22 / 2),
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: Context.getColor("stateWait")
  },
  status_text: {
    fontSize: Context.getSize(10),
    fontWeight: '400',
    lineHeight: Context.getSize(12),
    color: Context.getColor("stateWaitText")
  }
});
