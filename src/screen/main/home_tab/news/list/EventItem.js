import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HDText } from "component";
import Context from "context";
import Util from "util";
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const FImage = createImageProgress(FastImage);

export default class EventItem extends Component {
    _onItemPress = () => {
        if (this.props.onItemPress)
            this.props.onItemPress(this.props.data, this.props.index);
    };
    render() {
        let { data } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.image_container}>
                    <FImage
                        style={styles.imageContent}
                        source={{
                            uri: data.imagePathBriefApp &&
                                data.imagePathBriefApp.indexOf("http") !== -1
                                ? data.imagePathBriefApp : "",
                            priority: FastImage.priority.normal
                        }}
                        resizeMode={FastImage.resizeMode.stretch.cover}
                    />
                </View>

                <View style={{ height: 40 }}></View>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={this._onItemPress}
                    activeOpacity={0.8}
                >
                    <View style={styles.viewContainer}>
                        <HDText style={styles.title} numberOfLines={2} >
                            {data.title}
                        </HDText>
                        <HDText style={styles.description}>
                            {"Đăng ngày: " + Util.HDDate.formatTo(data.startDate)}
                        </HDText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15,
        // backgroundColor: 'pink',
    },
    image_container: {
        width: "100%",
        height: Context.getSize(153 - 16),
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: "hidden",
        backgroundColor: 'pink'
    },
    imageContent: {
        width: "100%",
        height: "100%"
    },
    touchContainer: {
        width: "100%",
        position: "absolute",
        // top: (Context.getWindow().width / 16) * 9 - 60,
        // top: Context.getSize(153 - 40),
        bottom: 0,
        paddingHorizontal: 16,
    },
    viewContainer: {
        flex: 1,
        height: Context.getSize(80),
        borderRadius: 5,
        borderColor: "#C0CDD5",
        backgroundColor: Context.getColor("blurColorWhite"),
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 8,
        justifyContent: "space-between",
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2
    },
    title: {
        fontSize: Context.getSize(14),
        fontWeight: "bold",
        lineHeight: Context.getSize(22),
        color: Context.getColor("textBlue1"),
    },
    description: {
        fontSize: Context.getSize(12),
        fontWeight: "400",
        lineHeight: Context.getSize(18),
        color: Context.getColor("newItemDate"),
    }
});
