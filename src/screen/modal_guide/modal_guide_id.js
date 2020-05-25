import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { HDText, StatusBarCustom } from "component";
import Context from "context";
import Modal from "react-native-modal";

export default class ModalGuideId extends Component {
  render() {
    return (
      <Modal
        transparent
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

        <View style={styles.wrapper}>
          <View style={styles.header} />
          <View style={styles.container}>
            <HDText style={styles.title}>
              {Context.getString("auth_modal_guide_id_title")}
            </HDText>
            <Image
              source={Context.getImage("identifyCard")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
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
  wrapper: {
    width: Context.getWindow().width,
    alignItems: "center"
  },
  header: {
    opacity: 0.7,
    width: 25,
    height: 5,
    borderRadius: 5,
    backgroundColor: Context.getColor("background"),
    marginBottom: 3
  },
  container: {
    width: Context.getWindow().width,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: Context.getColor("background"),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  },
  title: {
    fontSize: Context.getSize(14),
    textAlign: "center",
    marginTop:24,
    marginBottom: 24,
    color: Context.getColor("text"),
    fontWeight: "500",
    lineHeight:Context.getSize(17)
  },
  image: {
    width: Context.getSize(331),
    height: Context.getSize(190),
    marginBottom:40
  },
});
