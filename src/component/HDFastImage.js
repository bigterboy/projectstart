import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Context from 'context'
const FImage = createImageProgress(FastImage);

export default class HDFastImage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <FImage {...this.props}>
                {this.props.children}
            </FImage>
        );
    }
}

HDFastImage.propTypes = {
    // onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
   
});
