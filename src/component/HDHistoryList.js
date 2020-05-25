

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableHighlight,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import Util from 'util'
import Context from 'context'
import { HDNumberFormat, HDText } from 'component'

export default class HDHistoryList extends Component {

    constructor(props) {
        super(props)
    }

    _renderItem = (item, index) => {
        const strDate = (item) ? Util.HDDate.formatTo(item.monthlyDueDate) : ""
        return (
            <View key={"item-" + index}
                style={styles.item_container}>
                <View style={styles.item_sub_container}>
                    <HDText style={styles.date_text}>{strDate}</HDText>
                    <HDNumberFormat value={item.monthlyInstallmentAmount} style={styles.amount_text} />
                </View>

                <View style={styles.line} />
            </View>
        );
    }

    _renderHeader = () => {
        if (this.props.isShowHeader) {
            return (
                <View style={styles.header}>
                    <HDText style={styles.header_text}>{Context.getString("component_history_list_date")}</HDText>
                    <HDText style={styles.header_text}>{Context.getString("component_history_list_amount")}</HDText>
                </View>
            );
        }
        return null
    }

    render() {
        const { items } = this.props
        return (
            <View {...this.props} style={[styles.container, { ...this.props.style }]}>
                {this._renderHeader()}

                {items.map((item, index) => this._renderItem(item, index))}
            </View>

        );
    }
}

HDHistoryList.propTypes = {
    items: PropTypes.array
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: 'white',
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 4 },
        elevation: 3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Context.getSize(343),
        height: Context.getSize(49),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: Context.getColor('accent2'),
        paddingHorizontal: 16
    },
    header_text: {
        fontSize: Context.getSize(14),
        fontWeight: 'bold',
        color: Context.getColor("textWhite")
    },
    item_container: {
        width: Context.getSize(343),
        height: Context.getSize(51),
        paddingHorizontal: 16,
    },
    item_sub_container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date_text: {
        fontSize: Context.getSize(14),
        fontWeight: '700',
        color: Context.getColor("textBlack"),
    },
    amount_text: {
        fontSize: Context.getSize(14),
        fontWeight: '700',
        color: Context.getColor("textBlue1"),
    },
    line: {
        width: '100%',
        height: Context.getSize(1),
        backgroundColor: Context.getColor("separatorLine")
    }

});
