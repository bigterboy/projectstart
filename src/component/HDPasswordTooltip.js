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
    ImageBackground,
    View,
    Text
} from 'react-native';

import Context from 'context'
import Util from 'util'
import PropTypes from 'prop-types';
import { HDText } from "component";


export default class HDPasswordTooltip extends Component {

    constructor(props) {
        super(props)
    }

    //least 6 characters
    checkLength = (value) => {
        return Util.String.regexCheckLength(value)
    }

    //Contain number and alphabet
    checkNumAndText = (value) => {
        return Util.String.regexCheckNumAndText(value)
    }

    //Contain upper and lower, special characters
    checkUpLow = (value) => {
        return Util.String.regexCheckUpLowCase(value)
    }

    //Get state validate
    getStateValidate=()=>{
        const {validateValue } = this.props
        const correctLength = this.checkLength(validateValue)
        const correctNumText = this.checkNumAndText(validateValue)
        const correctUpLow = this.checkUpLow(validateValue)

        if (correctLength & correctNumText & correctUpLow){
            return true
        }
        return false
    }
    

    render() {
        const { isVisible, validateValue } = this.props
        const correctLength = this.checkLength(validateValue)
        const correctNumText = this.checkNumAndText(validateValue)
        const correctUpLow = this.checkUpLow(validateValue)

        if (isVisible) {
            return (
                <ImageBackground {...this.props}
                    source={Context.getImage("tooltipInput")}
                    style={[styles.container, { ...this.props.style }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[
                            styles.circle,
                            (correctLength) ? styles.correct : null
                        ]}></View>
                        <HDText style={styles.text}>{Context.getString("common_tooltip_validate_01")}</HDText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[
                            styles.circle,
                            (correctNumText) ? styles.correct : null
                        ]}></View>
                        <HDText style={styles.text}>{Context.getString("common_tooltip_validate_02")}</HDText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[
                            styles.circle,
                            (correctUpLow) ? styles.correct : null
                        ]}></View>
                        <HDText style={styles.text}>{Context.getString("common_tooltip_validate_03")}</HDText>
                    </View>

                </ImageBackground>
            );
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: Context.getSize(292),
        height: Context.getSize(135),
        justifyContent: 'space-evenly',
        paddingHorizontal: 32,
        paddingVertical: 16
    },
    text: {
        fontSize: Context.getSize(12),
        fontWeight: '400',
        lineHeight: Context.getSize(18),
        paddingLeft: 16,
        color: Context.getColor("textBlack")
    },
    circle: {
        width: Context.getSize(8),
        height: Context.getSize(8),
        borderRadius: Context.getSize(4),
        backgroundColor: Context.getColor("primary"),
    },
    correct: {
        backgroundColor: '#6DD400',
    }
});
