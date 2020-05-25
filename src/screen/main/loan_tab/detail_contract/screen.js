import React from "react";
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import {
  BaseScreen,
  Header,
  ModalPopupEmail,
  HDPdf,
  HDAnimatedLoading
} from "component";
import Util from 'util'
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import TabSelection from "./component/TabSelection";

// import Pdf from 'react-native-pdf';

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      modalEmail: false,
      base64pdf: [],
      selectedIndex: 0,
      isLoading: true
    };
    this.navData = this.props.navigation.getParam("navData");
  }

  componentDidMount = async () => {
    this.storeUser = await LocalStorage.getUser();
    this.fileHandleAPI(0);
  };

  /**Finish Loading */
  finishLoading = () => {
    this.setState({ isLoading: false })
  }

  onPressMail = () => {
    this.setState({
      modalEmail: true
    });
  };

  /**Call Send Mail API */
  callSendMailAPI = async email => {
    try {
      //Phản hồi lại modal send mail
      this.modalEmail.complete();

      const result = await Network.contractSendFile(
        this.navData.contractID,
        this.storeUser.customer.uuid,
        email,
        Util.Constant.SEND_MAIL_TYPE.DETAIL
      );

      if (result != null) {
        if (result.code === 200) {
          console.log("SEND-FILE-COMPLETE");
        } else {
          console.log("ERROR-API-SEND-FILE: " + result.code);
          console.log(
            "ERROR-API-SEND-FILE: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-SEND-FILE: " + err.message);
    }
  };

  onPressTab = async index => {
    if (index !== 0) {
      this.fileHandleAPI(index);
    }
    await this.setState({
      selectedIndex: index
    });
  };

  fileHandleAPI = async index => {
    if (this.state.base64pdf.length >= 2) {
      return;
    }
    try {
      let result = null;
      //Tab hợp đồng tín dụng
      if (index === 0) {
        result = await Network.esignDownFile(
          // this.urls[index]
          //this.navData.attachments[index]
          this.navData.attachments
        );
      } else if (index === 1) {
        //Tab Thoả thuận điều chỉnh thông tin
        result = await Network.esignDownFile(this.navData.lstAdj);
      }

      if (result != null) {
        if (result.code === 200) {
          console.log(result.payload.data);

          this.setState(prevState => ({
            base64pdf: [...prevState.base64pdf, result.payload.data]
          }));
        } else {
          // Trả về mã lỗi khác
          Context.application.showModalAlert(
            "\n" + Network.getMessageFromCode(result.code) + "\n",
            false,
            () => {
              if (index === 0) {
                this.props.navigation.pop();
              }
            }
          );
          console.log("ERROR-DOWNLOAD-FILE: " + result.code);
          console.log(
            "ERROR-DOWNLOAD-FILE: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      Context.application.showModalAlert(
        "\n" + Context.getString("common_error_try_again") + "\n",
        false,
        () => {
          console.log("GIA TRI INDEX LA: " + index);
          if (index === 0) {
            this.props.navigation.pop();
          }
        }
      );
      console.log("ERROR-DOWNLOAD-FILE: " + err.message);
    }
    this.finishLoading()
  };

  renderTab() {
    if (this.navData.attachments.length > 0 && this.navData.lstAdj.length > 0) {
      return <TabSelection onPressTab={this.onPressTab}></TabSelection>;
    }
    return null;
  }

  renderLoading = () => {
    const { isLoading } = this.state
    if (isLoading) {
      return (
        <HDAnimatedLoading style={{ flex: 1, height: '100%' }} />
      )
    }
    return null
  }

  renderWithoutLoading = () => {
    const { base64pdf, isLoading } = this.state
    const source = {
      uri:
        "data:application/pdf;base64," +
        base64pdf[this.state.selectedIndex] +
        "",
      cache: true
    };
    if (!isLoading) {
      return (
        <View style={styles.content_container}>
          <Image
            source={Context.getImage("detailContractSigned")}
            style={styles.top_image}
          />
          <HDPdf source={source} />
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("loan_tab_detail_contract_nav")}
          navigation={this.props.navigation}
          rightIcon={Context.getImage("iconMail")}
          rightOnPress={this.onPressMail}
        />

        {this.renderTab()}

        {this.renderLoading()}

        {this.renderWithoutLoading()}

        <ModalPopupEmail
          ref={ref => (this.modalEmail = ref)}
          isVisible={this.state.modalEmail}
          onSendEmail={this.callSendMailAPI}
          pressCancelX={() => this.setState({ modalEmail: false })}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content_container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "grey",
    paddingHorizontal: 5
  },
  top_image: {
    position: "absolute",
    zIndex: 1,
    top: 5,
    right: 0,
    width: Context.getSize(108),
    height: Context.getSize(98)
  },
  content: {
    flex: 1,
    backgroundColor: Context.getColor("background"),
    marginTop: 10,
    width: "100%",
    height: "100%"
  },
  title_text: {
    fontSize: Context.getSize(18),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
    lineHeight: Context.getSize(26),
    color: Context.getColor("textContent")
  },
  content_text: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(20),
    paddingHorizontal: 16
  }
});
