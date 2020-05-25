import React, { Component } from "react";
import { HDTextInput } from "component";
import PropTypes from "prop-types";
import Util from "util";

export default class HDTextInputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      maxLength: 0, // max length include space
      maxLengthReal: 0, // // max length without space
      typeInput: this.props.typeInput
    };
  }

  componentDidMount = () => {
    //Check type of input
    if (this.state.typeInput === Util.Constant.TYPE_INPUT_TEXT.IDENTITY_CARD) {
      this.setState({
        maxLength: 15,
        maxLengthReal: 12
      });
    } else {
      this.setState({
        maxLength: 12,
        maxLengthReal: 10
      });
    }
  };

  onChangeInput = async text => {
    this.input.setText(this.addSpace(text));

    if (this.props.onChangeTextInput) {
      this.props.onChangeTextInput(this.state.inputValue);
    }
  };

  getRealText = text => {
    let temp = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " ") {
        temp += text[i];
      }
    }

    if (temp.length > this.state.maxLengthReal) {
      return temp.slice(0, this.state.maxLengthReal);
    }

    return temp;
  };

  addSpace = text => {
    let temp = this.getRealText(text);

    this.setState({
      inputValue: temp
    });

    if (temp.length > 3 && temp.length <= 6) {
      return temp.slice(0, 3) + " " + temp.slice(3, text.length);
    } else if (temp.length > 6 && temp.length <= 9) {
      temp = temp.slice(0, 3) + " " + temp.slice(3, 6) + " " + temp.slice(6, 9);
      return temp;
    } else if (temp.length > 9 && temp.length <= 12) {
      if (this.state.typeInput === Util.Constant.TYPE_INPUT_TEXT.PHONE) {
        temp =
          temp.slice(0, 3) +
          " " +
          temp.slice(3, 6) +
          " " +
          temp.slice(6, text.length);
      } else {
        temp =
          temp.slice(0, 3) +
          " " +
          temp.slice(3, 6) +
          " " +
          temp.slice(6, 9) +
          " " +
          temp.slice(9, 12);
      }
      return temp;
    } else {
      return temp;
    }
  };

  setErrorState(isError, message) {
    this.input.setErrorState(isError, message);
  }

  /**
   * set Value Input
   */
  setText = text => {
    this.setState(
      {
        inputValue: text
      },
      () => {
        this.input.setText(this.addSpace(this.state.inputValue));
      }
    );
  };

  /**
   * get Value Input
   */
  getText = () => {
    return this.state.inputValue;
  };

  empty = () =>{
    return this.input.empty();
  }

  render() {
    return (
      <HDTextInput
        {...this.props}
        ref={ref => (this.input = ref)}
        maxLength={this.state.maxLength}
        onChangeTextInput={this.onChangeInput}
      />
    );
  }
}

//HOW TO USE
{
  /* <HDTextInputNumber
  placeholder={Context.getString("auth_login_input_password")}
  placeholderTextColor={Context.getColor("placeholderColor1")}
/> */
}
