

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { HDButton, HDNumberFormat, HDFastImage, HDText } from 'component'

import Context from 'context'
import Util from 'util'

// const itemHeight
const iconSign = Context.getImage("contract_item_icon_sign")

export default class HDContractListItem extends Component {
    constructor(props) {
        super(props)

        //cellType:
        //-0: list contract on Home (Hợp đồng đợi ký)
        //-1: waiting //Trước dùng cho popup
        //-2: signed  //Trước dùng cho popup
        //-3: waiting with button  //
        //-4: signed with button    //
        //-5: sub contract (Phụ lục hợp đồng)
        this.cellType = this.props.cellType
    }

    renderBlurView = (item) => {
        if (this.cellType === 0 || this.cellType === 5) {
            const blurColor = (this.cellType === 0) ? styles.blur_blue : styles.blur_yellow
            const btnColor = (this.cellType === 0) ? styles.button_yellow : styles.button_blue
            const btnTitle = (this.cellType === 0) ? Context.getString("component_contract_item_sign_now") : Context.getString("component_contract_item_sign_sub_esign")
            const contractStatus = (this.cellType === 0) ? Context.getString("component_contract_item_status_esign") : Context.getString("component_contract_item_status_sub_esign")
            return (
                <View style={[styles.blur_container, blurColor]}>
                    <HDButton
                        style={{ ...styles.item_button, ...btnColor }}
                        textStyle={styles.item_button_text}
                        title={btnTitle}
                        leftIcon={iconSign}
                        onPress={() => this.props.onPressItem ? this.props.onPressItem(item) : null}
                    />
                    <HDText style={styles.item_status}>{contractStatus}</HDText>
                </View>
            )
        }
        return null
    }

    renderStatus = () => {
        const { item } = this.props
        if (this.cellType !== 0 && this.cellType !== 5) {
            const bgColor = ((this.cellType === 1) || (this.cellType === 3)) ? Context.getColor("stateWait") : Context.getColor("stateSigned")
            const textColor = ((this.cellType === 1) || (this.cellType === 3)) ? Context.getColor("stateWaitText") : Context.getColor("stateSignedText")
            // const text = ((this.cellType === 1) || (this.cellType === 3)) ? Context.getString("component_contract_item_wait") : Context.getString("component_contract_item_state_signed")

            return (
                <View style={{ width: '100%', paddingHorizontal: 16 }}>
                    <View
                        style={[
                            styles.status_container,
                            { backgroundColor: bgColor }
                        ]}>
                        <HDText style={[styles.item_sign_state_text, { color: textColor }]}>
                            {item.status}
                        </HDText>
                    </View>
                </View>
            )
        } else {
            return null
        }
    }

    /**
     * Title for button In Item
     */
    bottomButtonTitle = () => {
        const { itemButtonTitle } = this.props
        if (this.cellType === 3) {
            if (itemButtonTitle) {
                return itemButtonTitle
            }
            return Context.getString("component_contract_item_sign_now")
        } else {
            return Context.getString("component_contract_item_pay_guild")
        }
    }

    renderBottomBtn = (item) => {
        if ((this.cellType === 3) || (this.cellType === 4)) {
            const text = this.bottomButtonTitle()
            return (
                <HDButton
                    title={text}
                    style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        backgroundColor: '#0E72E1',
                        width: Context.getSize(148),
                        height: Context.getSize(32),
                        borderRadius: Context.getSize(6),
                    }}
                    textStyle={{
                        fontSize: Context.getSize(12),
                        fontWeight: '700',
                        lineHeight: 16
                    }}
                    onPress={() => this.props.onPressItem ? this.props.onPressItem(item) : null}
                />
            )
        }
        return null
    }

    renderImage = () => {
        const { item } = this.props
        //content inside image
        content = () => {
            return (
                <View style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    zIndex: 1,
                    height: '100%'
                }}>
                    <HDText style={styles.item_name_text}>{(item) ? item.loanType : ""}</HDText>

                    <HDNumberFormat
                        value={(item) ? item.loanAmount : 0}
                        style={styles.item_amount_text}
                    />

                    {this.renderDate()}
                </View>
            )
        }

        return (
            <View style={styles.item_image}>
                {content()}
                {this.renderRight()}
            </View>
        )
    }

    renderRight = () => {
        const { item } = this.props
        imageProduct = () => {
            if (item) {
                if (item.urlImage) {
                    return (
                        <HDFastImage
                            source={{ uri: item.urlImage }}
                            style={styles.product_image}
                        />
                    )
                }
            }
        }

        return (
            <View style={styles.right_container}>
                {this.renderStatus()}

                {imageProduct()}
            </View>
        )
    }

    renderDate = () => {
        const { item } = this.props
        let prefixText = ""
        if (this.cellType !== 5) {
            let dateText = ""
            if (this.cellType == 4) {
                prefixText = Context.getString("component_contract_item_signed_date")
                dateText = (item) ? Util.HDDate.formatTo(item.documentVerificationDate) : ""
            } else {
                prefixText = Context.getString("component_contract_item_expire_date")
                dateText = (item) ? Util.HDDate.formatTo(item.endDate) : ""
            }
            return (
                <View style={{ flexDirection: 'row' }}>
                    <HDText style={{ paddingLeft: 16 }}>
                        <HDText style={styles.item_date_status}>{prefixText} </HDText>
                        <HDText style={styles.item_date_text}>{dateText}</HDText>
                    </HDText>
                </View>
            )
        } else {
            prefixText = Context.getString("component_contract_item_contract_code")
            let contractCode = (item) ? item.contractCode : ""
            return (
                <View style={{ flexDirection: 'row' }}>
                    <HDText style={{ paddingLeft: 16 }}>
                        <HDText style={styles.item_date_status}>{prefixText} </HDText>
                        <HDText style={styles.item_date_text}>{contractCode}</HDText>
                    </HDText>
                </View>
            )
        }
        return null
    }

    render() {
        const { item } = this.props
        return (
            <View style={[
                { borderRadius: 5, },
                (this.props.isShadow) ? styles.item_shadow : null
            ]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.onPressMaster ? this.props.onPressMaster(item) : null}
                    style={[
                        styles.item_container,
                        // (this.props.isShadow) ? styles.item_shadow : null,
                        { ...this.props.style }

                    ]}>
                    {this.renderImage()}

                    {this.renderBottomBtn(item)}

                    {this.renderBlurView(item)}

                </TouchableOpacity>
            </View>
        );
    }
}


HDContractListItem.propTypes = {
    item: PropTypes.object,
    cellType: PropTypes.number,
    onPressMaster: PropTypes.func,
    onPressItem: PropTypes.func,
    itemButtonTitle: PropTypes.string
}

const styles = StyleSheet.create({
    item_container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    item_shadow: {
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 5 },
        borderWidth: 0.5,
        borderColor: Context.getColor("cellBorder"),
        elevation: 3
    },
    item_image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    status_container: {
        width: '100%',
        height: Context.getSize(22),
        alignItems: 'center',
        borderRadius: Context.getSize(22 / 2),
        justifyContent: 'center',
        marginBottom: 8
    },
    right_container: {
        position: 'absolute',
        zIndex: 0,
        right: 0,
        width: Context.getSize(176),
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 8,
        paddingLeft: 16,
        borderBottomRightRadius: 6,
        overflow: 'hidden'
    },
    product_image: {
        flex: 1,
        width: '100%',
    },
    blur_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 5
    },
    blur_blue: {
        backgroundColor: Context.getColor("blurColor"),
    },
    blur_yellow: {
        backgroundColor: Context.getColor("blurColorSubEsign"),
    },
    item_button: {
        width: Context.getSize(156),
        height: Context.getSize(40),
        borderRadius: 10,
        marginBottom: 22
    },
    button_blue: {
        backgroundColor: Context.getColor("accent2"),
    },
    button_yellow: {
        backgroundColor: Context.getColor("accent"),
    },
    item_button_text: {
        fontSize: Context.getSize(12),
        fontWeight: '700'
    },
    item_status: {
        color: Context.getColor("textWhite"),
        fontSize: Context.getSize(12),
        lineHeight: Context.getSize(15),
        fontWeight: '500',
        textAlign: 'center'
    },
    item_name_text: {
        paddingHorizontal: 16,
        paddingTop: 16,
        fontSize: Context.getSize(12),
        lineHeight: Context.getSize(18),
        fontWeight: 'bold',
        color: Context.getColor("textBlack")
    },
    item_amount_text: {
        paddingHorizontal: 16,
        marginBottom: 10,
        color: Context.getColor("textBlue1"),
        fontSize: Context.getSize(18),
        fontWeight: '700',
    },
    item_date_status: {
        // paddingLeft: 16,
        marginBottom: 10,
        fontSize: Context.getSize(12),
        fontWeight: '400',
        color: Context.getColor("textBlack"),
    },
    item_date_text: {
        fontSize: Context.getSize(12),
        fontWeight: 'bold',
        color: Context.getColor("textBlack")
    },
    item_sign_state_text: {
        fontSize: Context.getSize(10),
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: Context.getSize(12),
        marginVertical: 5,
        // marginHorizontal: 13
    }

});
