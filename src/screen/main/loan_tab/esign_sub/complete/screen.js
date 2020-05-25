import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, HDComplete, ModalPopupEmail, HDForm, HDTextInput,HDText } from "component";
import Util from 'util'
import Context from "context";
// import { FormComplete } from './component'
import BottomButton from '../component/BottomButton'
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

const bottomHeight = Context.getSize(77)
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalEmail: true
    }
    this.arrRefs = []
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser()

    const { objEsign } = this.props
    if (objEsign) {
      if (objEsign.data) {
        const data = objEsign.data
        this.ipContractNo.setText(objEsign.data.contractNumber)
        if (data.configs) {
          const configs = data.configs
          configs.forEach((item, index) => {
            this.arrRefs[index].setText((item.valueChange) ? item.valueChange : "")
          });
        }
      }
    }
  }

  hideModalEmail = () => {
    this.setState({
      modalEmail: false
    })
  }

  callSendMailAPI = async (email) => {
    const { objEsign } = this.props
    const data = objEsign.data
    try {
      //Phản hồi lại modal send mail 
      this.modalEmail.complete()

      const result = await Network.contractSendFile(
        data.contractUuid,
        this.storeUser.customer.uuid,
        email,
        Util.Constant.SEND_MAIL_TYPE.ADJUSTMENT
      )

      if (result != null) {
        if (result.code === 200) {
          console.log("SEND-FILE-COMPLETE")
        } else {
          console.log("ERROR-API-SEND-FILE: " + result.code)
          console.log("ERROR-API-SEND-FILE: " + Network.getMessageFromCode(result.code))
        }
      }
    } catch (err) {
      console.log("ERROR-API-SEND-FILE: " + err.message)
    }
  }


  onPressLoanManager = () => {
    this.props.navigation.navigate("MainLoanTab")
  }

  renderCompleteStatus = () => {
    return (
      <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
        <HDText style={styles.status_text}>{Context.getString("loan_tab_esign_sub_complete_status")}</HDText>
      </View>
    );
  }

  /**Render Input Items */
  renderFields = () => {
    const { objEsign } = this.props
    if (objEsign) {
      if (objEsign.data) {
        const data = objEsign.data
        if (data.configs) {
          const listForm = data.configs
          return listForm.map(item => {
            return (
              <HDTextInput
                ref={ref => { this.arrRefs.push(ref) }}
                placeholderTextColor={Context.getColor("placeholderColor1")}
                label={item.name}
                containerStyle={styles.input}
                inputContainerStyle={styles.input_container}
                labelStyle={styles.input_label}
                inputStyle={styles.special_text}
                editable={false}
                showLabel={true}
              />
            )
          })
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_container}>
          <HDComplete
            style={{ position: 'absolute', height: Context.getSize(300), width: '100%' }}
            componentText={this.renderCompleteStatus()}
          />

          <View style={styles.info}>
            <HDForm style={{ paddingTop: 16 }}>
              <HDTextInput
                ref={ref => (this.ipContractNo = ref)}
                placeholder={Context.getString(
                  "loan_tab_add_confirm_contract_no"
                )}
                placeholderTextColor={Context.getColor("placeholderColor1")}
                label={Context.getString("loan_tab_add_confirm_contract_no")}
                containerStyle={styles.input}
                inputContainerStyle={styles.input_container}
                labelStyle={styles.input_label}
                inputStyle={styles.input_text}
                editable={false}
                showLabel={true}
              />

              {this.renderFields()}
            </HDForm>
          </View>
        </ScrollView>

        <BottomButton
          title={Context.getString("loan_tab_esign_button_loan_manager")}
          onPress={this.onPressLoanManager}
        />

        <ModalPopupEmail
          ref={ref => this.modalEmail = ref}
          isVisible={this.state.modalEmail}
          onSendEmail={this.callSendMailAPI}
          pressCancelX={this.hideModalEmail}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  status_container: {
    marginTop: 16
  },
  status_text: {
    fontSize: Context.getSize(14),
    fontWeight: '500',
    color: Context.getColor("textBlue1"),
    lineHeight: Context.getSize(20),
    textAlign: 'center',
  },
  status_text_bold: {
    fontSize: Context.getSize(14),
    fontWeight: 'bold',
    color: Context.getColor("textBlue1"),
  },
  scroll: {
    flex: 1,
  },
  scroll_container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: bottomHeight + 16,
    paddingTop: 8
  },
  info: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Context.getSize(319 - 100 - 34)
  },

  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_name: {
    marginBottom: 24
  },
  input: {
    paddingHorizontal: 16
  },
  input_container: {
    borderBottomWidth: Context.getSize(1),
    borderColor: "#E7ECF0"
  },
  input_label: {
    fontSize: Context.getSize(10),
    fontWeight: '400',
    lineHeight: Context.getSize(14),
    color: Context.getColor("textBlack")
  },
  input_text: {
    fontSize: Context.getSize(14),
    fontWeight: '500',
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlack")
  },
  special_text: {
    fontSize: Context.getSize(14),
    fontWeight: 'bold',
    lineHeight: Context.getSize(19),
    color: Context.getColor("textBlue1")
  },
});
