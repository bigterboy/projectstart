import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Context from "context";
export default class MyButtonImage extends Component {
  render() {
    const isShadow = this.props.isShadow
    return (
      <TouchableOpacity {...this.props}
        style={[styles.touch, isShadow ? styles.shadow:null, this.props.style]}
        onPress={this.props.onPress}
      >
        <Image
          source={this.props.iconSource}
          resizeMode="contain"
          style={[styles.icon, this.props.iconStyle]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    height: Context.getSize(46),
    width: Context.getSize(46),
    justifyContent:'center',
    alignItems:'center'
  },
  shadow:{
    shadowOpacity:0.6,
    shadowColor:'#000000',
    shadowOffset:{width:0, height:4},
    elevation: 3
  },
  icon: {
    flex: 1
  }
});
