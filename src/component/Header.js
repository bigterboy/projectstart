import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ImageBackground
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { HDText } from "component";
import Context from "context";
import Util from 'util'

const barContentHeight = Context.getSize(44)
export default class HeaderView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isDisabledRight: false
    }
  }

  renderLeftIcon = () => {
    return (
      <Image
        source={this.props.leftIcon ? leftIcon : Context.getImage("headerBack")}
        style={styles.leftIcon}
        resizeMode='contain'
      />
    );
  };
  renderRightIcon = rightText => {
    if (rightText)
      return (
        <View style={{ marginBottom: 5 }}>
          <HDText style={styles.rightText}>{rightText}</HDText>
        </View>
      )
    if (this.props.isShowRightIcon === false) {
      return null
    }
    return <Image source={this.props.rightIcon} style={styles.rightIcon} resizeMode='contain' />;
  };
  getTitleStyle = colorTitle => {
    const { subTitle } = this.props
    let marginBottom = (subTitle) ? 0 : 5
    if (colorTitle) return [styles.title, { marginBottom: marginBottom }, { color: colorTitle }];
    else return [styles.title, { marginBottom: marginBottom }];
  };

  getSubTitleStyle = colorSubTitle => {
    if (colorSubTitle) return [styles.subTitle, { color: colorSubTitle }];
    else return styles.subTitle;
  };

  getContainerStyle = () => {
    return styles.container;
  };

  getHeight = () => {
    return Util.App.statusBarHeight() + barContentHeight
  }

  renderSubTitle = () => {
    let subTitle = this.props.subTitle ? this.props.subTitle : "";
    if (subTitle) {
      return <HDText style={this.getSubTitleStyle(this.props.colorSubTitle)}>{subTitle}</HDText>
    }
    return null
  }

  _rightOnPress = () => {
    this.setState({ isDisabledRight: true },
      () => {
        setTimeout(() => {
          this.setState({ isDisabledRight: false })
        }, 2000);
      })

    if (this.props.rightOnPress) this.props.rightOnPress()
  }

  render() {
    let leftOnPress = this.props.navigation
      ? (this.props.leftOnPress ? this.props.leftOnPress : this.props.navigation.goBack)
      : undefined;
    let leftIcon = this.props.navigation ? this.renderLeftIcon() : undefined;
    let title = this.props.title ? this.props.title : "";
    let rightIcon = this.props.rightIcon ? this.renderRightIcon() : undefined;
    rightIcon = this.props.rightText
      ? this.renderRightIcon(this.props.rightText)
      : rightIcon;
    return (
      // <View {...this.props} style={this.getContainerStyle()}>
      <ImageBackground source={Context.getImage("headerLeftSmall")} style={this.getContainerStyle()}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        // hidden
        />
        {/* <Image
          source={Context.getImage("headerBottom")}
          resizeMode="stretch"
          style={styles.imageBack}
        /> */}
        <View style={styles.statusBarSpace} />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.touchLeft}
            onPress={() => {
              leftOnPress ? leftOnPress() : undefined;
            }}
          >
            {leftIcon}
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <HDText
              style={this.getTitleStyle(this.props.colorTitle)}
              // adjustsFontSizeToFit={true}
              numberOfLines={1}>
              {title}
            </HDText>

            {this.renderSubTitle()}

          </View>
          <TouchableOpacity
            style={styles.touchRight}
            disabled={this.state.isDisabledRight}
            onPress={this._rightOnPress}
          >
            {rightIcon}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Context.getColor("primary"),
    // borderBottomLeftRadius:7,
    // borderBottomRightRadius:7,
    // ...Platform.select({
    //   android: {
    //     elevation: 2
    //   },
    //   ios: {
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.7,
    //     shadowRadius: 2
    //   }
    // })
    zIndex: 5
  },
  statusBarSpace: {
    // backgroundColor:'blue',
    ...Platform.select({
      android: {
        height: StatusBar.currentHeight
      },
      ios: {
        ...ifIphoneX(
          {
            height: 50
          },
          {
            height: 20
          }
        )
      }
    })
  },
  content: {
    height: barContentHeight,
    width: "100%",
    flexDirection: "row",
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftIcon: {
    resizeMode: "contain",
    width: Context.getSize(32),
    height: Context.getSize(32),
  },
  rightIcon: {
    resizeMode: "contain",
    width: Context.getSize(32),
    height: Context.getSize(32),
  },
  rightText: {
    color: "#FFF",
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontSize: Context.getSize(18),
    lineHeight: Context.getSize(22),
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "center",
    color: "#FFF",
    fontSize: Context.getSize(12),
    lineHeight: Context.getSize(22),
    fontWeight: "500",
    marginBottom: 10
  },
  // title: {
  //   flex: 1,
  //   width:'100%',
  //   height: 44,
  //   textAlign: "center",
  //   textAlignVertical: "center",
  //   color: "#FFF",
  //   fontSize: 17,
  //   fontWeight: "500",
  //   position: "absolute",
  //   zIndex:1,
  //   paddingHorizontal:48,
  //   // backgroundColor:'green'
  // },
  touchLeft: {
    width: Context.getSize(70),
    height: Context.getSize(50),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  touchRight: {
    width: Context.getSize(70),
    height: Context.getSize(50),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16
  },
  // imageBack: {
  //   width: Context.getWindow().width,
  //   height: (Context.getWindow().width / 1125) * 98,
  //   position: "absolute",
  //   bottom: 0
  // }
});
