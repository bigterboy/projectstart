

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Context from 'context'
import { HDText } from "component";

const imgBike = Context.getImage("loanBike")
const imgElect = Context.getImage("loanElectric")
const imgPhone = Context.getImage("loanPhone")

const bgUnselectColor = "white" //background
const bgSelectColor = "#1e88e5"

const icUnselectColor = "#bdbdbd" //icon
const icSelectColor = "white"

const bdUnselectColor = "#bdbdbd" //border
const bdSelectColor = "#1e88e5"

const tUnselectColor = "#bdbdbd" //text
const tSelectColor = "black"

export default class HDLoanToggleSelections extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: [
                {
                    id: 0,
                    name: "Xe máy",
                    image: imgBike,
                    isSelected: true,
                    type: "MC"
                },
                {
                    id: 1,
                    name: "Điện máy",
                    image: imgElect,
                    isSelected: false,
                    type: "ED"
                },
                {
                    id: 2,
                    name: "Điện thoại",
                    image: imgPhone,
                    isSelected: false,
                    type: "MB"
                }
            ],
            selectedIndex: 0
        }
    }

    renderItem = () => {
        return this.state.items.map((item, idx) => {

            const bgColor = item.isSelected ? bgSelectColor : bgUnselectColor
            const icColor = item.isSelected ? icSelectColor : icUnselectColor
            const bdColor = item.isSelected ? bdSelectColor : bdUnselectColor
            const tColor = item.isSelected ? tSelectColor : tUnselectColor

            return (
                <TouchableOpacity onPress={() => this._onPressItem(item, idx)} key={idx}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.item_image_container, { borderColor: bdColor, backgroundColor: bgColor }]}>
                            <Image
                                source={item.image}
                                resizeMode='contain'
                                style={[styles.item_icon, { tintColor: icColor }]}
                            />
                        </View>

                        <HDText style={[styles.item_text, { color: tColor }]}>{item.name}</HDText>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    _onPressItem = (item, idx) => {
        if (this.props.onSelectChange) {
            this.props.onSelectChange(item)
        }  
        this.selectedIndex(idx)
    }

    selectedIndex=(index)=>{
        const items = this.state.items

        items.map((item) => {
            item.isSelected = false;
        })

        items[index].isSelected = true

        this.setState({
            items: items,
            selectedIndex: index
        })
    }

    //function use for ref
    getSelectedItem=()=>{
        const filter = this.state.items.filter((item,idx)=>{
            return item.isSelected == true   
        })
        if (filter.length > 0){
            return filter[0]
        }
        return null
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.group_selection}>
                    {
                        this.renderItem()
                    }
                </View>

            </View>

        );
    }
}

HDLoanToggleSelections.propTypes = {
    
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    group_selection: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    item_image_container: {
        // padding: 10,
        // borderWidth: 2,
        // borderRadius: 70 / 2,
        // marginBottom: 5
        width:Context.getSize(50),
        height:Context.getSize(50),
        borderWidth: Context.getSize(0.5),
        borderRadius: Context.getSize(50/2),
        justifyContent:'center',
        alignItems:'center',
        marginBottom:11
    },
    item_icon: {
        width: Context.getSize(36),
        height: Context.getSize(36)
    },
    item_text: {
        fontSize: Context.getSize(12),
        fontWeight: '400',
        lineHeight: Context.getSize(14),
        textAlign:'center'
    }
});
