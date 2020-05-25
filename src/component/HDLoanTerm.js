
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Context from 'context'
import PropTypes from 'prop-types';
import { HDText } from "component";

const tSelectColor = "white"
const tUnSelectColor = "#7F8D9F"

const bdSelectColor = "#0E72E1"
const bdUnSelectColor = "#D7E0E6"

const bgSelectColor="#0E72E1"
const bgUnSelectColor="white"
export default class HDLoanTerm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            terms:[
                {
                    id:0,
                    value:6
                },
                {
                    id:1,
                    value:9
                },
                {   
                    id:2,
                    value:12
                },
                {
                    id:3,
                    value:18
                },
                {
                    id:4,
                    value:24
                },
                {
                    id:5,
                    value:36
                }
            ]
        }
    }

    _renderItem = ({item, index, separators}) => {
        const tColor = item.isSelected ? tSelectColor: tUnSelectColor
        const bgColor = item.isSelected ? bgSelectColor : bgUnSelectColor
        const bdColor = item.isSelected ? bdSelectColor : bdUnSelectColor

        return (
            <TouchableOpacity style={styles.item_container} onPress={()=>this._onPressItem(item,index)}>
                <View 
                    style={[
                        styles.sub_item_container,
                        {backgroundColor:bgColor, borderColor:bdColor}
                    ]}>
                    <HDText style={[styles.item_text, {color:tColor}]}>{item.value + " tháng"}</HDText>
                </View>
            </TouchableOpacity>
        )
    }

    _onPressItem = (item,index) => {
        if (this.props.onSelectChange) {
            this.props.onSelectChange(item)
        }
        this.selectedIndex(index)
    }

    
    selectedIndex=(index)=>{
        var terms = this.state.terms

        terms.map((term)=>{
            term.isSelected = false
        })

        terms[index].isSelected = true
        
        this.setState({
            terms:terms
        })
    }

    //function use for ref
    getSelectedItem=()=>{
        const filter = this.state.terms.filter((item,idx)=>{
            return item.isSelected == true   
        })
        if (filter.length > 0){
            return filter[0]
        }
        return null
    }

    render() {
        return (
            <FlatList {...this.props}
                style={{ flex: 1}}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
                data={this.state.terms}
                numColumns={3}
                renderItem={this._renderItem}
            />
        );
    }
}

HDLoanTerm.propTypes = {
    onSelectChange: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    item_container: {
        width: '30%',
        height: Context.getSize(40),

    },
    sub_item_container: {
        flex: 1,
        borderWidth: Context.getSize(1),
        borderRadius: Context.getSize(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_text:{
        fontSize:Context.getSize(14),
        fontWeight:'500',
        lineHeight:Context.getSize(17)
    }
});
