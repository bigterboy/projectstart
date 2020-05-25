import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { HDButton, HDText } from "component";
import Context from "context";

export default class ModalWarningForgot extends Component {
    _onConfirm = () => {
        if (this.props.onConfirm) this.props.onConfirm()
    }

    _onCancel = () => {
        if (this.props.onCancel) this.props.onCancel()
    }

    render() {
        const { isVisible } = this.props
        if (isVisible) {
            return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <HDText style={styles.title}>
                            {Context.getString("modal_warning_forgot_password_expired_title")}
                        </HDText>

                        <HDText style={styles.message}>
                            {Context.getString("modal_warning_forgot_password_expired_message")}
                        </HDText>

                        <View style={{ width: '100%' }}>
                            <HDButton
                                style={styles.button_agree}
                                title={Context.getString("modal_warning_forgot_password_expired_agree")}
                                isShadow={true}
                                onPress={this._onConfirm}
                            />

                            <HDButton
                                style={styles.button_decide}
                                textStyle={styles.button_decide_text}
                                title={Context.getString("modal_warning_forgot_password_expired_decide")}
                                isShadow={true}
                                onPress={this._onCancel}
                            />
                        </View>
                    </View>
                </View>
            );
        } else {
            return null
        }
    }
}
const styles = StyleSheet.create({
    container: {
        position:'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Context.getColor("modalBackground"),
        paddingHorizontal: 16
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 7,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: Context.getSize(16),
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 16,
        color: Context.getColor("textBlack")
    },
    message: {
        fontSize: Context.getSize(14),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 16,
        color: Context.getColor("textBlack")
    },
    button_agree: {
        width: '100%',
        marginBottom: 8
    },
    button_decide: {
        width: '100%',
        backgroundColor:'white'
    },
    button_decide_text: {
        color: Context.getColor("black")
    }
});
