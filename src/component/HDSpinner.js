import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { StatusBarCustom, HDText } from "component"
import Spinner from 'react-native-loading-spinner-overlay';
import Context from 'context'

export default class HDSpinner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Spinner {...this.props}>
                <StatusBarCustom />
                <View style={styles.content}>
                    <ActivityIndicator
                        style={styles.indicator}
                        size="large"
                        color="red" />
                    <HDText style={styles.text}>{Context.getString("app_loading")}</HDText>
                </View>
            </Spinner>
        )
    }
}

const styles = StyleSheet.create({
    modal_container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: Context.getColor("modalBackground"),
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        marginBottom: 8
    },
    text: {
        color: "white",
        fontSize: Context.getSize(16),
        fontWeight: '500'

    }
});