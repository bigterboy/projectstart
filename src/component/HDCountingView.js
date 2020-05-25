
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import BackgroundTimer from 'react-native-background-timer'
import Context from 'context'
import { HDText } from "component";

//Method for using
//start: start counting
//restart: restart counting

export default class HDCountingView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startTime: 0,
            afterTime: 0,
            counting: 0,
            // counting: this.props.startTime,
        }
    }

    countdown = () => {
        const {onAfterTime } = this.props
        const { counting, startTime, afterTime } = this.state
       
        if (this.state.counting > 0) {
            //call event after time
            if (afterTime != 0) {
                const delta = startTime - afterTime
                if (counting <= delta) {
                    (onAfterTime) ? onAfterTime() : null
                }
            }

            //countdown
            this.setState({
                counting: this.state.counting - 1
            }, () => {
                if (this.state.counting <= 0) {
                    this.props.onTimeOut()
                }
            })
        } else {
            clearInterval(this.interval)
        }
    }

    //start counting
    start = (time, afterTime = 0) => {
        BackgroundTimer.start()
        this.setState({
            counting: time,
            startTime:time,
            afterTime: afterTime 
        }, () => {
            this.interval = BackgroundTimer.setInterval(
                this.countdown,
                1000
            );
        })
    }

    stop = () => {
        this.setState({
            counting: 0,
            startTime: 0,
            afterTime:0
        }, () => {
            BackgroundTimer.clearInterval(this.interval)
        })
    }

    //restart counting
    restart = () => {
        const time = this.props.startTime
        this.setState({
            counting: time
        }, () => {
            this.start()
        })
    }

    render() {
        return (
            <View style={[styles.container, { ...this.props.containerStyle }]}>
                <HDText style={[styles.text, { ...this.props.textStyle }]}>{this.state.counting}</HDText>
                <HDText style={[styles.text, { ...this.props.textStyle }]}>s</HDText>
            </View>
        );
    }
}

HDCountingView.propTypes = {
    // startTime: PropTypes.number,
    // afterTime: PropTypes.number,   //Show Resend after afterTime
    onTimeOut: PropTypes.func,
    onAfterTime: PropTypes.func     //event doing on afterTime
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    text: {
        fontSize: Context.getSize(14),
        color: Context.getColor("countingText")
    }
});
