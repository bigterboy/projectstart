import React from "react";
import { StyleSheet, View, WebView } from "react-native";
import { BaseScreen, Header, HDText } from "component";
import Context from "context";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";
import Share from "react-native-share";
import Network from "middleware/helper/Network";

const FImage = createImageProgress(FastImage);
const iconShare = Context.getImage("share");

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      item: []
    };

    this.navData = this.props.navigation.getParam("navData");

    this.shareOptions = {
      title: "Share via",
      message: "some message",
      social: [
        Share.Social.MESSENGER,
        Share.Social.FACEBOOK,
        Share.Social.EMAIL,
        Share.Social.SMS,
        Share.Social.INSTAGRAM,
        Share.Social.WHATSAPP
      ],
      url: "https://www.hdsaison.com.vn/"
    };
  }

  componentDidMount = async () => {
    await this.detailAPI();
  }

  detailAPI = async () => {
    const { isLogin } = this.props
    console.log("detailAPI-Id: " + JSON.stringify(this.navData.id))
    try {
      let result = null
      Context.application.showLoading();
      if (isLogin) {
        result = await Network.newDetail(this.navData.id);
      } else {
        result = await Network.newDetailGeneral(this.navData.id);
      }
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          console.log("API-NEWS-DETAIL-COMPLETE: " + JSON.stringify(result));
          if (result.payload != null) {
            this.setState({
              title: result.payload.title,
              content: result.payload.content
            });
          }
        } else {
          console.log("ERROR-API-NEWS-DETAIL: " + result.code);
          console.log(
            "ERROR-API-NEWS-DETAIL: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-NEWS-DETAIL " + err.message);
      Context.application.hideLoading();
    }
  };

  onPressShare = () => {
    Share.open(this.shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  onPressConfirm = () => { };

  htmlScript = () => {
    const html = `
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="outer">
          <div id="inner">
          ${this.state.content}
          </div>
        </div>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
          document.body.style.overflow = 'hidden';
        </script>
        <style>
          #outer {
              overflow:hidden;
          }
          #inner {
              overflow:scroll; 
          }
        </style>
    </body>
    </html>
    `;
    return html;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("home_tab_group_header_news")}
          navigation={this.props.navigation}
          rightIcon={iconShare}
          rightOnPress={this.onPressShare}
        />

        <View style={styles.content_container}>
          <FImage
            style={styles.banner_container}
            source={{
              uri: this.navData.imagePath,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.stretch}
            blurRadius={100}
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={styles.top_container}></View>
            <View style={styles.bottom_container}>
              <View style={{ width: "100%", alignItems: "flex-start" }}>
                <HDText style={styles.content_title_text}>
                  {this.state.title}
                </HDText>
              </View>

              <WebView
                useWebKit={true}
                javaScriptEnabled={true}
                scrollEnabled={true}
                source={{ html: this.htmlScript() }}
                style={{ height: Number(this.state.height) }}
                domStorageEnabled={true}
                scalesPageToFit={false}
                decelerationRate="normal"
                javaScriptEnabledAndroid={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                  flex: 1, width: Context.getSize(359),
                  marginBottom: Context.getSize(66),
                  overflow: 'hidden'
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  banner_container: {
    width: "100%",
    height: Context.getSize(250)
  },
  content_container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  top_container: {
    width: "100%",
    height: Context.getSize(200)
  },
  bottom_container: {
    flex: 1,
    width: Context.getSize(359),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 16,
    backgroundColor: 'white'
  },
  scroll_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Context.getSize(82)
  },
  content_title_text: {
    fontSize: Context.getSize(18),
    fontWeight: "bold",
    lineHeight: Context.getSize(26),
    marginBottom: 16
  },
  content_info_text: {
    fontSize: Context.getSize(16),
    fontWeight: "400",
    lineHeight: 24
  },
  bottom_button_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Context.getSize(66),
    alignItems: "center",
    paddingHorizontal: 16
  }
});