import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Context from "context";

export default class HDSwipeRightAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: this.props.value
        }
    }

    componentDidUpdate() { }
    componentDidMount() { }

    _rightAction=()=>{
        (this.props.rightAction) ? this.props.rightAction() : null
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.touch}
                    onPress={this._rightAction}
                >
                    <Image
                        source={Context.getImage("deleteItem")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: Context.getSize(98),
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 16,
    },
    touch: {
        width: Context.getSize(50),
        height: Context.getSize(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Context.getSize(50 / 2),
        backgroundColor: "white"
    },
    icon: {
        resizeMode: "contain",
        width: Context.getSize(16),
        height: Context.getSize(16)
    }
});