import React, { Component } from "react";
import { StyleSheet, Text, Platform } from "react-native";

export default class HDText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let styleObj = StyleSheet.flatten([this.props.style]);
    //console.log("GIA TRI LA:",styleObj)
    switch (Platform.OS) {
      case "ios":
        return (
          <Text
            allowFontScaling={false}
            {...this.props}
            style={[
              stylesIOS.regular,
              this.props.thin ? stylesIOS.thin : null,
              this.props.ultraLight ? stylesIOS.ultraLight : null,
              this.props.light ? stylesIOS.light : null,
              this.props.regular ? stylesIOS.regular : null,
              this.props.medium ? stylesIOS.medium : null,
              this.props.semiBold ? stylesIOS.semiBold : null,
              this.props.bold ? stylesIOS.bold : null,
              this.props.heavy ? stylesIOS.heavy : null,
              this.props.black ? stylesIOS.black : null,
              this.props.style,
              stylesIOS.defaultIOS
            ]}
          >
            {this.props.children}
          </Text>
        );
      case "android":
        return (
          <Text
            allowFontScaling={false}
            {...this.props}
            style={[
              stylesANDROID.regular,
              this.props.style,

              styleObj.fontWeight === "100"
                ? styleObj.fontStyle !== "italic"
                  ? stylesANDROID.thin
                  : stylesANDROID.thinItalic
                : null,
              styleObj.fontWeight === "200" ? stylesANDROID.ultraLight : null,
              styleObj.fontWeight === "300"
                ? styleObj.fontStyle !== "italic"
                  ? stylesANDROID.light
                  : stylesANDROID.lightItalic
                : null,
              styleObj.fontWeight === "400" ? stylesANDROID.regular : null,
              styleObj.fontWeight === "500"
                ? styleObj.fontStyle !== "italic"
                  ? stylesANDROID.medium
                  : stylesANDROID.mediumItalic
                : null,
              styleObj.fontWeight === "600" ? stylesANDROID.semiBold : null,
              styleObj.fontWeight === "700"
                ? styleObj.fontStyle !== "italic"
                  ? stylesANDROID.bold
                  : stylesANDROID.boldItalic
                : null,
              styleObj.fontWeight === "800" ? stylesANDROID.heavy : null,
              styleObj.fontWeight === "900"
                ? styleObj.fontStyle !== "italic"
                  ? stylesANDROID.black
                  : stylesANDROID.blackItalic
                : null,

              // !styleObj.fontWeight
              //   ? styleObj.fontStyle === "italic"
              //     ? stylesANDROID.mediumItalic
              //     : null
              //   : null,

              styleObj.fontWeight === "normal" ? stylesANDROID.regular : null,
              styleObj.fontWeight === "bold" ? stylesANDROID.bold : null
            ]}
          >
            {this.props.children}
          </Text>
        );
    }
  }
}
//fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "Roboto"
// 100    Extra Light or Ultra Light
// 200    Light or Thin
// 300    Book or Demi
// 400    Normal or Regular
// 500    Medium
// 600    Semibold, Demibold
// 700    Bold
// 800    Black, Extra Bold or Heavy
// 900    Extra Black, Fat, Poster or Ultra Black

// { fontWeight: '100' }, // Thin
// { fontWeight: '200' }, // Ultra Light
// { fontWeight: '300' }, // Light
// { fontWeight: '400' }, // Regular
// { fontWeight: '500' }, // Medium
// { fontWeight: '600' }, // Semibold
// { fontWeight: '700' }, // Bold
// { fontWeight: '800' }, // Heavy
// { fontWeight: '900' }, // Black

const stylesIOS = StyleSheet.create({
  defaultIOS: {
    fontFamily: "Helvetica Neue"
  },
  thin: {
    fontWeight: "100"
  },
  ultraLight: {
    fontWeight: "200"
  },
  light: {
    fontWeight: "300"
  },
  regular: {
    fontWeight: "400"
  },
  medium: {
    fontWeight: "500"
  },
  semiBold: {
    fontWeight: "600"
  },
  bold: {
    fontWeight: "700"
  },
  heavy: {
    fontWeight: "800"
  },
  black: {
    fontWeight: "900"
  }
});

const stylesANDROID = StyleSheet.create({
  defaultAndroid: {
    fontFamily: "Roboto-Regular",
    fontWeight: null
  },
  thin: {
    fontFamily: "Roboto-Thin",
    fontWeight: null
  },
  ultraLight: {
    fontFamily: "Roboto-Thin",
    fontWeight: null
  },
  light: {
    fontFamily: "Roboto-Light",
    fontWeight: null
  },
  regular: {
    fontFamily: "Roboto-Regular",
    fontWeight: null
  },
  medium: {
    fontFamily: "Roboto-Medium",
    fontWeight: null
  },
  semiBold: {
    fontFamily: "Roboto-Medium",
    fontWeight: null
  },
  bold: {
    fontFamily: "Roboto-Bold",
    fontWeight: null
  },
  heavy: {
    fontFamily: "Roboto-Black",
    fontWeight: null
  },
  black: {
    fontFamily: "Roboto-Black",
    fontWeight: null
  },

  //Italic
  blackItalic: {
    fontFamily: "Roboto-BlackItalic",
    fontWeight: null,
    fontStyle: null
  },
  boldItalic: {
    fontFamily: "Roboto-BoldItalic",
    fontWeight: null,
    fontStyle: null
  },
  italic: {
    fontFamily: "Roboto-Italic",
    fontWeight: null,
    fontStyle: null
  },
  lightItalic: {
    fontFamily: "Roboto-LightItalic",
    fontWeight: null,
    fontStyle: null
  },
  mediumItalic: {
    fontFamily: "Roboto-MediumItalic",
    fontWeight: null,
    fontStyle: null
  },
  thinItalic: {
    fontFamily: "Roboto-ThinItalic",
    fontWeight: null,
    fontStyle: null
  }
});
