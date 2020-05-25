import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { HDSwipeRightAction } from 'component'
import Context from "context";

export default class HDSwipeView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() { }
    componentDidMount() { }

    _renderRightAction=()=>{
        return (
            <HDSwipeRightAction/>
        )
    }

    render() {
        return (
            <Swipeable {...this.props}
                renderRightActions={this._renderRightAction}
                // onSwipeableWillOpen={this.onSwipeableWillOpen}
                // onSwipeableWillClose={this.onSwipeableWillClose}
            >
               {this.props.children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       
    }
});