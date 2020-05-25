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
    View
} from 'react-native';
import Context from 'context'
import PropTypes from 'prop-types';

const borderRadius = 10

export default class HDRoundView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View {...this.props} 
                style={[
                    styles.container,
                    styles.shadow,
                    {...this.props.style}]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius
    },
    shadow:{
        shadowOpacity:1,
        shadowColor:Context.getColor("hint"),
        shadowOffset:{width:0, height:4},
        elevation: 3
    }
});
