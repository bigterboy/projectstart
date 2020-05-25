import React, { Component } from "react";
import {
    StyleSheet, View,
    Image,
    TouchableOpacity
} from "react-native";
import PropTypes from 'prop-types';
import { HDButton, HDTextInput, KeyboardAvoiding, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalSerialNo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isVisible) {
            this.setState({
                data: this.props.data
            }, () => {
                const { data } = this.state
                const frameNo = (data.chassisNo) ? data.chassisNo : ""
                const electNo = (data.enginerNo) ? data.enginerNo : ""
                // if (this.ipFrameNo) this.ipFrameNo.setText(frameNo)
                // if (this.ipElectNo) this.ipElectNo.setText(electNo)

                if (frameNo && electNo) {
                    this.btnContinue.setDisabled(false)
                } else {
                    this.btnContinue.setDisabled(true)
                }

                this.ipFrameNo.setText(frameNo)
                this.ipElectNo.setText(electNo)

            })
        }
    }

    renderCloseX() {
        return (
            <View
            style={{
              width: "100%",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
              style={{paddingLeft: 10,paddingTop: 10,paddingBottom: 8}}
            >
              <Image
                source={Context.getImage("closePopup")}
                style={styles.close_icon}
              />
            </TouchableOpacity>
          </View>
        )
    }

    onConfirm = () => {
        if (this.props.onPressConfirm) {
            this.props.onPressConfirm(
                this.ipFrameNo.getText(),
                this.ipElectNo.getText()
            )
        }
    }

    checkStateButton = () => {
        console.log("checkStateButton")
        const frameNo = (this.ipFrameNo) ? this.ipFrameNo.getText() : ""
        const electNo = (this.ipElectNo) ? this.ipElectNo.getText() : ""
        if ((frameNo != "") && (electNo != "")) {
            if (this.btnContinue) this.btnContinue.setDisabled(false)
        } else {
            if (this.btnContinue) this.btnContinue.setDisabled(true)
        }
    }

    onChangeInput = () => {
        this.checkStateButton()
    }

    createSpacing = (value) => {
        return Util.String.addSpacing(value)
    }

    renderContent = () => {
        const { data } = this.state
        return (
            <View style={styles.content_container}>
                <View style={styles.content_header}>
                    <Image
                        source={Context.getImage("serialLineCode")}
                        style={styles.header_line_code}
                    />
                    <HDText style={styles.contract_code}>{(data) ? this.createSpacing(data.contractNumber) : ""}</HDText>
                </View>
                <View style={styles.content_bottom}>
                    <HDText style={[styles.bottom_text, styles.title]}>
                        {Context.getString("component_modal_serial_no_title")}
                    </HDText>
                    <HDText style={[styles.bottom_text, styles.description]}>
                        {Context.getString("component_modal_serial_no_des")}
                    </HDText>

                    <HDTextInput
                        ref={ip => { this.ipFrameNo = ip }}
                        placeholder={Context.getString(
                            "component_modal_serial_no_placeholder_1"
                        )}
                        label={Context.getString("component_modal_serial_no_1")}
                        containerStyle={{ marginTop: 16 }}
                        inputContainerStyle={styles.input_container}
                        labelStyle={styles.input_label}
                        inputStyle={styles.input_text}
                        showLabel={true}
                        onChangeTextInput={this.onChangeInput}
                    />

                    <HDTextInput
                        ref={ip => { this.ipElectNo = ip }}
                        placeholder={Context.getString(
                            "component_modal_serial_no_placeholder_1"
                        )}
                        label={Context.getString("component_modal_serial_no_2")}
                        inputContainerStyle={styles.input_container}
                        labelStyle={styles.input_label}
                        inputStyle={styles.input_text}
                        showLabel={true}
                        onChangeTextInput={this.onChangeInput}
                    />
                </View>

                <View style={styles.button_container}>
                    <HDButton
                        ref={ref => this.btnContinue = ref}
                        style={styles.button}
                        title={Context.getString("common_continue")}
                        onPress={this.onConfirm} />
                </View>
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
                style={{ justifyContent: 'center', alignItems: 'center' }}
                {...this.props}
            >
                
                {/* android tai thỏ cần cái này */}
                <StatusBarCustom />  

                <KeyboardAvoiding style={styles.container}>

                    {this.renderCloseX()}

                    {this.renderContent()}

                </KeyboardAvoiding>
            </Modal>
        );
    }
}

ModalSerialNo.propTypes = {
    onPressConfirm: PropTypes.func,
    data: PropTypes.object
    // contractCode: PropTypes.string,
    // frameNo: PropTypes.string,
    // electNo: PropTypes.string
}

const styles = StyleSheet.create({
    close_icon: {
        width: Context.getSize(16),
        height: Context.getSize(16),
    },
    container: {
        width: win.width,
        height: win.height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    content_container: {
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 5,
        paddingBottom: 16,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    content_header: {
        width: '100%',
        height: Context.getSize(110),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Context.getColor("accent")
    },
    header_line_code: {
        width: Context.getSize(267),
        height: Context.getSize(50),
        marginBottom: 8
    },
    contract_code: {
        fontSize: Context.getSize(14),
        fontWeight: '400',
        color: Context.getColor("textWhite")
    },
    content_bottom: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    bottom_text: {
        fontSize: Context.getSize(14),
        color: Context.getColor("textBlack"),
        lineHeight: Context.getSize(20)
    },
    title: {
        fontWeight: '400',
    },
    description: {
        fontWeight: '500'
    },
    input_container: {
        borderBottomWidth: Context.getSize(1),
        borderColor: Context.getColor("focusBorder")
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
    button_container: {
        width: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center', alignItems: 'center'
    },
    button: {
        width: Context.getSize(219)
    }

});
