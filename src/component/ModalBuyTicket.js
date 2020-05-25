import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking
} from "react-native";
import PropTypes from "prop-types";
import Context from "context";
import { HDButton, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";
import Util from "util";
import LocalStorage from "middleware/helper/LocalStorage";

const win = Context.getWindow();
const heightDefault = 812;
export default class ModalBuyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkTicket: null
    };
  }

  componentDidMount = async () => {
    const linkTicket = await LocalStorage.getLinkTicket();
    this.setState({ linkTicket: linkTicket });
  };

  renderTop = () => {
    return <View style={styles.top_container} />;
  };

  renderCenter = () => {
    return (
      <View style={styles.center_container}>
        <HDText style={styles.center_title}>
          {Context.getString("component_modal_buy_ticket_title")}
        </HDText>

        <HDText>
          <HDText style={styles.center_step_content}>
            {Context.getString("component_modal_buy_ticket_step") + " 1: "}
            {Context.getString("component_modal_buy_ticket_step_01")}
          </HDText>
        </HDText>

        <HDText>
          <HDText style={styles.center_step_content}>
            {Context.getString("component_modal_buy_ticket_step") + " 2: "}
            {Context.getString("component_modal_buy_ticket_step_02")}
          </HDText>
        </HDText>

        <HDText>
          <HDText style={styles.center_step_content}>
            {Context.getString("component_modal_buy_ticket_step") + " 3: "}
            {Context.getString("component_modal_buy_ticket_step_03")}{" "}
            <HDText style={styles.center_step}>
              {Context.getString(
                "component_modal_buy_ticket_step_03_highlight"
              )}
            </HDText>
          </HDText>
        </HDText>

        <HDText>
          <HDText allowFontScaling style={styles.center_step_content}>
            {Context.getString("component_modal_buy_ticket_step") + " 4: "}
            {Context.getString("component_modal_buy_ticket_step_04")}
          </HDText>
        </HDText>

        <HDText>
          <HDText allowFontScaling style={styles.center_step_content}>
            {Context.getString("component_modal_buy_ticket_step") + " 5: "}
            {Context.getString("component_modal_buy_ticket_step_05")}
          </HDText>
        </HDText>
      </View>
    );
  };

  renderBottom = () => {
    return (
      <View style={styles.bottom_container}>
        <HDButton
          title={Context.getString("component_modal_buy_ticket_buy")}
          isShadow
          onPress={() =>
            this.state.linkTicket
              ? Linking.openURL(this.state.linkTicket)
              : Linking.openURL(Util.Constant.LINK_DEFAULT_MODAL_TICKET)
          }
        />

        <HDText style={styles.bottom_text}>
          {Context.getString("component_modal_buy_ticket_bottom")}
        </HDText>
      </View>
    );
  };

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={false}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        style={styles.containerModal}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>
          <View style={styles.containerIMGCloseButton}>
            <TouchableOpacity
              onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
              style={{
                paddingLeft: Context.getSize(30),
                paddingBottom: Context.getSize(2),
                paddingRight: Context.getSize(15)
              }}
            >
              <Image
                source={Context.getImage("closePopup")}
                style={styles.close_icon}
              />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={Context.getImage("popupBuyTicket")}
            resizeMode="stretch"
            style={styles.containerImgBackGround}
            imageStyle={{ flex: 1 }}
          >
            {this.renderTop()}

            {this.renderCenter()}

            {this.renderBottom()}
          </ImageBackground>
        </View>
        {/* Area click close modeal for bigger area click */}
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={styles.areaTouchableClose}
        />
      </Modal>
    );
  }
}

ModalBuyTicket.propTypes = {
  onPressConfirm: PropTypes.func
};

const styles = StyleSheet.create({
  containerModal: {
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%"
  },
  containerIMGCloseButton: {
    width: Context.getWindow().width,
    alignItems: "flex-end"
  },
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  areaTouchableClose: {
    height: Context.getSize(100),
    width: Context.getSize(80),
    position: "absolute",
    top: Platform.OS === "ios" ? Context.getSize(10) : Context.getSize(-10),
    right: -20
  },
  container: {
    width: win.width,
    height: win.height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Context.getSize(8)
  },
  containerImgBackGround: {
    width: "100%",
    height: 0.75 * Context.getWindow().height
  },
  top_container: {
    width: "100%",
    //height: (169.5 / heightDefault) * Context.getWindow().height,
    height: (152.5 / heightDefault) * Context.getWindow().height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Context.getSize(14)
  },
  center_container: {
    width: "100%",
    height: (295 / heightDefault) * Context.getWindow().height,
    justifyContent: "space-evenly",
    paddingHorizontal: Context.getSize(22),
    paddingVertical: Context.getSize(10)
  },
  bottom_container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: Context.getSize(16)
  },
  center_title: {
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    width: "100%"
  },
  center_step: {
    fontSize: Context.getSize(14),
    fontWeight: "bold",
    width: "100%"
  },
  center_step_content: {
    fontSize: Context.getSize(14)
  },
  bottom_text: {
    fontSize: Context.getSize(14),
    fontStyle: "italic",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: Context.getSize(20)
  }
});
