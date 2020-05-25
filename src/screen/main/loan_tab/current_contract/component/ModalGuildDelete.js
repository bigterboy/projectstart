import React, { Component } from "react";
import {
    StyleSheet, View,
    ImageBackground,
} from "react-native";
import PropTypes from 'prop-types';
import Context from "context";
import { HDContractListItem, HDSwipeRightAction, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";
import Swipeable from "react-native-gesture-handler/Swipeable";

const win = Context.getWindow()

export default class ModalGuildDelete extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isSwipeOpen: false
        }
    }

    onSwipeableWillOpen = () => {
        this.setState({
            isSwipeOpen: true
        })
    }

    onSwipeableWillClose = () => {
        this.setState({
            isSwipeOpen: false
        })
    }


    _renderRightAction = () => {
        return (
           <HDSwipeRightAction />
        );
    };

    renderTooltip = () => {
        if (!this.state.isSwipeOpen) {
            return (
                <View style={{ width: Context.getSize(343), height: Context.getSize(86) }}>
                    <ImageBackground style={styles.tooltip_image} source={Context.getImage("tooltip")}>
                        <HDText style={styles.tooltip_text}>{Context.getString("loan_tab_component_tooltip_text")}</HDText>
                    </ImageBackground>
                </View>
            )
        }
        return null
    }

    render() {
        return (

            <Modal
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                backdropOpacity={0.50}
                animationIn="zoomInDown"
                animationOut="fadeOut"
                animationOutTiming={200}
                // onBackButtonPress={this.props.onCancel}
                style={{ justifyContent: 'flex-start', alignItems: 'center', margin: 0 }}

                {...this.props}>

                {/* android tai thỏ cần cái này */}
                <StatusBarCustom />  

                <View style={styles.container}>
                    <Swipeable
                        containerStyle={styles.swipe_container}
                        renderRightActions={this._renderRightAction}
                        onSwipeableWillOpen={this.onSwipeableWillOpen}
                        onSwipeableWillClose={this.onSwipeableWillClose}
                    >

                        <HDContractListItem
                            item={this.props.item}
                            isHorizontal={false}
                            onPressItem={this._onPressItem}
                            style={styles.item_container}
                            cellType={4}
                        />
                    </Swipeable>

                    {this.renderTooltip()}

                </View>
            </Modal >
        );
    }
}

ModalGuildDelete.propTypes = {
    item:PropTypes.object
}

const styles = StyleSheet.create({
    close_icon: {
        width: Context.getSize(16),
        height: Context.getSize(16)
    },
    container: {
        position: 'absolute',
        top: 94 + 24,
        width: win.width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    item_container: {
        width: Context.getSize(343),
        height: Context.getSize(158),
    },
    tooltip_image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tooltip_text: {
        marginTop: 7,
        fontSize: Context.getSize(14),
        fontWeight: '400',
        lineHeight: Context.getSize(20),
        paddingHorizontal: 16
    },
    swipe_container: {
        width: Context.getWindow().width,
        paddingHorizontal: 15,
        marginBottom: 18
    },
    containerDelete: {
        height: "100%",
        width: Context.getSize(98),
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 16,
    },
    touchDelete: {
        width: Context.getSize(50),
        height: Context.getSize(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Context.getSize(50 / 2),
        backgroundColor: "white"
    },
    iconDelete: {
        resizeMode: "contain",
        width: Context.getSize(16),
        height: Context.getSize(16)
    }

});
