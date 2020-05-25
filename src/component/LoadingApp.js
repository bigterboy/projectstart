import BaseScreen from "component/BaseScreen";
import React from "react";
import { StyleSheet, Image, View, Dimensions, Text } from "react-native";
const win = Dimensions.get("window");
import Context from "context";

const imgBottom = Context.getImage("headerBottom")
export default class LoadingApp extends BaseScreen {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={Context.getImage("logo")}
          resizeMode="contain"
          style={styles.imageLogo}
        /> */}
        <Image source={Context.getImage("splash")} resizeMode='contain' style={{flex:1}}></Image>

        {/* <Image 
          style={{
            width:Context.getSize(200),
            height:Context.getSize(200)
          }}
          resizeMode='contain'
          source={Context.getImage("animationSplash")}/> */}

        {/* <Image
          style={styles.imageBottom}
          source={imgBottom}
          resizeMode="stretch"
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Context.getColor("background")
  },
  imageLogo: {
    width: "55%"
  },
  imageBottom: {
    width: win.width,
    height:49,
    position: 'absolute',
    bottom: -1
  }
});
