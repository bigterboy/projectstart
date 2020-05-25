

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { HDText } from "component";
import Context from 'context'
export default class TabSelection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,

        }
    }

    _onPressTab = (index) => {
        if (this.state.selectedIndex !== index) {
            this.setState({
                selectedIndex: index
            })

            if (this.props.onPressTab) {
                this.props.onPressTab(index)
            }
        }
    }

    render() {
        const { selectedIndex } = this.state
        return (
            <View {...this.props} style={styles.tab_container}>
                <TouchableOpacity onPress={() => this._onPressTab(0)} >
                    <HDText style={[
                        styles.tab_item_text,
                        (selectedIndex == 0) ? styles.selected : styles.unselected
                    ]}>
                        {Context.getString("loan_tab_detail_contract_tab_1")}
                    </HDText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onPressTab(1)}>
                    <HDText style={[
                        styles.tab_item_text,
                        (selectedIndex == 1) ? styles.selected : styles.unselected
                    ]}>
                        {Context.getString("loan_tab_detail_contract_tab_2")}
                    </HDText>
                </TouchableOpacity>
            </View>
        );
    }
}

TabSelection.propTypes = {

}

const styles = StyleSheet.create({
    tab_container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: Context.getSize(34),
    },
    tab_item_text: {
        fontSize: Context.getSize(12),
        fontWeight: '500',
    },
    selected: {
        color: Context.getColor("textBlue1")
    },
    unselected: {
        color: Context.getColor("textHint")
    }
});
