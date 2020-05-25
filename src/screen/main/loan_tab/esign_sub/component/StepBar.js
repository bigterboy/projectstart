

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import { HDText } from "component";
import Context from 'context'

export default class StepBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    id: 0,
                    name: Context.getString("loan_tab_esign_overview"),
                },
                {
                    id: 1,
                    name: Context.getString("loan_tab_esign_contract")
                },
                {
                    id: 2,
                    name: Context.getString("loan_tab_esign_sign")
                },
                {
                    id: 3,
                    name: Context.getString("loan_tab_esign_complete")
                }
            ]
        }
    }

    componentDidMount = () => {
        const { items } = this.state

        let lstItems = items.map(item => {
            item.isFocus = false
            return item
        })

        this.setState({
            items: lstItems
        })
    }

    //Set step complete and doing
    setStep(value) {
        let { items } = this.state

        let lstItems = items.map((item, index) => {
            if (index < value) {
                item.isFocus = true
            } else {
                item.isFocus = false
            }
            return item
        })

        this.setState({
            items: lstItems
        })

    }


    render() {
        const { items } = this.state
        return (
            <View {...this.props} style={styles.container}>
                {items.map((item, index) => {
                    return (
                        <HDText
                            key={index}
                            style={[
                                styles.step_text,
                                (item.isFocus) ? styles.focus : styles.un_focus
                            ]}>
                            {item.name}
                        </HDText>
                    )
                })}
            </View>
        );
    }
}

StepBar.propTypes = {

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: Context.getSize(34),
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    text: {
        fontSize: Context.getSize(12),
    },
    focus: {
        color: Context.getColor("textBlue1"),
        fontWeight: '500',
    },
    un_focus: {
        color: Context.getColor("textHint"),
        fontWeight: '400',
    }
});
