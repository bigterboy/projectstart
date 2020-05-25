import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";
import { HDText } from "component";
import Context from "context";

const FImage = createImageProgress(FastImage);
const textColor = Context.getColor("background");
const imgTopLeft = Context.getImage("leftYellow");

export default class PromotionItem extends Component {
  _onItemPress = () => {
    if (this.props.onItemPress)
      this.props.onItemPress(this.props.data, this.props.index);
  };
  render() {
    let { data } = this.props;
    return (
      // <TouchableOpacity
      //   activeOpacity={0.8}
      //   style={styles.touchContainer}
      //   onPress={this._onItemPress}
      // >
      //   <View style={styles.item_container}>
      //     <FImage
      //       style={styles.item_image}
      //       source={{
      //         uri: data.imagePathBrief ? data.imagePathBrief : "",
      //         priority: FastImage.priority.normal
      //       }}
      //       resizeMode={FastImage.resizeMode.stretch.cover}
      //     >
      //       <View
      //         style={{
      //           flex: 1,
      //           width: "100%",
      //           backgroundColor: "grey",
      //           justifyContent: "space-between",
      //           alignItems: "flex-start",
      //           borderRadius: 5,
      //           backgroundColor: Context.getColor("blurColorLighter")
      //         }}
      //       >
      //         <ImageBackground
      //           source={imgTopLeft}
      //           style={{
      //             width: Context.getSize(88),
      //             height: Context.getSize(50),
      //             justifyContent: "center",
      //             alignItems: "flex-start",
      //             paddingLeft: 8
      //           }}
      //         >
      //           <HDText style={styles.item_title_rate_text}>Lãi suất ưu đãi</HDText>
      //           <HDText style={styles.item_rate_text}>
      //             {data.interestRate + "%"}
      //           </HDText>
      //         </ImageBackground>

      //         <View style={styles.item_text_container}>
      //           <HDText style={styles.item_title_text} numberOfLines={1}>
      //             {data.typeName}
      //           </HDText>
      //           <HDText style={styles.item_amount_text} numberOfLines={1}>
      //             {data.contentBrief}
      //           </HDText>
      //         </View>
      //       </View>
      //     </FImage>
      //   </View>
      // </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={this._onItemPress}>
        <View style={[
          styles.item_container
        ]}>
          <FImage
            imageStyle={styles.item_image}
            source={{
              uri: data.imagePathBriefApp &&
              data.imagePathBriefApp.indexOf("http") !== -1
              ? data.imagePathBriefApp : "",
              priority: FastImage.priority.normal,
            }}>
          </FImage>

          <View style={{
            ...StyleSheet.absoluteFillObject,
            top: 0,
            backgroundColor: Context.getColor("blurColorLighter"),
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: Context.getSize(5)
          }}>
            <ImageBackground source={imgTopLeft} style={{
              width: Context.getSize(88),
              height: Context.getSize(50),
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 8
            }}>
              <HDText style={styles.item_title_rate_text}>{Context.getString("component_promotion_rate")}</HDText>
              <HDText style={styles.item_rate_text}>{data.interestRate + "%"}</HDText>
            </ImageBackground>

            <View style={styles.item_text_container}>
              <HDText style={styles.item_title_text}>{data.typeName}</HDText>
              <HDText
                numberOfLines={1}
                style={styles.item_amount_text}>
                {data.contentBrief}
              </HDText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // touchContainer: {
  //   width: Context.getWindow().width - 30,
  //   height: ((Context.getWindow().width - 30) / 248) * 100,
  //   marginHorizontal: 15,
  //   marginBottom: 15
  // },
  // item_container: {
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   borderRadius: 5,
  //   shadowOpacity: 1,
  //   shadowColor: Context.getColor("hint"),
  //   shadowOffset: { width: 0, height: 1 },
  //   elevation: 3
  // },
  // item_image: {
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "flex-end",
  //   alignItems: "flex-start"
  // },
  // item_text_container: {
  //   width: "100%",
  //   justifyContent: "center",
  //   alignItems: "flex-start",
  //   paddingHorizontal: 12,
  //   marginBottom: 13
  // },
  // item_title_text: {
  //   fontSize: Context.getSize(16),
  //   fontWeight: "500",
  //   color: textColor,
  //   marginBottom: 1
  // },
  // item_amount_text: {
  //   fontSize: Context.getSize(22),
  //   color: textColor,
  //   fontWeight: "bold"
  // },
  // item_title_rate_text: {
  //   fontSize: Context.getSize(8),
  //   fontWeight: "700",
  //   color: textColor
  // },
  // item_rate_text: {
  //   fontSize: Context.getSize(20),
  //   fontWeight: "700",
  //   color: textColor
  // }
  item_container: {
    width: Context.getSize(343),
    height: Context.getSize(140),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: Context.getSize(5),
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 2 },
    elevation: Context.getSize(4),
    marginBottom: Context.getSize(16)
  },
  item_image: {
    width: '100%',
    height: Context.getSize(140),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Context.getSize(5),
  },
  item_text_container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  item_title_text: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(19),
    fontWeight: '500',
    color: textColor
  },
  item_amount_text: {
    fontSize: Context.getSize(22),
    fontWeight: 'bold',
    lineHeight: Context.getSize(26),
    color: textColor,
  },
  item_title_rate_text: {
    fontSize: Context.getSize(8),
    lineHeight: Context.getSize(10),
    fontWeight: 'bold',
    color: textColor
  },
  item_rate_text: {
    fontSize: Context.getSize(20),
    lineHeight: Context.getSize(24),
    fontWeight: 'bold',
    color: textColor
  }
});
