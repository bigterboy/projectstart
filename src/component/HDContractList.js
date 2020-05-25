

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from "react-native-gesture-handler/Swipeable";

import { HDContractListItem, HDSwipeRightAction } from 'component'
import Context from 'context'
import Carousel, { Pagination } from 'react-native-snap-carousel';

const win = Context.getWindow()

export default class HDContractList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0,
            itemWidth: Context.getSize(343)
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const { items } = nextProps
        var itemWidth = Context.getSize(343)
        if (items != null) {
            if (items.length >= 2) {
                itemWidth = Context.getSize(327)
            } else {
                itemWidth = Context.getSize(343)
            }
        }

        this.setState({
            itemWidth: itemWidth
        })
    }

    _renderRightAction = (item, index) => {
        if (this.props.haveRightAction) {
            return (
                <HDSwipeRightAction
                    rightAction={() => this._onPressRightAction(item, index)} />
            );
        }
        return null
    }


    _onPressRightAction = (item, index) => {
        if (this.props.onPressRightAction) {
            this.props.onPressRightAction(item, index)
        }
    }

    getStyleShadow = () => {
        const { cellType } = this.props

        if ((cellType !== 0) && (cellType !== 5)) {
            return styles.item_shadow
        } else {
            return null
        }
    }

    _renderItem = ({ item, index }) => {
        const { isSwipeable } = this.props
        if (isSwipeable) {
            return (
                <Swipeable
                    containerStyle={styles.swipe_container}
                    renderRightActions={() => this._renderRightAction(item, index)}
                    onSwipeableWillOpen={this.onSwipeableWillOpen}
                    onSwipeableWillClose={this.onSwipeableWillClose}
                >
                    <HDContractListItem
                        key={index}
                        itemButtonTitle={this.props.itemButtonTitle}
                        item={item}
                        cellType={this.props.cellType}
                        style={(!this.props.isHorizontal) ? styles.item_vertical : null}
                        onPressMaster={this._onPressMaster}
                        onPressItem={this._onPressItem}
                    />
                </Swipeable>
            );
        } else {
            return (
                <View style={{
                    width: '100%',
                    paddingTop: 4,
                    paddingBottom: 16,
                    paddingLeft: 2,
                    paddingRight: 2
                }}>
                    <HDContractListItem
                        key={index}
                        itemButtonTitle={this.props.itemButtonTitle}
                        item={item}
                        cellType={this.props.cellType}
                        style={(!this.props.isHorizontal) ? styles.item_vertical : styles.item_shadow}
                        onPressMaster={this._onPressMaster}
                        onPressItem={this._onPressItem}
                    />
                </View>
            );
        }

    }

    _onPressItem = (item) => {
        // (this.props.onPressListItem) ? this.props.onPressListItem(item) : null
        (this.props.onPressSubButton) ? this.props.onPressSubButton(item) : null

    }

    _onPressMaster = (item) => {
        (this.props.onPressMaterItem) ? this.props.onPressMaterItem(item) : null
    }

    get pagination() {
        const { activeSlide } = this.state;
        const items = this.props.items

        return (
            <Pagination
                dotsLength={items.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    paddingVertical: 8,
                    width: Context.getSize(50),
                }}
                dotStyle={{
                    width: Context.getSize(6),
                    height: Context.getSize(6),
                    borderRadius: Context.getSize(3),
                    padding: 0,
                    marginHorizontal: 1,
                    backgroundColor: Context.getColor('paginationColor')
                }}
                inactiveDotStyle={{
                    borderRadius: Context.getSize(3),
                    marginHorizontal: 0,
                    borderWidth: 1,
                    borderColor: '#B9C6D5',
                    backgroundColor: 'transparent'
                }}
                inactiveDotOpacity={1.0}
                inactiveDotScale={1.0}

            />
        );
    }


    renderContent = () => {
        if (!this.props.isHorizontal) {
            return this.renderVertical()
        } else {
            return this.renderHorizontal()
        }
    }

    renderVertical = () => {
        return (
            <FlatList
                {...this.props}
                data={this.props.items}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.contractUuid}
                contentContainerStyle={styles.vertical_list_container}
            />
        )
    }

    renderHorizontal = () => {
        return (
            <View style={[
                styles.container,

                { ...this.props.style },
            ]}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.items}
                    renderItem={this._renderItem}
                    sliderWidth={win.width}
                    itemWidth={this.state.itemWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    containerCustomStyle={styles.list_container}
                    contentContainerCustomStyle={{
                        paddingLeft: 16
                    }}
                    keyExtractor={(item, index) => item.contractUuid}
                    activeSlideAlignment="start"
                    slideStyle={{
                        borderRadius: 5,
                    }}
                    layout={'default'}
                    autoplay={this.props.isAutoPlay}
                    loop={this.props.isLoop}
                />

                {this.props.isShowPagination ?
                    this.pagination
                    :
                    null
                }
            </View>
        );
    }

    render() {
        return (
            this.renderContent()
        );
    }
}

HDContractList.propTypes = {
    isShowPagination: PropTypes.bool,
    items: PropTypes.array,
    isAutoPlay: PropTypes.bool,
    isLoop: PropTypes.bool,
    isSwipeable: PropTypes.bool, //Swipe to delete
    haveRightAction: PropTypes.bool, //Swipe right show action button
    onPressRightAction: PropTypes.func, //Event Press Right Action (Delete)
    isHorizontal: PropTypes.bool,   //Horizontal list or vertical
    onPressMaterItem: PropTypes.func,
    onPressSubButton: PropTypes.func,
    itemButtonTitle: PropTypes.string //Only use this props if you want to change button Title
}

HDContractList.defaultProps = {
    isHorizontal: true,
    isSwipeable: false
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    list_container: {
        flexGrow: 0,
        width: '100%',
        height: Context.getSize(158 + 16),
    },
    vertical_list_container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    item_vertical: {
        width: Context.getSize(343),
        height: Context.getSize(158),
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: Context.getSize(6),
        marginBottom: 16,
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 5 },
        elevation: 3
    },
    item_shadow: {
        backgroundColor: 'white',
        borderRadius: Context.getSize(6),
        borderWidth: 0.5,
        borderColor: Context.getColor("cellBorder"),
        shadowOpacity: 1,
        shadowColor: Context.getColor("hint"),
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        elevation: 3
    },
    swipe_container: {
        width: Context.getWindow().width,
        paddingHorizontal: 16,
    },

});
