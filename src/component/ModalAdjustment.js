/**
 * This Modal using at Home Page
 * Show popup Contract Adjustment 
 */

import React, { Component } from "react";
import {
    StyleSheet, View, Text,
    Image,
    TouchableOpacity, ScrollView
} from "react-native";
import PropTypes from 'prop-types';
import { HDButton, HDFastImage, HDText, StatusBarCustom } from "component";

import Util from "util";
import Context from "context";
import Modal from "react-native-modal";

const win = Context.getWindow()

export default class ModalAdjustment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    renderCloseX() {
        return (
            <View
                style={{
                    width: "100%",
                    alignItems: "flex-end",
                }}
            >
                <TouchableOpacity
                    onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
                    style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 8 }}
                >
                    <Image
                        source={Context.getImage("closePopup")}
                        style={styles.close_icon}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    onPressConfirm = () => {
        const { data } = this.props
        if (this.props.onPressConfirm) {
            this.props.onPressConfirm(data)
        }
    }

    /**
     * render message by loanType loanCode
     */
    renderMessage = () => {
        const { data } = this.props
        let message = Context.getString("component_modal_adjustment_message")

        if (data) {
            message = Util.String.format(
                Context.getString("component_modal_adjustment_message"), 
                data.valueChanges.join(", ")
            )
            if (data.loanCode == Util.Constant.LOAN_TYPE.CL) {
                message = Util.String.format(
                    message = Context.getString("component_modal_adjustment_message_CL"),
                    data.valueChanges.join(", ")
                )
                // message = Context.getString("component_modal_adjustment_message_CL")
            }
        }

        return (
            <HDText style={styles.bottom_text}>
                {message}
            </HDText>
        )
    }

    /**
     * render Image
     */
    renderImage = () => {
        const { data } = this.props
        if (data) {
            if (data.urlImage) {
                return (
                    <HDFastImage
                        source={{ uri: data.urlImage }}
                        style={styles.product_image}
                    />
                )
            }
        }
        return null
    }

    renderContent = () => {
        const { data } = this.props
        const loanType = (data.loanType) ? data.loanType : ""
        const amount = (data.loanAmount) ? data.loanAmount : 0
        const contractCode = (data.contractCode) ? data.contractCode : ""
        return (
            <View style={styles.content_container}>
                <View style={styles.header}>
                    <Image
                        style={styles.header_image}
                        source={Context.getImage("headerAdjustment")}
                        resizeMode="contain">
                    </Image>

                    <View style={{
                        width: '100%',
                        height: '100%',
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 0
                    }}>

                        <HDText style={styles.header_title}>{Context.getString("component_modal_adjustment_title")}</HDText>

                        <View style={styles.contract}>

                            <View style={{
                                paddingTop: 16,
                                paddingLeft: 16,
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                zIndex: 1,
                                height: '100%'
                            }}>
                                <HDText style={styles.loan_type}>{loanType}</HDText>
                                <HDText style={styles.loan_amount}>{Util.String.formatMoney(amount)}</HDText>
                                <HDText>
                                    <HDText style={styles.contract_prefix}>{Context.getString("component_modal_adjustment_contract_prefix")}</HDText>
                                    <HDText style={styles.contract_text}>{contractCode}</HDText>
                                </HDText>
                            </View>

                            <View style={styles.right_container}>
                                {this.renderImage()}
                            </View>

                        </View>
                    </View>

                </View>
                <View style={styles.bottom_container}>

                    <ScrollView style={{ height: 200 }}>
                        {this.renderMessage()}
                    </ScrollView>


                    <HDButton
                        ref={ref => this.btnConfirm = ref}
                        isShadow={true}
                        title={Context.getString("component_modal_adjustment_button_sign")}
                        onPress={this.onPressConfirm} />
                </View>
            </View>
        )
    }

    render() {
        return (
            <Modal
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                backdropOpacity={0.50}
                animationIn="zoomInDown"
                animationOut="fadeOut"
                animationOutTiming={200}
                // onBackButtonPress={this.props.onCancel}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                {...this.props}
            >

                {/* android tai thỏ cần cái này */}
                <StatusBarCustom />

                <View style={styles.container}>

                    {this.renderCloseX()}

                    {this.renderContent()}

                </View>
            </Modal>
        );
    }
}

ModalAdjustment.propTypes = {
    onPressConfirm: PropTypes.func,
    data: PropTypes.object
    // contractCode: PropTypes.string,
    // frameNo: PropTypes.string,
    // electNo: PropTypes.string
}

const styles = StyleSheet.create({
    close_icon: {
        width: Context.getSize(16),
        height: Context.getSize(16),
    },
    container: {
        width: win.width,
        height: win.height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    content_container: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    header: {
        width: '100%',
        height: Context.getSize(203),
        alignItems: 'center'
    },
    header_image: {
        width: '100%',
        height: Context.getSize(170)
    },
    header_title: {
        fontSize: Context.getSize(16),
        fontWeight: 'bold',
        lineHeight: Context.getSize(20),
        color: Context.getColor("textWhite")
    },
    contract: {
        width: '100%',
        height: Context.getSize(143),
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: Context.getColor("cellBorder"),
        shadowOpacity: 0.5,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 4 },
        elevation: 3
    },
    loan_type: {
        fontSize: Context.getSize(12),
        fontWeight: 'bold',
        lineHeight: Context.getSize(18)
    },
    loan_amount: {
        fontSize: Context.getSize(18),
        fontWeight: 'bold',
        lineHeight: Context.getSize(22),
        color: Context.getColor("textBlue1"),
        marginBottom: 8
    },
    contract_prefix: {
        fontSize: Context.getSize(12),
        fontWeight: '400',
        lineHeight: Context.getSize(18),
        color: Context.getColor("textBlack")
    },
    contract_text: {
        fontSize: Context.getSize(12),
        fontWeight: 'bold',
        lineHeight: Context.getSize(18),
        color: Context.getColor("textBlue1")
    },
    right_container: {
        position: 'absolute',
        zIndex: 0,
        right: 0,
        width: Context.getSize(176),
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 8 + 8 + 22,
        paddingLeft: 16,
        borderBottomRightRadius: 6,
        overflow: 'hidden'
    },
    product_image: {
        flex: 1,
        width: '100%',
    },

    bottom_container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24
    },
    bottom_text: {
        fontSize: Context.getSize(14),
        lineHeight: Context.getSize(20),
        fontWeight: '400',
        marginBottom: 32,
        color: Context.getColor("textBlack")
    },
});
