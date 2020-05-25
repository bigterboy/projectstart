import React, { Component } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class KeyboardAwareScroll extends Component {
    render() {
        return (
            <KeyboardAwareScrollView  {...this.props}>
                {this.props.children}
            </KeyboardAwareScrollView>
        );
    }
}
