import React, { Component } from 'react';
import { StyleSheet,Text } from "react-native";
import Context from "context";
import NumberFormat from 'react-number-format';
import { HDText } from "component";

export default class HDNumberFormat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() { }
    componentDidMount() { }

    render() {
        return (
            <NumberFormat {...this.props}
                displayType={'text'} suffix={"đ"}
                thousandSeparator={true}
                renderText={value => {
                    // var res = value.replace(/,/g, ".");
                    return (
                        <HDText {...this.props}>{value}</HDText>
                    )
                }} />

        );
    }
}
