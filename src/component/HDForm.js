

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import Context from 'context'

export default class HDForm extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View {...this.props} style={[styles.container,{...this.props.style}]}>

                {this.props.children}
{/*             
                <Image
                    source={Context.getImage("loanFormBottom")}
                    style={styles.bottom_image}
                /> */}
            </View>
        );
    }
}

HDForm.propTypes = {
    // onPressItem: PropTypes.func
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
