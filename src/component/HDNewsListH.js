

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import { HDText } from "component";
import Context from 'context'

const FImage = createImageProgress(FastImage);
export default class HDNewsListH extends Component {

    constructor(props) {
        super(props)
    }

    _renderItem = ({ item, index, separators }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPressItem(item)}>
                <View style={styles.item_container}>
                    <FImage
                        style={styles.item_image}
                        source={{
                            uri: item.imagePathBriefApp &&
                            item.imagePathBriefApp.indexOf("http") !== -1
                            ? item.imagePathBriefApp : "",
                            // headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.stretch.cover}
                    //resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={styles.item_text_container}>
                        <HDText
                            numberOfLines={2}
                            style={styles.item_text} >{item.title}</HDText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                {...this.props}
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

HDNewsListH.propTypes = {
    items: PropTypes.array,
    onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
    item_container: {
        width: Context.getSize(228),
        height: Context.getSize(188),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Context.getSize(5),
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 2 },
        elevation: Context.getSize(4),
        // marginTop: Context.getSize(2),
        marginLeft: Context.getSize(8),
        marginBottom: Context.getSize(8),
        marginRight: Context.getSize(8),
        // padding: Context.getSize(2),
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: Context.getColor("cellBorder")
    },
    item_image: {
        width: '100%',
        height: Context.getSize(126),
        alignSelf: 'center',
        borderTopLeftRadius: Context.getSize(5),
        borderTopRightRadius: Context.getSize(5),
        overflow: 'hidden',
    },
    item_text_container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems:'flex-start',
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 16
    },
    item_text: {
        fontSize: Context.getSize(12),
        lineHeight: Context.getSize(15),
        fontWeight: 'bold',
        color: Context.getColor("textStatus")
    }
});
