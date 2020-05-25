/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import Context from 'context'
import PropTypes from 'prop-types';
import { HDText } from "component";

export default class HDErrorMessage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { errorMessage } = this.props
        if (errorMessage) {
            return (
                <View {...this.props} style={[styles.container, { ...this.props.style }]}>
                    <HDText style={[styles.text, { ...this.props.textStyle }]}>{errorMessage}</HDText>
                </View>
            )
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: Context.getSize(10),
        fontWeight: '500',
        lineHeight: Context.getSize(12),
        textAlign: 'left',
        color: Context.getColor("textRed"),
    },
});
