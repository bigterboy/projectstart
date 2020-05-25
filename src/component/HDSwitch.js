import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Context from "context";

export default class HDSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: 0
        }
    }

    componentDidUpdate() { }
    componentDidMount() { }

    onPressSwitch = () => {
        if (this.props.onPressSwitch) this.props.onPressSwitch()
    }

    set = (value) => {
        this.setState({
            switchValue: value
        })
    }

    get = () => {
        return this.state.switchValue
    }

    toggle = () => {
        const { switchValue } = this.state
        this.setState({
            switchValue: (switchValue === 0) ? 1 : 0
        })
    }

    render() {
        const { switchValue } = this.state
        let icon = (switchValue === 1) ? Context.getImage("icon_Switch_On") : Context.getImage("icon_Switch_Off")
        return (
            <TouchableOpacity
                {...this.props}
                onPress={this.onPressSwitch}>
                <View style={styles.container}>
                    <Image
                        style={styles.icon}
                        source={icon}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Context.getSize(44),
        height: Context.getSize(44),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icon: {
        width: Context.getSize(31),
        height: Context.getSize(27)
    }
});