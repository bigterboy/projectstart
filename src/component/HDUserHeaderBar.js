

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { HDText, HDFastImage } from "component";
import Context from 'context'

const imgEmptyNotify = Context.getImage("iconNotification")
const imgExistNotify = Context.getImage("iconExistNotification")
const imgNoAvatar = Context.getImage("iconAvatar")
const imgLoginByPhone = Context.getImage("loginPhoneAvatar")
export default class HDUserHeaderBar extends Component {

    constructor(props) {
        super(props)
    }

    _onPressBar = () => {
        (this.props.onPressBar) ? this.props.onPressBar() : null
    }

    renderAvatar = () => {
        if (this.props.loginByPhone) {
            return (
                <View style={styles.avatar_container}>
                    <Image
                        source={imgLoginByPhone}
                        style={styles.login_phone_avatar}
                    />
                </View>
            )
        } else {
            if (this.props.avatar) {
                return (
                    <View style={styles.avatar_container}>
                        <HDFastImage
                            style={styles.avatar}
                            source={{
                                uri: this.props.avatar,
                                priority: FastImage.priority.high,
                            }} 
                            PlaceholderContent={<ActivityIndicator />}
                            />
                    </View>
                )
            } else {
                return (
                    <View style={styles.avatar_container}>
                        <HDFastImage
                            style={styles.no_avatar}
                            source={imgNoAvatar}
                        />
                    </View>
                )
            }
        }

    }

    renderName = () => {
        const { name } = this.props
        if (name) {
            return (
                <HDText
                    style={styles.name_text}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}>
                    {this.props.name}
                </HDText>
            )
        }
        return null
    }

    renderPhone = () => {
        const { name, phone } = this.props
        if (phone) {
            return (
                <HDText
                    style={(name) ? styles.phone_text : styles.name_text}>
                    {this.props.phone}
                </HDText>
            )
        }
        return null
    }

    renderNotifyIcon = () => {
        const {existNotify} = this.props
        let imgNotify = (existNotify) ? imgExistNotify : imgEmptyNotify
        return (
            <Image
                source={imgNotify}
                style={styles.icon_notification}>
            </Image>
        )
    }

    render() {
        return (
            <View
                style={[styles.container, { ...this.props.style }]} >
                <TouchableOpacity
                    style={styles.left_container}
                    activeOpacity={1}
                    onPress={this._onPressBar}
                >
                    {this.renderAvatar()}

                    <View
                        style={{
                            flex: 1,
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                        {this.renderName()}
                        {this.renderPhone()}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.right_container}
                    onPress={this.props.onPressNotify ? this.props.onPressNotify : null}>
                   {this.renderNotifyIcon()}
                </TouchableOpacity>
            </View>
        );
    }
}

HDUserHeaderBar.propTypes = {
    loginByPhone: PropTypes.bool,
    name: PropTypes.string,
    phone: PropTypes.string,
    onPressBar: PropTypes.func,
    onPressNotify: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: Context.getSize(50),
        backgroundColor: "transparent",
        paddingHorizontal: 16,
        marginBottom: Context.getSize(16),
    },
    left_container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    right_container: {
        width: Context.getSize(50),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icon_notification: {
        width: Context.getSize(32),
        height: Context.getSize(32)
    },
    avatar_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Context.getSize(50),
        height: Context.getSize(50),
        borderRadius: Context.getSize(25),
        borderWidth: 2,
        borderColor: Context.getColor("avatarBorder"),
        marginRight: 10,
        backgroundColor: Context.getColor("backgroundScreen"),
        overflow: 'hidden',
    },
    avatar: {
        width: Context.getSize(50),
        height: Context.getSize(50),
    },
    no_avatar: {
        width: Context.getSize(25),
        height: Context.getSize(25),
    },
    login_phone_avatar: {
        width: Context.getSize(50),
        height: Context.getSize(50),
    },
    name_text: {
        fontSize: Context.getSize(16),
        lineHeight: Context.getSize(19),
        fontWeight: 'bold',
        color: Context.getColor("textWhite")
    },
    phone_text: {
        fontSize: Context.getSize(12),
        fontWeight: '400',
        color: Context.getColor("textWhite")
    }
});
