import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import Context from "context";
import Pdf from 'react-native-pdf';

export default class HDPdf extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() { }
    componentDidMount() { }

    render() {
        return (
            <Pdf
                
                style={[styles.content, {...this.props.style}]}
                // source={source}
                // enablePaging={true}
                // horizontal={true}
                fitWidth={true}
                activityIndicator={null}
                activityIndicatorProps={{ color: 'red', progressTintColor: 'red' }}
                // onLoadComplete={(numberOfPages, filePath) => {
                //     // console.log(`number of pages: ${numberOfPages}`);
                // }}
                // onPageChanged={(page, numberOfPages) => {
                //     // console.log(`current page: ${page}`);
                // }}
                // onError={(error) => {
                //     // console.log(error);
                // }}
                {...this.props}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: Context.getColor("backgroundScreen"),
        marginTop: 10,
        width: '100%',
        height: '100%'
    },
});