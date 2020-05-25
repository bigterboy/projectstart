import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { BaseScreen, HDButton, HDPdf, HDText, HDAnimatedLoading } from "component";

import { CheckBox } from 'react-native-elements'
import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

const bottomHeight = Context.getSize(129)
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      base64pdf: "",
      loadComplete: false,
      isLoading: true
    }
  }

  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.createFileAPI()
  }

  componentDidUpdate(preProps, preStates) {
    if (this.state.loadComplete !== preStates.loadComplete) {
      this.btnSign.setDisabled(true)
    }
  }

  createFileAPI = async () => {
    const { objEsign } = this.props
    const contractBase64 = objEsign.contractBase64
    if (contractBase64) {
      this.setState({
        base64pdf: contractBase64
      })
    } else {
      try {
        // Context.application.showLoading();
        var result = await Network.esignCreateFileB64(
          objEsign.data.contractNumber,
          this.storeUser.customer.uuid,
          Util.Constant.CONTRACT_FILE_TYPE.ADJUSTMENT
        )
        // Context.application.hideLoading();

        if (result != null) {
          if (result.code === 200) {
            console.log("API-CREATE-FILE-CONTRACT-B64-COMPLETE" + JSON.stringify(result))
            if (result.payload) {
              this.props.saveContractBase64(
                result.payload
              )
              this.setState({
                base64pdf: result.payload
              })
            }
          } else {
            console.log("ERROR-API-CREATE-FILE-CONTRACT-B64: " + result.code)
            console.log("ERROR-API-CREATE-FILE-CONTRACT-B64: " + Network.getMessageFromCode(result.code))
            // Context.application.hideLoading();
            Context.application.showModalAlert(
              Context.getString("common_error_contract_adjustment_file"),
              false
            )
          }
        }
      } catch (err) {
        console.log("ERROR-API-CREATE-FILE-CONTRACT-B64" + err.message)
        // Context.application.hideLoading();
        Context.application.showModalAlert(
          Context.getString("common_error_contract_adjustment_file"),
          false
        )
      }
    }
    this.finishLoading()
  }

  /**Finish Loading */
  finishLoading = () => {
    this.setState({ isLoading: false })
  }

  checkLogAPI = async () => {
    const { objEsign } = this.props
    try {
      var result = await Network.checkLogAction(
        this.storeUser.customer.uuid,
        objEsign.data.contractNumber,
        Util.Constant.CHECK_LOG_ACTION.READ_AGREE
      )

      if (result != null) {
        if (result.code === 200) {
          console.log("API-ESIGN-CHECK-LOG-COMPLETE" + JSON.stringify(result.payload))

        } else {
          console.log("ERROR-API-ESIGN-CHECK-LOG " + result.code)
        }
      }
    } catch (err) {
      console.log("ERROR-API-ESIGN-CHECK-LOG " + err.message)
    }
  }

  onPressCheckbox = () => {
    this.setState({
      checked: !this.state.checked
    }, async () => {
      const { checked } = this.state
      this.props.saveUserAgree(checked)

      if (checked) await this.checkLogAPI()
      this.btnSign.setDisabled(!checked)
    })
  }

  onPressConfirm = () => {
    this.props.updateEsignStep(3)
  }

  loadFileComplete = (numberOfPages, filePath) => {
    Context.application.hideLoading();
    this.setState({
      loadComplete: true
    }, () => {
      const { objEsign } = this.props
      const userAgreement = objEsign.userAgreement
      this.btnSign.setDisabled(!userAgreement)
      this.setState({
        checked: userAgreement
      })
    })
  }

  renderPolicy = () => {
    const { base64pdf } = this.state
    const source = {
      uri: "data:application/pdf;base64," + base64pdf + "",
      cache: true
    };
    return (
      <View style={{ width: '100%', height: '100%', paddingBottom: bottomHeight }}>
        <HDPdf
          source={source}
          onLoadComplete={this.loadFileComplete}>
        </HDPdf>
      </View>
    )
  }

  renderAgree = () => {
    const { loadComplete } = this.state
    if (loadComplete) {
      return (
        <View style={styles.bottom_container}>
          <TouchableOpacity
            style={styles.check_container}
            activeOpacity={1}
            onPress={this.onPressCheckbox}>
            <CheckBox
              containerStyle={{ marginLeft: 0, marginTop: 0, paddingLeft: 0, width: 18, height: 18 }}
              checkedIcon={<Image source={Context.getImage("iconChecked")} style={styles.checkbox} />}
              uncheckedIcon={<Image source={Context.getImage("iconUnChecked")} style={styles.checkbox} />}
              checked={this.state.checked}
              onPress={this.onPressCheckbox}
            />

            <View style={{ flex: 1 }}>
              <HDText>
                <HDText style={styles.agree_text}>{Context.getString("loan_tab_esign_contract_document_agree")}</HDText>
              </HDText>
            </View>
          </TouchableOpacity>

          <HDButton
            ref={ref => this.btnSign = ref}
            isShadow={true}
            title={Context.getString("loan_tab_esign_button_sign")}
            onPress={this.onPressConfirm} />
        </View>
      )
    }
    return null
  }

  renderLoading = () => {
    return <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
  }

  renderWithoutLoading = () => {
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
          {this.renderPolicy()}

          {this.renderAgree()}
        </View>
      </View>
    );
  }

  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return this.renderLoading()
    } else {
      return this.renderWithoutLoading()
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1,
    borderRadius: 5,
    marginTop: 16
  },
  scroll_content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: bottomHeight + 24,
    paddingTop: 16
  },
  policy_title: {
    fontSize: Context.getSize(14),
    fontWeight: 'bold',
    lineHeight: Context.getSize(17),
    color: Context.getColor("textBlack"),
    marginBottom: 16,
  },
  policy_content: {
    fontSize: Context.getSize(14),
    fontWeight: '400',
    lineHeight: Context.getSize(20),
    color: Context.getColor("textStatus")
  },
  bottom_container: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    height: bottomHeight,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  check_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginTop: 8,
    marginBottom: 10,
  },
  checkbox: {
    width: Context.getSize(18),
    height: Context.getSize(18)
  },
  agree_text: {
    fontSize: Context.getSize(14),
    fontWeight: '400',
    lineHeight: Context.getSize(20),
    color: Context.getColor("textBlack")
  },
  content_pdf: {
    flex: 1,
    backgroundColor: Context.getColor("background"),
    marginTop: 10,
    width: '100%',
    height: '100%'
  },
});
