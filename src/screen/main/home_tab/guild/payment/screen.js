import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Text
} from "react-native";
import { BaseScreen, Header, HDText } from "component";
import Context from "context";

// const title = "Hướng dẫn thanh toán";
// const content =
//   "1. Quý khách vui lòng thanh toán đầy đủ và đúng hạn theo Thỏa thuận tín dụng đã ký để tránh tình trạng thông tin “nợ xấu” của Quý khách được cập nhật lên Trung tâm thông tin tín dụng của Ngân hàng Nhà nước Việt Nam, việc này sẽ dẫn đến khả năng các tổ chức tín dụng khác có thể từ chối cung cấp khoản vay khi Quý khách có nhu cầu trong tương lai." +
//   "\n \n" +
//   "2. Quý khách sẽ có cơ hội nhận được những khuyến mại hấp dẫn cũng như được hưởng lãi suất ưu đãi dành riêng cho khách hàng thanh toán đầy đủ và đúng hạn." +
//   "\n \n" +
//   "3. Khi thanh toán cho HD SAISON, Quý khách cần nêu rõ số Thỏa thuận tín dụng, ngày tháng thanh toán để tránh thanh toán sai Thỏa thuận tín dụng." +
//   "\n \n" +
//   "4. Quý khách vui lòng không thanh toán cho bất kỳ nhân viên nào của HD SAISON, ngoại trừ Nhân viên Thu hồi nợ trực tiếp của HD SAISON hoặc đối tác thu hồi nợ được HD SAISON ủy quyền.";

import GuildPayment from "resource/files/GuildPayment.json";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {}
  componentDidMount() {}

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("home_tab_guild_payment_nav")}
          navigation={this.props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            accessibilityRole={"image"}
            source={Context.getImage("bgGuildPayment")}
            style={styles.background}
            imageStyle={styles.logo}
          ></ImageBackground>
          <View
            style={{
              marginHorizontal: Context.getSize(8),
              backgroundColor: "white",
              padding: Context.getSize(16),
              borderRadius: 5
            }}
          >
            <HDText style={styles.content_title_tex}>
              {GuildPayment.title}
            </HDText>

            <HDText style={styles.content_info_text}>
              {GuildPayment.content}
            </HDText>
          </View>
        </ScrollView>
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
  content_title_tex: {
    fontSize: Context.getSize(18),
    fontWeight: "700",
    marginBottom: Context.getSize(10),
    lineHeight: 26,
    flex: 1 ,
    color: "black"
  },
  content_info_text: {
    fontSize: Context.getSize(16),
    fontWeight: "400",
    lineHeight: 24,
    color: "black"
  },
  logo: {
    overflow: "visible",
    resizeMode: "cover",
    height: Context.getSize(250)
  },
  background: {
    height: Context.getSize(200)
  },
  sectionContainer: {
    marginTop: Context.getSize(32),
    paddingHorizontal: Context.getSize(24)
  }
});
