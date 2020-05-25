/**
 * This component used for Home page
 * Show number of waiting contract for Esign
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, Image,
    TouchableOpacity
} from 'react-native';

import Util from 'util'
import PropTypes from 'prop-types';
import Context from 'context'
import { HDText } from "component";

const iconContract = Context.getImage("iconContract")
const iconArrow = Context.getImage("arrowRight")

export default class HDRemindView extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * Get Background color by type
     * 1:Contract Esign
     * 2:Contract Adjustment
     */
    getBlurColor = () => {
        const { type } = this.props
        if (type == 1) {
            return Context.getColor("blurColor")
        } else if (type == 2) {
            return Context.getColor("blurColorSubEsign")
        }
    }

    getStatus =()=>{
        const { type } = this.props
        if (type == 1) {
            return Context.getString("component_remind_view_status")
        } else if (type == 2) {
            return Context.getString("component_remind_view_status_Adjustment")
        }else{
            return ""
        }
    }

    render() {
        const { numOfContract } = this.props
        const blurColor = this.getBlurColor()
        const statusText = (this.getStatus()) ? this.getStatus() : ""
        return (
            <TouchableOpacity {...this.props}
                style={[
                    styles.container,
                    { backgroundColor: blurColor },
                    { ...this.props.style }]}>
                <View style={styles.left_container}>
                    <Image source={iconContract} style={styles.iconLeft}></Image>
                </View>

                <View style={styles.center_container}>
                    <HDText style={styles.text}>
                        <HDText
                            style={styles.text}
                            adjustsFontSizeToFit={true}
                            minimumFontScale={0.01}>
                            {Util.String.format(statusText, numOfContract)}
                        </HDText>
                    </HDText>
                </View>
                <View style={styles.right_container}>
                    <Image source={iconArrow} style={styles.iconRight}></Image>
                </View>
            </TouchableOpacity>
        );
    }
}

HDRemindView.propTypes = {
    numOfContract: PropTypes.number,
    type: PropTypes.number
    //type: Use for esign and adjustment
    //1:esign - 2:adjustment
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 6,
        width: Context.getSize(343),
        height: Context.getSize(80),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Context.getSize(16)
    },
    left_container: {
        width: Context.getSize(64),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconLeft: {
        width: Context.getSize(32),
        height: Context.getSize(32),
    },
    center_container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    right_container: {
        width: Context.getSize(48),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconRight: {
        width: Context.getSize(8),
        height: Context.getSize(12),
    },
    text: {
        color: Context.getColor("textWhite"),
        fontSize: Context.getSize(12),
        fontWeight: '500',
    }
});
