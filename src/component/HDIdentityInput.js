import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { HDTextInput } from "component";
//import PropTypes from "prop-types";
import Context from "context";

export default class HDIdentityInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };
  }
  onChangeInput = text => {
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
  
    //   if (this.state.isShowPassword) {
    //     this.setTextAllWithoutHide(this.state.inputValue);
    //   } else {
    //     this.setTextExcept4(this.state.inputValue);
    //   }

    //Set space between
    this.setTextAllWithoutHide(this.state.inputValue);


  };

  setTextAllWithoutHide = text => {
    let temp = "";
    for (let i = 0; i < text.length; i++) {
      temp += text[i];
      if ((text.length - i - 1) % 4 === 0 && i !== text.length - 1) {
        temp += " ";
      }
    }
    this.password.setText(temp);
  };

  render() {
    return (
      <HDTextInput
        {...this.props}
        ref={ref => (this.password = ref)}
        isRightIcon={true}
        onChangeTextInput={this.onChangeInput}
      ></HDTextInput>
    );
  }
}

const styles = StyleSheet.create({});

//Cách dùng
{
  /* <HDBankInput
  placeholder={Context.getString("auth_login_input_password")}
  placeholderTextColor={Context.getColor("placeholderColor1")}
  label={Context.getString("auth_login_input_password")}
/> */
}
