

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    View
} from 'react-native';

import {
    HDTextInput,
    HDForm
} from "component";

import PropTypes from 'prop-types';

import Context from 'context'

export default class HDLoanUserCard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <HDForm {...this.props.style} style={styles.container}>
                <View style={{width:'100%', paddingHorizontal: 16}}>
                    <HDTextInput
                        ref={ref => (this.username = ref)}
                        value="Lê Trung Nam"
                        placeholder={Context.getString(
                            "loan_tab_register_loan_fullname"
                        )}
                        label={Context.getString("loan_tab_register_loan_fullname")}
                        containerStyle={{ marginTop: 16 }}
                        labelStyle={styles.input_label}
                        inputContainerStyle={styles.input_container}
                        inputStyle={styles.input_text}
                        editable={false}
                    />
                    <HDTextInput
                        ref={ref => (this.username = ref)}
                        value="0969 123 456"
                        placeholder={Context.getString(
                            "loan_tab_register_loan_phone"
                        )}
                        label={Context.getString("loan_tab_register_loan_phone")}
                        inputContainerStyle={styles.input_container}
                        labelStyle={styles.input_label}
                        inputStyle={styles.input_text}
                        editable={false}
                    />
                    <HDTextInput
                        ref={ref => (this.username = ref)}
                        value="272245678"
                        placeholder={Context.getString(
                            "loan_tab_register_loan_idcard"
                        )}
                        label={Context.getString("loan_tab_register_loan_idcard")}
                        inputContainerStyle={styles.input_container}
                        labelStyle={styles.input_label}
                        inputStyle={styles.input_text}
                        editable={false}
                    />
                    <HDTextInput
                        ref={ref => (this.username = ref)}
                        value="302 Tô Hiến Thành, P15, Q10, TPHCM"
                        placeholder={Context.getString(
                            "loan_tab_register_loan_address"
                        )}
                        label={Context.getString("loan_tab_register_loan_address")}
                        containerStyle={{ marginBottom: 5 }}
                        inputContainerStyle={styles.input_container}
                        labelStyle={styles.input_label}
                        inputStyle={styles.input_text}
                        editable={false}
                    />
                </View>
            </HDForm>
        );
    }
}

HDLoanUserCard.propTypes = {

}

const styles = StyleSheet.create({
    container: {
        width: Context.getSize(343),
        backgroundColor: Context.getColor("background"),
        borderRadius: Context.getSize(5),
        marginBottom: 24,
    }

});
