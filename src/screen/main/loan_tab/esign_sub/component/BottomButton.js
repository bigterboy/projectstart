

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';

import {
    HDButton
} from "component";

import PropTypes from 'prop-types';

import Context from 'context'

const bottomHeight = Context.getSize(77)
export default class BottomButton extends Component {

    constructor(props) {
        super(props)
    }
    BottomButton
    render() {
        return (
            <View style={[styles.container, { ...this.props.style }]}>
                <HDButton {...this.props} isShadow={true} />
            </View>
        );
    }
}

BottomButton.propTypes = {

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: bottomHeight,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: Context.getColor("background")
    },
});
