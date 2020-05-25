

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableHighlight,
    Alert
} from 'react-native';
import PropTypes from 'prop-types';

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

import Context from 'context'
import Carousel, { Pagination } from 'react-native-snap-carousel';


const FImage = createImageProgress(FastImage);
const imgBanner = Context.getImage("bannerHome")
const bgBanner = Context.getColor("homeBanner")

export default class HDBanner extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0
        }
    }

    restartAutoPlay = () => {
        this._carousel.startAutoplay();
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.item_container}
                onPress={() => this.props.onPressItem ? this.props.onPressItem(item) : null}
            >
                <FImage
                    style={styles.item_image}
                    source={{
                        // uri: item.imagePath,
                        uri: item.imagePathBriefApp &&
                            item.imagePathBriefApp.indexOf("http") !== -1
                            ? item.imagePathBriefApp : "",
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch.cover}
                />
            </TouchableOpacity>
        );
    }

    get pagination() {
        const { activeSlide } = this.state;
        const items = this.props.items
        return (
            <Pagination
                dotsLength={items.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.pag_container}
                dotStyle={{
                    width: Context.getSize(6),
                    height: Context.getSize(6),
                    borderRadius: Context.getSize(3),
                    marginHorizontal: 0,
                    backgroundColor: '#F7A600'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    borderWidth: 1,
                    width: Context.getSize(4),
                    height: Context.getSize(4),
                    borderColor: '#F7A600',
                    marginHorizontal: 0,
                    backgroundColor: 'transparent'
                }}
                inactiveDotOpacity={1.0}
                inactiveDotScale={1.0}

            />
        );
    }

    render() {
        const { items } = this.props
        return (
            // <View>
            <View style={[styles.container, { ...this.props.style }]}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={items}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    firstItem = {this.state.activeSlide}
                    onSnapToItem={(index) => {
                        this.setState({ activeSlide: index })
                    }}
                    containerCustomStyle={{ flexGrow: 0 }}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={2000}
                    loop={true}
                    enableSnap={true}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    lockScrollTimeoutDuration={1000}
                    lockScrollWhileSnapping={true}
                    removeClippedSubviews={false}
                />

                {this.props.isShowPagination ?
                    this.pagination
                    :
                    null
                }
            </View>
            // </View>

        );
    }
}

HDBanner.propTypes = {
    isShowPagination: PropTypes.bool,
    items: PropTypes.array,
    onPressItem: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: Context.getSize(153),
        backgroundColor: bgBanner,
        marginBottom: Context.getSize(32),
        backgroundColor: Context.getColor('backgroundScreen')
    },
    item_container: {
        width: '100%',
        height: '100%',
        // height: Context.getSize(153),
        justifyContent: 'center',
        alignItems: 'center',

        // UI modification #43 (03/01/2020)
        // remove paddings to make banners fill whole container
        // paddingHorizontal:16,

        paddingBottom: Context.getSize(16)
    },
    item_image: {
        width: '100%',
        height: '100%',

        // UI modification #43 (03/01/2020)
        // remove borderRadius to make banners look consecutive
        // borderRadius:10,

        overflow: 'hidden'
    },
    pag_container: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});
