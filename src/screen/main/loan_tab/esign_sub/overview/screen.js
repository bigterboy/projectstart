import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, HDGroupHeader, HDTextInput, HDForm } from "component";
import BottomButton from '../component/BottomButton'

import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

const bottomHeight = Context.getSize(77)
export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.arrRefs = []
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser()

    const { objEsign } = this.props
    if (objEsign) {
      if (objEsign.data) {
        const data = objEsign.data
        if (data.configs) {
          const configs = data.configs
          configs.forEach((item, index) => {
            this.arrRefs[index * 2].setText((item.valueOle) ? item.valueOle : "")
            this.arrRefs[index * 2 + 1].setText((item.valueChange) ? item.valueChange : "")
          });
        }
      }
    }
  }

  //Auto fill data to input component
  componentDidUpdate = (prevProps) => {
    const { objEsign } = this.props
    if (objEsign !== prevProps.objEsign) {
      if (objEsign.data) {
        const data = objEsign.data
        if (data.configs) {
          const configs = data.configs
          configs.forEach((item, index) => {
            this.arrRefs[index * 2].setText((item.valueOle) ? item.valueOle : "")
            this.arrRefs[index * 2 + 1].setText((item.valueChange) ? item.valueChange : "")
          });
        }
      }
    }
  }

  onPressConfirm = () => {
    this.props.updateEsignStep(2)
  }

  //Tạm thời data là array
  renderForms = () => {
    const { objEsign } = this.props

    if (objEsign) {
      if (objEsign.data) {
        const data = objEsign.data
        if (data.configs) {
          const listForm = data.configs

          return listForm.map(item => {
            console.log("renderForms: " + item.key + "Old")
            return (
              <View
                key={item.key}
                style={[styles.form, styles.form_name]}>
                <HDGroupHeader
                  style={styles.group_header}
                  leftTextStyle={styles.group_header_text}
                  leftTitle={item.name} />

                <View style={{
                  width: '100%',
                  paddingHorizontal: 16
                }}>
                  <View
                    style={styles.form_content}>
                    <HDTextInput
                      ref={ref => { this.arrRefs.push(ref) }}
                      placeholder={Context.getString(
                        "loan_tab_esign_sub_overview_old_info"
                      )}
                      placeholderTextColor={Context.getColor("placeholderColor1")}
                      label={Context.getString("loan_tab_esign_sub_overview_old_info")}
                      containerStyle={styles.input}
                      inputContainerStyle={styles.input_container}
                      labelStyle={styles.input_label}
                      inputStyle={styles.input_text}
                      editable={false}
                      showLabel={true}
                    />

                    <HDTextInput
                      ref={ref => { this.arrRefs.push(ref) }}
                      placeholder={Context.getString(
                        "loan_tab_esign_sub_overview_new_info"
                      )}
                      placeholderTextColor={Context.getColor("placeholderColor1")}
                      label={Context.getString("loan_tab_esign_sub_overview_new_info")}
                      containerStyle={styles.input}
                      inputContainerStyle={styles.input_container}
                      labelStyle={styles.input_label}
                      inputStyle={styles.special_text}
                      editable={false}
                      showLabel={true}
                    />
                  </View>
                </View>

              </View>
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
          {this.renderForms()}
        </ScrollView>

        <BottomButton
          title={Context.getString("loan_tab_esign_button_accept")}
          onPress={this.onPressConfirm}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  scroll: {
    flex: 1,
  },
  scroll_container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: bottomHeight + 16,
  },
  group_header: {
    marginBottom: 8
  },
  group_header_text: {
    fontSize: Context.getSize(12),
    lineHeight: Context.getSize(15),
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_name: {
    marginBottom: 8
  },
  form_content: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 4,
    shadowOpacity: 1,
    shadowColor: Context.getColor("shadowForm"),
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    backgroundColor: 'white',
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
