import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
    Animated,
    Image,
    ImageBackground
} from "react-native";
import Context from "context";
import { ifIphoneX } from "react-native-iphone-x-helper";
import Util from "util";

const win = Context.getWindow()
const statusBarHeight = Util.App.statusBarHeight()

export default class HDLargeHeader extends Component {
    renderLeftIcon = () => {
        return (
            <Animated.Image
                source={this.props.leftIcon ? this.props.leftIcon : Context.getImage("headerBack")}
                style={styles.leftIcon}
            />
        );
    };
    renderRightIcon = () => {
        return <Animated.Image source={this.props.rightIcon} style={styles.rightIcon} />;
    };
    getTitleStyle = colorTitle => {
        if (colorTitle) return [styles.title, { color: colorTitle }];
        else return styles.title;
    };
    getContainerStyle = () => {
        return styles.container;
    };
    render() {
        const { isAnimated } = this.props
        let leftOnPress = this.props.navigation
            ? this.props.navigation.goBack
            : undefined;
        let leftIcon = this.props.navigation ? this.renderLeftIcon() : undefined;
        let title = this.props.title ? this.props.title : "";
        let rightIcon = this.props.rightIcon ? this.renderRightIcon() : undefined;

        var headerHeight = 0
        if (isAnimated) {
            headerHeight = this.props.scrollPosition.interpolate({
                inputRange: [0, Context.getSize(170) + statusBarHeight], //220
                outputRange: [Context.getSize(170) + statusBarHeight, 0],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp'
            });
        }

        return (
            <Animated.View
                style={[
                    this.getContainerStyle(),
                    { ...this.props.style },
                    isAnimated ? { height: headerHeight } : null
                ]}>

                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />

                <Animated.View style={styles.imageBack}>
                    <Animated.Image
                        source={Context.getImage("headerLeftLarge")}
                        resizeMode="stretch"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Animated.View>

                <Animated.View style={styles.statusBarSpace} />
                <Animated.View style={styles.content}>
                    <TouchableOpacity
                        onPress={() => {
                            leftOnPress ? leftOnPress() : undefined;
                        }}
                    >
                        <Animated.View style={styles.touch}>
                            {leftIcon}
                        </Animated.View>

                    </TouchableOpacity>
                    <Animated.Text style={this.getTitleStyle(this.props.colorTitle)}>
                        {title}
                    </Animated.Text>
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => {
                            this.props.rightOnPress
                                ? this.props.rightOnPress()
                                : undefined;
                        }}
                    >
                        {rightIcon}
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Context.getColor("primary")
        // borderBottomLeftRadius:7,
        // borderBottomRightRadius:7,
        // ...Platform.select({
        //   android: {
        //     elevation: 2
        //   },
        //   ios: {
        //     shadowColor: "#000",
        //     shadowOffset: { width: 0, height: 2 },
        //     shadowOpacity: 0.7,
        //     shadowRadius: 2
        //   }
        // })
    },
    statusBarSpace: {
        ...Platform.select({
            android: {
                height: StatusBar.currentHeight,
            },
            ios: {
                ...ifIphoneX(
                    {
                        height: Context.getSize(50),
                    },
                    {
                        height: Context.getSize(20),
                    }
                )
            }
        })
    },
    content: {
        width: "100%",
        height: Context.getSize(170), //170
        flexDirection: "row",
    },
    leftIcon: {
        resizeMode: "contain",
        width: Context.getSize(32),
        height: Context.getSize(32)
    },
    rightIcon: {
        resizeMode: "contain",
        width: Context.getSize(32),
        height: Context.getSize(32)
    },
    title: {
        flex: 1,
        height: Context.getSize(50),
        textAlign: "center",
        // textAlignVertical: "center",
        color: Context.getColor("textWhite"),
        fontSize: Context.getSize(18),
        fontWeight: "bold",
    },
    touch: {
        width: Context.getSize(70),
        height: Context.getSize(50),
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft:16,
    },
    imageBack: {
        width: Context.getWindow().width,
        height: '100%',
        position: "absolute",
        bottom: 0
    }
});
