/**
 * This Modal using at Contract Esign
 */

import React, { Component } from "react";
import {
  StyleSheet, View,
  Image,
  TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
import Context from "context";
import { HDButton, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";
import Util from 'util'
import { CheckBox } from 'react-native-elements'

const win = Context.getWindow()

function BottomLine(props) {
  return (
    <View style={styles.line}></View>
  )
}

export default class ModalMonthlyDue extends Component {

  constructor(props) {
    super(props)

    this.state = {
      listDue: [],
      selectedValue: -1,
      firstDate: "",
      isNotSelected: false,
    }
  }

  componentDidMount() {
    const currDate = Util.HDDate.getDate()
    const { currentValue } = this.props
    let listDue = Util.Constant.LIST_DUE_DATE
    let list = listDue.map((item, index) => {
      item["name"] = Context.getString("common_date") + " " + item.code
      item["isSelected"] = false
      return item
    })

    //Check to disabled checkbox
    //only enabled 3 term

    if (currDate < list[0].code) {
      list[list.length - 1].isDisabled = true
    } else if (currDate >= list[0].code) {
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i].code <= currDate) {
          list[i].isDisabled = true
          break
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////

    this.setState({
      listDue: list
    }, () => {
      this.setSelected((currentValue) ? currentValue : null)
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isVisible) {
      this.setSelected(nextProps.currentValue)
    }
  }

  renderCloseX() {
    return (
      <View style={{
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 8
      }}>
        <TouchableOpacity onPress={this.props.pressCancelX ? this.props.pressCancelX : null}>
          <Image
            source={Context.getImage("closePopup")}
            style={styles.close_icon}
          />
        </TouchableOpacity>
      </View>
    )
  }

  onCheck = (item, index) => {
    let { listDue } = this.state
    listDue.forEach(item => {
      item.isSelected = false
    })

    listDue[index].isSelected = true
    const strDate = this.createFullDate(listDue[index].code)

    this.setState({
      listDue: listDue,
      selectedValue: item.code,
      firstDate: strDate,
      isNotSelected: false
    })
  }

  onConfirm = () => {
    const { listDue } = this.state
    const selected = listDue.filter(item => {
      return item.isSelected == true
    })
    if (selected.length > 0) {
      if (this.props.onPressConfirm) {
        this.props.onPressConfirm(selected[0].code)
      }
    } else {
      this.setState({
        ...this.state,
        isNotSelected: true
      })
    }
  }

  setSelected(value) {
    if (value) {
      let { listDue } = this.state
      listDue.forEach(item => {
        item.isSelected = false
      })

      const index = listDue.findIndex(item => item.code == value)
      if (index != -1) {
        listDue[index].isSelected = true

        const strDate = this.createFullDate(listDue[index].code)
        this.setState({
          listDue: listDue,
          selectedValue: listDue[index].code,
          firstDate: strDate
        })
      }
    }
  }

  createFullDate = (value) => {
    if (value > Util.HDDate.getDate()) {
      const date = new Date()
      date.setDate(value)
      // return value + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      return Util.HDDate.formatTo(date)
    } else {
      const date = new Date()
      date.setDate(value)
      date.setMonth(date.getMonth() + 1)
      return Util.HDDate.formatTo(date)
    }
  }

  renderItem = (item, index) => {
    const textColor = (item.isDisabled) ? Context.getColor("textHint") : Context.getColor("textBlack")

    renderDisabled = () => {
      if (item.isDisabled) {
        return (
          <View style={{
            position: "absolute",
            zIndex: 100,
            width: '100%',
            height: Context.getSize(50)
          }}>
          </View>
        )
      }
      return null
    }

    return (
      <View
        key={"item-" + index}
        style={{ width: '100%' }}>
        {renderDisabled()}
        <CheckBox
          key={index}
          containerStyle={styles.check_container}
          textStyle={[
            styles.check_text,
            { color: textColor }
          ]}
          title={item.name}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#1E419B'
          checked={item.isSelected}
          onPress={() => this.onCheck(item, index)}
        />
      </View>
    )
  }

  renderContent = () => {
    const { listDue, isNotSelected } = this.state
    return (
      <View style={styles.content_container}>
        <HDText style={[
          styles.content_title,
          isNotSelected ? styles.content_title_error : null
        ]}>{Context.getString("loan_tab_esign_overview_select_first_due")}</HDText>
        <BottomLine />

        {
          listDue.map((item, index) => {
            return this.renderItem(item, index)
          })
        }

        <HDText style={styles.content_date}>{Context.getString("loan_tab_esign_overview_first_due_date") + this.state.firstDate}</HDText>
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <HDButton
            title={Context.getString("common_confirm")}
            isShadow={true}
            onPress={this.onConfirm} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        backdropOpacity={0.50}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        {...this.props}
      >

        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />  

        <View style={styles.container}>

          {this.renderCloseX()}

          {this.renderContent()}

        </View>
      </Modal>
    );
  }
}

ModalMonthlyDue.propTypes = {
  currentValue: PropTypes.number,
  onPressConfirm: PropTypes.func
}

const styles = StyleSheet.create({
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16),
  },
  container: {
    width: win.width,
    height: win.height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content_container: {
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingVertical: 16,
    backgroundColor: 'white'
  },
  content_title: {
    color: Context.getColor("textBlack"),
    fontSize: Context.getSize(12),
    fontWeight: '400',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  content_title_error: {
    color: Context.getColor("textRed"),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F2F2F2'
  },
  content_date: {
    color: Context.getColor("textStatus"),
    fontSize: Context.getSize(14),
    fontWeight: 'bold',
    lineHeight: Context.getSize(17),
    paddingHorizontal: 16,
    marginVertical: 16
  },
  check_container: {
    width: '100%',
    height: Context.getSize(50),
    marginLeft: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 16,
    borderBottomColor: '#F2F2F2',
  },
  check_text: {
    fontSize: Context.getSize(14),
    fontWeight: '400',
    color: Context.getColor("textBlack")
  }
});
