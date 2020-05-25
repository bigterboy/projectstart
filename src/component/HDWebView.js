import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Linking,
  Platform,
  ActivityIndicator
} from "react-native";
import Context from "context";
import { WebView } from "react-native-webview";
//import WebStaticInstruction from "resource/files/index.html";
import Util from "util";

export default class HDWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      isEnableScroll: true
    };
  }

  htmlScript = () => {
    return Util.String.getHTML(
      this.props.bannerImage,
      this.props.title,
      this.props.content
    );
  };

  /*
   *
   * Function:  Check click link on Website mobile and open new tab on mobile.
   *
   * Notice: use for ios
   *
   * @event: check event for click link on html
   *
   */
  onNavigationChange = async event => {
    if (!event.loading && event.title) {
      console.log("FINISH LOADING");
    }

    if (
      event.url &&
      event.url !== "about:blank" &&
      event.url !== "about:blank%231"
    ) {
      if (
        event.url.indexOf("https://") !== -1 ||
        (event.url.indexOf("http://") !== -1 &&
          event.url.indexOf("localhost") === -1)
      ) {
        this.webview.stopLoading();
        Linking.openURL(event.url);
      }
    }
  };

  renderLoading = () => {
    return (
      <ActivityIndicator
        style={styles.indicatorStyle}
        size="small"
        color="red"
      />
    );
  };

  /*
   *
   * Render:  Webview for mobile
   *
   * Notice: attribute onNavigationStateChange use for ios but android need function onShouldStartLoadWithRequest for not open webview new page inside
   *
   */
  renderWebView = () => {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        useWebKit={Platform.OS === "ios" ? true : false}
        scrollEnabled={this.state.isEnableScroll}
        source={{ html: this.htmlScript() }}
        style={{
          overflow: "hidden"
        }}
        bounces={false}
        allowFileAccess={true}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        onNavigationStateChange={this.onNavigationChange.bind(this)}
        renderLoading={() => this.renderLoading()}
        startInLoadingState={true}
        onMessage={event => {
          alert("MESSAGE " + event.nativeEvent.data);
        }}
        {...(Platform.OS === "android"
          ? {
              onShouldStartLoadWithRequest: request => {
                if (
                  request.url.indexOf("https://") !== -1 ||
                  request.url.indexOf("http://") !== -1
                ) {
                  Linking.openURL(request.url);
                }
              }
            }
          : null)}
        {...this.props}
      />
    );
  };

  /*
   *
   * Render Webview
   *
   */
  render() {
    return <View style={styles.webContainer}>{this.renderWebView()}</View>;
  }
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: "absolute",
    alignSelf: "center",
    top: Context.getSize(100)
  },
  webContainer: {
    flex: 1
  }
});
