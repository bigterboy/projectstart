

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import Context from 'context'
import { HDText } from "component";

const FImage = createImageProgress(FastImage);
const textColor = Context.getColor("background")
const imgTopLeft = Context.getImage("leftYellow")

export default class HDOffersList extends Component {

    constructor(props) {
        super(props)
    }

    _renderItem = ({ item, index, separators }) => {
        const { items } = this.props
        const length = items.length
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onPressItem ? this.props.onPressItem(item) : null}>
                <View style={[
                    styles.item_container,
                    (length == 1) ? styles.container_1_item : null
                ]}>
                    <FImage
                        imageStyle={styles.item_image}
                        source={{
                            uri: item.imagePathBriefApp &&
                            item.imagePathBriefApp.indexOf("http") !== -1 
                            ? item.imagePathBriefApp : "",
                            priority: FastImage.priority.normal,
                        }}>
                    </FImage>

                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        top: 0,
                        backgroundColor: Context.getColor("blurColorLighter"),
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderRadius: Context.getSize(5)
                    }}>
                        <ImageBackground source={imgTopLeft} style={{
                            width: Context.getSize(88),
                            height: Context.getSize(50),
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingLeft: 8
                        }}>
                            <HDText style={styles.item_title_rate_text}>{Context.getString("component_promotion_rate")}</HDText>
                            <HDText style={styles.item_rate_text}>{item.interestRate + "%"}</HDText>
                        </ImageBackground>

                        <View style={styles.item_text_container}>
                            <HDText style={styles.item_title_text}>{item.typeName}</HDText>
                            <HDText
                                numberOfLines={1}
                                style={styles.item_amount_text}>
                                {item.contentBrief}
                            </HDText>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <FlatList
                {...this.props}
                style={[styles.list_container, this.props.style]}
                data={this.props.items}
                keyExtractor={item => item.id.toString()}
                renderItem={this._renderItem}
                horizontal={true}
                bounces={false}
                contentContainerStyle={{
                    paddingLeft: Context.getSize(8),
                    paddingRight: Context.getSize(8)
                }}
                showsHorizontalScrollIndicator={false}
            />
        );
    }
}

HDOffersList.propTypes = {
    items: PropTypes.array,
    onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
    list_container: {
        marginBottom: Context.getSize(8)
    },
    item_container: {
        width: Context.getSize(325),
        height: Context.getSize(140),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: Context.getSize(5),
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 2  },
        elevation: Context.getSize(4),
        marginLeft: Context.getSize(8),
        marginBottom: Context.getSize(8),
        marginRight: Context.getSize(8),
    },
    container_1_item: {
        width: Context.getSize(341),
    },
    item_image: {
        width: '100%',
        height: Context.getSize(140),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Context.getSize(5),
    },
    item_text_container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    item_title_text: {
        fontSize: Context.getSize(16),
        lineHeight: Context.getSize(19),
        fontWeight: '500',
        color: textColor
    },
    item_amount_text: {
        fontSize: Context.getSize(22),
        fontWeight: 'bold',
        lineHeight: Context.getSize(26),
        color: textColor,
    },
    item_title_rate_text: {
        fontSize: Context.getSize(8),
        lineHeight: Context.getSize(10),
        fontWeight: 'bold',
        color: textColor
    },
    item_rate_text: {
        fontSize: Context.getSize(20),
        lineHeight: Context.getSize(24),
        fontWeight: 'bold',
        color: textColor
    }
});
