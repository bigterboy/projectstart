import React, { Component } from "react";
import {
    StyleSheet, View, Text,
    Image,
    TouchableOpacity, ScrollView
} from "react-native";
import PropTypes from 'prop-types';
import { HDButton, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalWarningPhone extends Component {

    constructor(props) {
        super(props)
    }

    onReceiveOTP = () => {
        if (this.props.onReceiveOTP) this.props.onReceiveOTP()
    }

    onDoLater = () => {
        if (this.props.onDoLater) this.props.onDoLater()
    }

    renderContent = () => {
        return (
            <View style={styles.content_container}>
                <HDText style={styles.title}>{Context.getString("modal_warning_phone_title")}</HDText>
                <HDText style={styles.phone_number}>
                    {Util.String.securityPhone(this.props.phoneNumber)}
                </HDText>

                <HDText style={styles.message}>{Context.getString("modal_warning_phone_message")}</HDText>

                <HDButton
                    title={Context.getString("modal_warning_phone_button_receive")}
                    isShadow
                    style={styles.button_receive}
                    onPress={this.onReceiveOTP}
                />

                <HDButton
                    title={Context.getString("modal_warning_phone_button_after")}
                    isShadow
                    style={styles.button_do_later}
                    textStyle={styles.button_do_later_text}
                    onPress={this.onDoLater}
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
                style={{ justifyContent: 'center', alignItems: 'center' }}
                {...this.props}
            >

                {/* android tai thỏ cần cái này */}
                <StatusBarCustom />

                <View style={styles.container}>

                    {this.renderContent()}

                </View>
            </Modal>
        );
    }
}

ModalWarningPhone.propTypes = {
    onReceiveOTP: PropTypes.func,
    onDoLater: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        width: win.width,
        height: win.height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    content_container: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white'
    },
    title: {
        fontSize: Context.getSize(14),
        lineHeight: Context.getSize(20),
        fontWeight: '400',
        textAlign: 'center',
    },
    phone_number: {
        fontSize: Context.getSize(14),
        fontWeight: 'bold',
        lineHeight: Context.getSize(22),
        color: Context.getColor("textBlue1"),
        marginBottom: 24
    },
    message: {
        fontSize: Context.getSize(14),
        lineHeight: Context.getSize(22),
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 24
    },
    button_receive: {
        marginBottom: 16
    },
    button_do_later: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: Context.getColor("normalBorder")
    },
    button_do_later_text: {
        color: Context.getColor("textBlack"),
    }
});

