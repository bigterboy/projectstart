import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import Context from "context";
import Slider from "react-native-slider";

const imgThumb = Context.getImage("sliderThumb");

export default class HDSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.value
    };
  }

  componentDidUpdate() {}
  componentDidMount() {}

  setValue = value => {
    this.setState({
      sliderValue: value
    });
  };

  getValue = () => {
    return this.state.sliderValue;
  };

  render() {
    return (
      <Slider
        value={this.state.sliderValue}
        minimumValue={1000000}
        maximumValue={100000000}
        maximumTrackTintColor="#ECECEC"
        minimumTrackTintColor="#0E72E1"
        step={1000000}
        style={[styles.container, { ...this.props.style }]}
        thumbStyle={[
          styles.thumb_style,
          Platform.OS === "ios"
            ? styles.sizeOfThumbIos
            : styles.sizeOfThumbAndroid
        ]}
        thumbImage={imgThumb}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  thumb_style: {
    justifyContent: "center",
    alignItems: "center",
    //width: 10,
    //height: 10,
    //borderWidth: 1,
    backgroundColor: "transparent"
  },
  sizeOfThumbIos: {
    width: 10,
    height: 10
  },
  sizeOfThumbAndroid: {
    width: 20,
    height: 25
  }
});
