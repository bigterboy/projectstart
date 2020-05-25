import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { HDText, StatusBarCustom,RadioGroup } from "component"
import Context from "context";
import Modal from "react-native-modal";
import Util from "util";
const deviceHeight =
  Platform.OS === "ios"
    ? Context.getWindow().height
    : require("react-native-extra-dimensions-android").get(
      "REAL_WINDOW_HEIGHT"
    );

export default class ModalPaymentHistoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Tất cả",
          selected: true,
          color: Context.getColor("accent2"),
          size: 20,
          type: ""
        },
        {
          label: "Vay tiền mặt",
          selected: false,
          color: Context.getColor("accent2"),
          size: 20,
          type: Util.Constant.LOAN_TYPE.CL
        },
        {
          label: "Vay mua xe",
          selected: false,
          color: Context.getColor("accent2"),
          size: 20,
          type: Util.Constant.LOAN_TYPE.MC
        },
        // {
        //   label: "Vay mua điện thoại",
        //   selected: false,
        //   color: Context.getColor("accent2"),
        //   size: 20,
        //   type: Util.Constant.LOAN_TYPE.MB
        // },
        {
          label: "Vay mua điện máy",
          selected: false,
          color: Context.getColor("accent2"),
          size: 20,
          type: Util.Constant.LOAN_TYPE.ED
        }
      ]
    };

    let selectedButton = this.state.data.find(e => e.selected == true);
    this.props.onSelectLanguage(selectedButton.type);

  }
  onPress = data => {
    let selectedButton = this.state.data.find(e => e.selected == true);
    alert(JSON.stringify(selectedButton.type));
  };

  handleLangChange = () => {
    let selectedButton = this.state.data.find(e => e.selected == true);
    this.props.onSelectLanguage(selectedButton.type);
  };

  render() {
    return (
      <Modal
        transparent
        deviceWidth={Context.getWindow().width}
        deviceHeight={deviceHeight}
        style={styles.modal}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="fadeOutDown"
        animationOutTiming={200}
        onBackButtonPress={this.props.closeModal}
        onBackdropPress={this.props.closeModal}
        {...this.props}
      >
                
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />  

        <View style={styles.container}>
          <HDText style={styles.title}>Lọc theo</HDText>
          <RadioGroup
            color={Context.getColor("accent2")}
            radioButtons={this.state.data}
            onPress={this.handleLangChange}
          />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    width: Context.getWindow().width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: Context.getColor("background"),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  },
  title: {
    color: Context.getColor("text"),
    fontSize: 15,
    fontWeight: "500",
    alignSelf: "center",
    marginBottom: 15,
    
  }
});
