/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, Animated, Dimensions, Platform } from "react-native";
import PropTypes from "prop-types";
import { HDText } from "component";
import Svg, {
  Path,
  Rect,
  Text as SVGText,
  TSpan,
  G,
  TextPath
} from "react-native-svg";

import Context from "context";
import Slice from "./Slice";

const AnimatedSlice = Animated.createAnimatedComponent(Slice);
const animatedAngle = new Animated.Value(0.1);

const S_WIDTH = Dimensions.get("window").width;

export default class HDPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    var anim01 = Animated.timing(animatedAngle, {
      toValue: 2,
      duration: 2000
    });

    var anim02 = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000
    });
    Animated.parallel([anim01, anim02]).start();
  }

  renderLegend = () => {
    const { chartData } = this.props;
    return (
      <Animated.View
        style={[styles.chart_desc_container, { opacity: this.state.fadeAnim }]}
      >
        {chartData.map((item, index) => {
          if (index === 0) {
            return (
              <View
                key={"item-" + index}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <View
                  style={[
                    styles.circle,
                    { marginRight: 10, backgroundColor: item.color }
                  ]}
                />
                <HDText style={styles.chart_desc_text}>{item.name}</HDText>
              </View>
            );
          } else if (index === 1) {
            return (
              <View
                key={"item-" + index}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <HDText style={styles.chart_desc_text}>{item.name}</HDText>
                <View
                  style={[
                    styles.circle,
                    { marginLeft: 10, backgroundColor: item.color }
                  ]}
                />
              </View>
            );
          }
        })}
      </Animated.View>
    );
  };

  render() {
    const { chartData, chartSize, innerRadius } = this.props;
    const half = chartSize / 2;
    const translate = "translate(" + half + "," + (half - 10) + ")";
    return (
      <View style={[styles.chart_container, { ...this.props.style }]}>
        <Svg ref={svg => (this.svg = svg)} width={chartSize} height={chartSize}>
          {chartData.map((item, index) => (
            <AnimatedSlice
              key={"item-" + index}
              id={"path" + index}
              animatedAngle={animatedAngle}
              color={item.color}
              data={chartData}
              index={index}
              outerRadius={chartSize / 2}
              innerRadius={innerRadius}
            />
          ))}

          <SVGText transform={translate} textAnchor="middle">
            <TSpan
              fill={Context.getColor("chartText1")}
              fontSize={Context.getSize(10)}
              fontWeight="bold"
              {...(Platform.OS === "android"
                ? { fontFamily: "Roboto-Bold", fontWeight: null }
                : null)}
            >
              {this.props.centerText}
            </TSpan>
            <TSpan
              x="0"
              dy="20"
              fill={Context.getColor("chartText2")}
              fontSize={Context.getSize(14)}
              fontWeight="bold"
              {...(Platform.OS === "android"
                ? { fontFamily: "Roboto-Bold", fontWeight: null }
                : null)}
            >
              {this.props.centerSubText}
            </TSpan>
          </SVGText>
        </Svg>

        {this.renderLegend()}
      </View>
    );
  }
}

HDPieChart.propTypes = {
  chartData: PropTypes.array,
  chartSize: PropTypes.number,
  innerRadius: PropTypes.number,
  centerText: PropTypes.string,
  centerSubText: PropTypes.string
};

const styles = StyleSheet.create({
  chart_container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: Context.getSize(343),
    // height: Context.getSize(248),
    borderRadius: Context.getSize(10),
    shadowColor: Context.getColor("hint"),
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 4 },
    backgroundColor: Context.getColor("background"),
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 10,
    elevation: 3
  },
  chart_desc_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 8
  },
  chart_desc_text: {
    fontSize: Context.getSize(12),
    fontWeight: "400",
    color: Context.getColor("chartText1")
  },
  end_date_title: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    color: Context.getColor("chartText2")
  },
  circle: {
    width: Context.getSize(11),
    height: Context.getSize(11),
    borderRadius: Context.getSize(11 / 2)
  }
});
