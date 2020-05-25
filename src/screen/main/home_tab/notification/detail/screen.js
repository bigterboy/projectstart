import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BaseScreen, Header, HDButton, HDText } from "component";
import Context from "context";
import { createImageProgress } from "react-native-image-progress";
import FastImage from "react-native-fast-image";
import Share from "react-native-share";

const FImage = createImageProgress(FastImage);

const iconShare = Context.getImage("share");

const testContent =
  "Từ ngày 16/03/2019, khách hàng khi vay mua trả góp xe máy qua HD SAISON sẽ được tặng ưu đãi khủng HOÀN TIỀN LÊN ĐẾN 24 TRIỆU ĐỒNG," +
  " cơ hội sở hữu ngay chiếc xe mơ ước vốn dễ dàng nay thêm ưu đãi lại càng hấp dẫn hơn:" +
  "- Hoàn tiền tối đa 1 triệu đồng/tháng hoặc 24 triệu đồng trong suốt thời hạn vay khi khách hàng thanh toán tiền vay hàng tháng đầy đủ và đúng hạn." +
  "- Áp dụng trên toàn quốc." +
  "- Thủ tục đơn giản: Chỉ cần CMND và Hộ khẩu." +
  " cơ hội sở hữu ngay chiếc xe mơ ước vốn dễ dàng nay thêm ưu đãi lại càng hấp dẫn hơn:" +
  "- Hoàn tiền tối đa 1 triệu đồng/tháng hoặc 24 triệu đồng trong suốt thời hạn vay khi khách hàng thanh toán tiền vay hàng tháng đầy đủ và đúng hạn." +
  "- Áp dụng trên toàn quốc." +
  "- Thủ tục đơn giản: Chỉ cần CMND và Hộ khẩu." +
  " cơ hội sở hữu ngay chiếc xe mơ ước vốn dễ dàng nay thêm ưu đãi lại càng hấp dẫn hơn:" +
  "- Hoàn tiền tối đa 1 triệu đồng/tháng hoặc 24 triệu đồng trong suốt thời hạn vay khi khách hàng thanh toán tiền vay hàng tháng đầy đủ và đúng hạn." +
  "- Áp dụng trên toàn quốc." +
  "- Thủ tục đơn giản: Chỉ cần CMND và Hộ khẩu." +
  " cơ hội sở hữu ngay chiếc xe mơ ước vốn dễ dàng nay thêm ưu đãi lại càng hấp dẫn hơn:" +
  "- Hoàn tiền tối đa 1 triệu đồng/tháng hoặc 24 triệu đồng trong suốt thời hạn vay khi khách hàng thanh toán tiền vay hàng tháng đầy đủ và đúng hạn." +
  "- Áp dụng trên toàn quốc." +
  "- Thủ tục đơn giản: Chỉ cần CMND và Hộ khẩu.";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
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
      url: this.props.navigation.getParam("item").shareURL
    };
    this.data = this.props.navigation.getParam("item");
  }

  componentDidUpdate() {}
  componentDidMount() {}

  onPressShare = () => {
    Share.open(this.shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  onPressConfirm = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Chi tiết thông báo"
          navigation={this.props.navigation}
          rightIcon={iconShare}
          rightOnPress={this.onPressShare}
        />
        <View style={{ flex: 1 }}>
          <FImage
            style={styles.banner_container}
            source={{
              uri: this.data.imageURL,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.stretch}
            blurRadius={100}
          />
          <View
            style={{
              marginHorizontal: 8,
              position: "absolute",
              flex: 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: "100%",
                flex: 1
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: (Context.getWindow().width / 16) * 9 - 20
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  padding: 15
                }}
              >
                <HDText style={styles.content_title_tex}>{this.data.title}</HDText>
                <HDText style={styles.content_info_text}>
                  {this.data.content === "" ? testContent : this.data.content}
                </HDText>
                <View style={{ marginTop: 15 }} />
                {/* <Button lowerCase title="Đăng ký ngay" /> */}
                <HDButton 
                  title={Context.getString("common_register_now")}
                  isShadow
                />
              </View>
            </ScrollView>
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
    height: (Context.getWindow().width / 16) * 9
  },
  content_title_tex: {
    fontSize: Context.getSize(16),
    color: Context.getColor("text"),
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 26
  },
  content_info_text: {
    fontSize: Context.getSize(16),
    color: Context.getColor("text"),
    fontWeight: "400",
    lineHeight: 24
  }
});
