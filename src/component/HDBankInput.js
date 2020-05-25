import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { HDTextInput } from "component";
import PropTypes from "prop-types";
import Context from "context";

export default class HDBankInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      isShowPassword: false
    };
  }

  onChangeInput = async text => {
    const { inputValue } = this.state;

    // Phải lấy lenght của text bằng công thức vì nếu
    // lấy trực tiếp có trường hợp text có " " và "●"
    if (this.getCurrentLenghtInput(text) >= inputValue.length) {
      await this.setState({
        inputValue: inputValue + text[text.length - 1]
      });
    } else {
      await this.setState({
        inputValue: inputValue.slice(0, inputValue.length - 1)
      });
    }

    if (this.state.isShowPassword) {
      this.setTextAllWithoutHide(this.state.inputValue);
    } else {
      this.setTextExcept4(this.state.inputValue);
    }

    if (this.props.onChangeText) this.props.onChangeText(this.state.inputValue)
  };

  getCurrentLenghtInput = text => {
    return text.length - text.length / 5;
  };

  setTextExcept4 = async text => {
    if (text.length > 4) {
      let temp = "";
      for (let i = 0; i < text.length - 4; i++) {
        temp += "●";
        if ((text.length - i - 1) % 4 === 0) {
          temp += " ";
        }
      }
      this.input.setText(temp + text.slice(text.length - 4, text.length));
    } else {
      this.input.setText(text);
    }
  };

  setTextAllWithoutHide = text => {
    let temp = "";
    for (let i = 0; i < text.length; i++) {
      temp += text[i];
      if ((text.length - i - 1) % 4 === 0 && i !== text.length - 1) {
        temp += " ";
      }
    }
    this.input.setText(temp);
  };

  changeIconPassword = async () => {
    await this.setState({
      isShowPassword: !this.state.isShowPassword
    });

    if (this.state.isShowPassword) {
      this.setTextAllWithoutHide(this.state.inputValue);
    } else {
      this.setTextExcept4(this.state.inputValue);
    }
  };

  setErrorState = (isError, message) => {
    this.input.setErrorState(isError, message)
  }

  /**
   * set Value Input
   */
  setText = (text) => {
    this.setState({
      inputValue: text
    }, () => {
      if (this.state.isShowPassword) {
        this.setTextAllWithoutHide(this.state.inputValue);
      } else {
        this.setTextExcept4(this.state.inputValue);
      }
    })
  }

  /**
   * get Value Input
   */
  getText = () => {
    return this.state.inputValue
  }

  render() {
    return (
      <HDTextInput
        ref={ref => (this.input = ref)}
        isRightIcon={true}
        iconSource={
          this.state.isShowPassword
            ? Context.getImage("iconEyeShow")
            : Context.getImage("iconEyeHide")
        }
        onRightClick={this.changeIconPassword}
        onChangeTextInput={this.onChangeInput}
        //inputStyle={styles.inputText}
        {...this.props}
      />
    );
  }
}

HDBankInput.propTypes = {
  onChangeText: PropTypes.func
};

const styles = StyleSheet.create({});

//HOW TO USE
{/* <HDBankInput
  placeholder={Context.getString("auth_login_input_password")}
  placeholderTextColor={Context.getColor("placeholderColor1")}
  label={Context.getString("auth_login_input_password")}
/> */}
