import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity ,View} from "react-native";
import Context from "context";


const imgThumb = Context.getImage("switchThumb")

export default class HDCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: this.props.value
        }
    }

    componentDidUpdate() { }
    componentDidMount() { }


    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor:'red'
    },
    
});