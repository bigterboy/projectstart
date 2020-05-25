import React, { Component } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
import PropTypes from 'prop-types';
import { HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalActionSheet extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [
                Context.getString("common_take_photo"),
                Context.getString("common_choose_from_library")
            ]
        }
    }

    _onPressItem = (item, index) => {
        console.log("_onPressItem: " + item + "-" + index)
        if (this.props.onPressItem) {
            this.props.onPressItem(item, index)
        }
    }

    _onPressCancel = () => {
        if (this.props.onPressCancel) this.props.onPressCancel()
    }

    renderSeparatorLine = (index) => {
        const { items } = this.state
        if (index < items.length - 1) {
            return (
                <View style={styles.item_line}></View>
            )
        }
        return null
    }

    renderItem = (item, index) => {
        return (
            <TouchableOpacity
                key={item + "-" + index}
                style={styles.item_container}
                onPress={() => this._onPressItem(item, index)}
            >
                <HDText style={styles.item_text}>{item}</HDText>
                {this.renderSeparatorLine(index)}
            </TouchableOpacity>
        )
    }

    renderContent = () => {
        const { items } = this.state
        return (
            <View style={styles.content_container}>
                {/* Items */}
                <View style={{ width: '100%', borderRadius: 10, marginBottom: 16, overflow: 'hidden' }}>
                    {
                        items.map((item, index) => {
                            return this.renderItem(item, index)
                        })
                    }
                </View>

                {/* Cancel */}
                <TouchableOpacity
                    style={[styles.item_container, styles.item_cancel]}
                    onPress={this._onPressCancel}
                >
                    <HDText style={styles.item_text}>{Context.getString("common_cancel")}</HDText>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <Modal
                {...this.props}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                backdropOpacity={0.2}
                animationIn="slideInUp"
                animationOut="fadeOutDown"
                animationOutTiming={100}
                // onBackButtonPress={this.props.onCancel}
                style={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {/* android tai thỏ cần cái này */}
                <StatusBarCustom />
                <View style={styles.container}>
                    {this.renderContent()}
                </View>
            </Modal>
        );
    }
}

ModalActionSheet.propTypes = {
    onPressItem: PropTypes.func,
    onPressCancel: PropTypes.func
}

const styles = StyleSheet.create({
    close_icon: {
        width: Context.getSize(16),
        height: Context.getSize(16),
    },
    container: {
        width: win.width,
        height: win.height,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    content_container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'red',
        paddingBottom: 16,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    item_container: {
        width: '100%',
        height: Context.getSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    item_cancel: {
        borderRadius: 10,
        marginBottom: 16
    },
    item_text: {
        fontSize: Context.getSize(16),
        fontWeight: '500',
        color: Context.getColor("textBlue1")
    },
    item_line: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: Context.getSize(1),
        backgroundColor: Context.getColor("separatorLine")
    }
});
