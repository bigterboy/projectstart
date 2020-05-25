/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Animated } from "react-native";
import Svg, {
  Path,
  Text as SVGText,
  TextPath,
  TSpan,
  G,
  Rect,
  Polyline
} from "react-native-svg";
import * as shape from "d3-shape";
import Context from "context";
const d3 = {
  shape
};

export default class Slice extends Component {
  constructor(props) {
    super(props);

    this._createPieSlice = this._createPieSlice.bind(this);
  }

  _createPieSlice(props, index, data, animatedAngle) {
    var arcs = d3.shape
      .pie()
      .value(item => item.number)
      .startAngle(0)
      .endAngle(animatedAngle * Math.PI)(data);

    let arcData = arcs[index];

    const generator = this.arcGenerator(arcData);

    this.point = d3.shape
      .arc()
      .outerRadius(props.outerRadius)
      .innerRadius(props.innerRadius)
      .centroid(arcData);
    this.point[0] = this.point[0] + props.outerRadius;
    this.point[1] = this.point[1] + props.outerRadius;

    return generator;
  }

  componentDidMount() {
    // console.log("Slice-componentDidMount")
  }

  render() {
    const { outerRadius, innerRadius } = this.props;
    const translate = "translate(" + outerRadius + ", " + outerRadius + ")";

    this.arcGenerator = d3.shape
      .arc()
      .outerRadius(outerRadius)
      .padAngle(0.03)
      .innerRadius(innerRadius);
    // .cornerRadius(20)

    return (
      <G>
        <Path
          id={this.props.id}
          transform={translate}
          d={this._createPieSlice(
            this.props,
            this.props.index,
            this.props.data,
            this.props.animatedAngle
          )}
          fill={this.props.color}
          key={"pie_slice_" + this.props.index}
        ></Path>

        {this.props.data[this.props.index] !== 0 ? (
          <SVGText
            fontSize={Context.getSize(10)}
            fontWeight="bold"
            transform={"translate(" + this.point + ")"}
            textAnchor="middle"
            // fill={this.props.data[this.props.index].labelColor}
            fill="white"
            {...(Platform.OS === "android"
              ? { fontFamily: "Roboto-Bold", fontWeight: null }
              : null)}
          >
            {this.props.data[this.props.index].number +
              " " +
              Context.getString("component_pie_chart_term")}
          </SVGText>
        ) : null}
      </G>
    );
  }
}

const styles = StyleSheet.create({});
