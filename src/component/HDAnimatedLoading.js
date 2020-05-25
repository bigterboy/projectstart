import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Context from 'context'
import LottieView from 'lottie-react-native';

export default class HDAnimatedLoading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, {...this.props.style}]} >
                <LottieView
                    source={Context.getImage("lottieLoading")}
                    style={styles.image}
                    autoPlay
                    loop />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Context.getSize(150),
        height: Context.getSize(150)
    },
});
