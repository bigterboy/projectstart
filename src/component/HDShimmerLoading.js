

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import Context from 'context'

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

export default class HDShimmerLoading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ShimmerPlaceHolder
                    autoRun={true}
                    style={{width:'100%', height: 50}}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Context.getSize(343),
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Context.getColor("background"),
        borderWidth: 1,
        borderColor: '#E5EAEF',
        shadowOpacity: 0.2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        elevation: 3
    },
    bottom_image: {
        width: '100%',
        height: Context.getSize(30)
    },
});
