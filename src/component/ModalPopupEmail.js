import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  HDErrorMessage,
  KeyboardAwareScroll,
  HDText,
  StatusBarCustom
} from 'component'
import PropTypes from "prop-types";
import Context from "context";
import Modal from "react-native-modal";
import Util from 'util'

const win = Context.getWindow();
export default class ModalPopupEmail extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      isClickButtonSend: false,
      errorMessage: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible) {
      this.setState({
        inputText: "",
        isClickButtonSend: false
      })
    }
  }

  clickSendEmail = () => {
    const validate = Util.String.regexCheckValidateEmail(
      this.state.inputText
    )

    if (validate) {
      this.setState({
        errorMessage: ""
      })
      if (this.props.onSendEmail) {
        this.props.onSendEmail(this.state.inputText)
      }
    } else {
      this.setState({
        errorMessage: Context.getString("common_warning_email_format")
      })
    }
  };

  complete() {
    this.setState({
      isClickButtonSend: true,
    })
  }

  onChangeText = text => {
    this.setState({
      inputText: text,
      errorMessage: ""
    });
  };

  renderSuccess = () => {
    return (
      <View style={styles.center_container}>
        <Image
          source={Context.getImage("imgInsidePopupSuccessEmail")}
          style={styles.imgInsidePopupEmail}
        />
        <HDText style={styles.center_title}>
          {Context.getString("loan_mangement_contract_mail_successful_text")}
        </HDText>
        <View style={{ height: Context.getSize(50) }}></View>
      </View>
    );
  };
  renderConfirm = () => {
    return (
      <View style={styles.center_container}>
        <Image
          source={Context.getImage("imgInsidePopupConfirmEmail")}
          style={styles.imgInsidePopupEmail}
        />
        <HDText style={styles.center_title}>
          {Context.getString("loan_mangement_contract_mail_confirm_text")}
        </HDText>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            allowFontScaling={false}
            style={styles.textInput}
            value={this.state.inputText}
            onChangeText={text => this.onChangeText(text)}
          />
          <TouchableOpacity style={styles.button} onPress={this.clickSendEmail}>
            <HDText style={{ color: "white" }}>{Context.getString("common_send")}</HDText>
          </TouchableOpacity>
        </View>
        <HDErrorMessage
          errorMessage={this.state.errorMessage}
          style={styles.error}
          textStyle={styles.error_text}
        />
      </View>
    );
  };

  renderCenter = () => {
    return this.state.isClickButtonSend
      ? this.renderSuccess()
      : this.renderConfirm();
  };

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
        {...this.props}
      >

        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <KeyboardAwareScroll>
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
            <ImageBackground
              source={Context.getImage("popupEmail")}
              resizeMode="stretch"
              style={{
                width: "100%",
                height: Context.getSize(284)
              }}
              imageStyle={{ flex: 1 }}
            >
              {this.renderCenter()}
            </ImageBackground>


          </View>
        </KeyboardAwareScroll>

      </Modal>
    );
  }
}

ModalPopupEmail.propTypes = {
  onPressConfirm: PropTypes.func

};
const styles = StyleSheet.create({
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  imgInsidePopupEmail: {
    width: Context.getSize(133),
    height: Context.getSize(74)
  },
  container: {
    width: win.width,
    height: win.height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  center_container: {
    width: "100%",
    height: Context.getSize(284),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1
  },
  center_title: {
    fontSize: Context.getSize(14),
    marginTop: Context.getSize(16),
    marginBottom: Context.getSize(24),
    color: Context.getColor("textBlack"),
    textAlign: "center"
  },
  textInput: {
    height: Context.getSize(50),
    borderColor: "gray",
    borderWidth: 0.5,
    width: Context.getSize(255),
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
    paddingHorizontal: Context.getSize(16),
    
    fontSize: Context.getSize(14)
  },
  button: {
    backgroundColor: "#0E72E1",
    width: Context.getSize(56),
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    color: "white"
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  error_text: {
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: '400',
    textAlign: 'center'
  },
});
