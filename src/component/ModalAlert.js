/**
 * This modal use to show some alert same Alert popup android and ios
 */

import React, { Component } from "react";
import {
    StyleSheet, View
} from "react-native";
import PropTypes from 'prop-types';
import { HDButton, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalAlert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: "",
            typeYesNo: false
        }
    }

    setErrorMessage = (message, typeYesNo) => {
        this.setState({
            errorMessage: message,
            typeYesNo: typeYesNo
        })
    }

    onConfirm = () => {
        if (this.props.onPressConfirm) this.props.onPressConfirm()
    }

    onCancel = () => {
        if (this.props.onCancel) this.props.onCancel()
    }

    renderContent = () => {
        const { errorMessage, typeYesNo } = this.state
        return (
            <View style={styles.content_container}>
                <HDText style={styles.error_text}>{errorMessage}</HDText>

                <HDButton
                    style={{
                        marginBottom: (typeYesNo) ? 8 : 0
                    }}
                    title={Context.getString("common_button_ok")}
                    isShadow={true}
                    onPress={this.onConfirm} />

                {this.renderCancel()}
            </View>
        )
    }

    renderCancel = () => {
        const { typeYesNo } = this.state
        if (typeYesNo) {
            return (
                <HDButton
                    style={{
                        backgroundColor: 'white', 
                        borderWidth:0.5,
                        borderColor:Context.getColor("normalBorder")
                    }}
                    textStyle = {{color:Context.getColor("textBlack")}}
                    title={Context.getString("common_button_no")}
                    isShadow={true}
                    onPress={this.onCancel} />
            )
        }
        return null
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

ModalAlert.propTypes = {
    onPressConfirm: PropTypes.func,
    errorMessage: PropTypes.string
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    error_text: {
        fontSize: Context.getSize(14),
        lineHeight: Context.getSize(22),
        fontWeight: '500',
        textAlign: 'center',
        color: Context.getColor("textBlack"),
        marginBottom: 16
    },
    button_container: {
        width: '100%',
        paddingHorizontal: 16,
        // paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%'
    }
});
