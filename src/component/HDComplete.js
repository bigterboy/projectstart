import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import PropTypes from 'prop-types';

import { HDText } from "component";

import Context from "context";

export default class HDComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: this.props.value
        }
    }

    componentDidUpdate() { }
    componentDidMount() { }

    renderStatusText() {
        if (this.props.status) {
            return (
                <HDText
                    style={[styles.status, { ...this.props.textStyle }]}>
                    {this.props.status}
                </HDText>
            )
        }
        return null

    }

    renderComponentText() {
        if (this.props.componentText) {
            return this.props.componentText
        } else {
            return null
        }
    }

    render() {
        return (
            <ImageBackground
                source={Context.getImage("complete")}
                style={[styles.container, { ...this.props.style }]}
                {...this.props}
            >
                <View style={{ flex: 2, width: '100%' }}></View>
                <View style={{ flex: 3, width: '100%', paddingHorizontal: 24 }}>
                    {this.renderStatusText()}
                    {this.renderComponentText()}
                </View>
            </ImageBackground>

        );
    }
}

HDComplete.propTypes = {
    status: PropTypes.string,
    componentText: PropTypes.element
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Context.getSize(300),
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        fontSize: Context.getSize(14),
        fontWeight: '400',
        textAlign: 'center',
        paddingHorizontal: 24,
        color: Context.getString("textBlack")
    }

});