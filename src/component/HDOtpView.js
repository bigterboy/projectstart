import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity
} from "react-native";

import PropTypes from "prop-types";
import Context from "context";
//import { TouchableOpacity } from "react-native-gesture-handler";

export default class HDOtpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      autoFocus: true,
      code: "",
      digits: [],
      selectedIndex: null,
      text: "",
      isEdit: false
    };
  }

  onChangeTest = async text => {
    console.log("LENGTH: " + text.length);
    await this.setState({
      text: text,
      selectedIndex:
        text.length === 0 ? 0 : text.length === 6 ? 5 : text.length,
      isError: false
    });

    if (text.length === 6) {
      this.blurAllFields();
    } else {
      this.props.onChangeValue(text, this.props.pinCount);
    }
  };

  //Array of TextInput
  fields = [];

  componentDidMount() {}

  focusField = async index => {
    //index = this.state.text.length;

    // if (index < this.state.text.length) {
    //   //this.fields[index].focus();
    //   this.setState(
    //     {
    //       selectedIndex: index
    //     },
    //     () => {
    //       if (this.props.onFocusOtp) {
    //         this.props.onFocusOtp();
    //       }
    //     }
    //   );
    // }

    //console.log("GIA TRI TEXT LENGHT LA: " + this.state.text.length);

    // await this.setState({
    //   selectedIndex:
    //     this.state.text.length === 0 ? 0 : this.state.text.length - 1
    // });

    if (this.props.onFocusOtp) {
      this.props.onFocusOtp();
    }

    this.setState({
      isError: false
    });

    this.clickButtonFocus();

    this.onFocus(index);

    // console.log(
    //   "LENGTH: " + this.state.text.length + " ++ " + this.state.text.length
    // );
  };

  blurAllFields = () => {
    //this.fields.forEach(field => field.blur());
    this.props.onCodeFilled(this.state.text);
    this.test123.blur();
    this.setState({
      selectedIndex: -1
    });
  };

  onFocus = index => {
    console.log("CLICK OKKKK: " + index);

    if (this.state.isError) {
      this.setState({
        //isError: false,
        selectedIndex: index === 6 ? 5 : index
      });
    } else {
      this.setState({
        selectedIndex: index === 6 ? 5 : index
      });
    }
  };

  replaceAt(str, index) {
    return (str = s.substr(0, index) + "x" + s.substr(index + 1));
  }

  cleanText = () => {
    this.setState({
      digits: []
    });
  };

  onChangeText = (index, text) => {
    //this.setState;
    // const { onCodeFilled, pinCount } = this.props;
    // const { digits } = this.state;
    // let newdigits = digits.slice();
    // const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    // const newTextLength = text.length;
    // if (newTextLength - oldTextLength === pinCount) {
    //   // user pasted text in.
    //   newdigits = text.split("").slice(oldTextLength, newTextLength);
    //   this.setState({ digits: newdigits, isError: false });
    // } else {
    //   if (text.length === 0) {
    //     if (newdigits.length > 0) {
    //       newdigits = newdigits.slice(0, newdigits.length - 1);
    //       // newdigits[index] = ""
    //     }
    //   } else {
    //     text.split("").forEach(value => {
    //       newdigits[index] = value;
    //       index += 1;
    //     });
    //     index -= 1;
    //   }
    //   this.setState(
    //     {
    //       digits: newdigits,
    //       isError: false
    //     },
    //     () => {
    //       this.props.onChangeValue
    //         ? this.props.onChangeValue(newdigits, pinCount)
    //         : null;
    //     }
    //   );
    // }
    // let result = newdigits.join("");
    // if (result.length >= pinCount) {
    //   onCodeFilled && onCodeFilled(result);
    //   this.blurAllFields();
    // } else {
    //   if (text.length > 0 && index < pinCount - 1) {
    //     this.focusField(index + 1);
    //     console.log("CO VAO DAY KHONG 1");
    //   }
    //   // else if (text.length === 0 && index <= pinCount - 1 && index >=1) {
    //   //   console.log("CO VAO DAY KHONG 2");
    //   //   this.focusField(index - 1);
    //   // }
    // }
  };

  onKeyPressTextInput = (index, e) => {
    // console.log("RETURN CLICK: " + Math.abs(e.timeStamp));
    // const { digits } = this.state;
    // if (e.nativeEvent.key === "Backspace") {
    //   console.log(
    //     "GIA TRI LA: " + this.lastKeyEventTimestamp + " + " + e.timeStamp
    //   );
    //   //console.log("RETURN CLICK: " + Math.abs(e.lastKeyEventTimestamp - e.timeStamp));
    //   if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) < 20) {
    //     if (!digits[index] && index > 0) {
    //       this.onChangeText(index - 1, "");
    //       this.focusField(index - 1);
    //     }
    //     console.log("NGON ROI");
    //   }else {
    //     //this.lastKeyEventTimestamp = e.timeStamp;
    //     if (!digits[index] && index > 0) {
    //       this.onChangeText(index - 1, "");
    //       this.focusField(index - 1);
    //     }
    //   }
    //   // if (!digits[index] && index > 0) {
    //   //   this.onChangeText(index - 1, "");
    //   //   this.focusField(index - 1);
    //   // }
    //   console.log("RUN 1")
    // } else {
    //   console.log("RUN 2")
    //   this.lastKeyEventTimestamp = e.timeStamp;
    // }
    // console.log("OK VOOOOOO");
    // if (e.nativeEvent.key == "Backspace") {
    //   // Return if duration between previous key press and backspace is less than 20ms
    //   console.log("OK VOOOOOO 1");
    //   if (Math.abs(this.lastKeyEventTimestamp - e.timeStamp) < 20) return 0;
    //   console.log("OK VOOOOOO 2");
    //   const { currentIndex } = this.state;
    //   const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    //   //this._setFocus(nextIndex);
    // } else {
    //   // Record non-backspace key event time stamp
    //   console.log("OK VOOOOOO 3");
    //   this.lastKeyEventTimestamp = e.timeStamp;
    // }
  };

  renderOneInputField = (_, index) => {
    const { codeInputFieldStyle, codeInputHighlightStyle } = this.props;
    const { defaultTextFieldStyle } = styles;
    const { selectedIndex, digits } = this.state;

    const isError = this.state.isError;
    const borderColor = isError
      ? Context.getColor("primary")
      : Context.getColor("normalBorder");
    const focusBorder = isError
      ? Context.getColor("primary")
      : Context.getColor("focusBorder");
    const textColor = isError
      ? Context.getColor("primary")
      : Context.getColor("otpText");

    return (
      <View pointerEvents="none" key={index + "view"}>
        <TextInput
          key={"pin" + index}
          keyboardType="number-pad"
          allowFontScaling={false}
          value={digits[index]}
          style={
            selectedIndex === index
              ? [
                  styles.input_container,
                  { color: textColor, borderColor: focusBorder },
                  Platform.OS === "android" ? { fontFamily: "Roboto-Regular",fontWeight: null } : null
                ]
              : [
                  styles.input_container,
                  { color: textColor, borderColor: borderColor },
                  Platform.OS === "android" ? { fontFamily: "Roboto-Regular",fontWeight: null } : null
                ]
          }
          ref={ref => {
            this.fields[index] = ref;
          }}
          onChangeText={text => {
            this.onChangeText(index, this.state.text[index]);
          }}
          // onFocus={target => {
          //   this.onFocus(index);
          // }}
          onKeyPress={e => {
            this.onKeyPressTextInput(index, e);
          }}
          value={this.state.text[index]}
          maxLength={1}
          editable={false}
        ></TextInput>
      </View>
    );
  };

  renderTextFields = () => {
    const { pinCount } = this.props;
    const array = new Array(pinCount).fill(0);
    return array.map(this.renderOneInputField);
  };

  setError(isError) {
    this.setState({
      isError: isError
    });
  }

  // moveCaretAtEnd(e) {
  //   let temp_value = e.target.value;
  //   e.target.value = "";
  //   e.target.value = temp_value;
  // }

  clickButtonFocus = async () => {
    await this.setState({
      isEdit: true
    });
    this.test123.focus();
  };

  render() {
    const { pinCount, style } = this.props;
    const { digits } = this.state;
    //console.log("TEXXXXX: " + this.state.text);
    return (
      <TouchableWithoutFeedback
        // style={{ borderWidth: 1 }}
        // onPress={() => {
        //   let filledPinCount = digits.filter(digit => {
        //     return digit !== null && digit !== undefined;
        //   }).length;
        //   this.focusField(Math.min(filledPinCount, pinCount - 1));
        // }}

        onPress={() => {
          this.focusField(this.state.text.length);
          //console.log("OK CLICK NGON");
        }}
      >
        <View style={[styles.container, { ...this.props.style }]}>
          {this.renderTextFields()}
          <TextInput
            allowFontScaling={false}
            style={{
              height: 50,
              width: 50,
              borderColor: "gray",
              borderWidth: 1,
              position: "absolute",
              marginLeft: -200,
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "transparent"
            }}
            editable={this.state.isEdit}
            ref={ref => {
              this.test123 = ref;
            }}
            //selectionColor="transparent"
            onChangeText={text => this.onChangeTest(text)}
            maxLength={6}
            //onFocus={this.moveCaretAtEnd}
            //autoFocus
            //value="123"
            keyboardType="number-pad"
          />
          {/* <TouchableOpacity
          style={{borderWidth:1,position: "absolute",height:40,width:40}}
          onPress={()=> this.clickButtonFocus()}>
            <Text>CLICK</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

HDOtpView.propTypes = {
  pinCount: PropTypes.number,
  onCodeFilled: PropTypes.func,
  onFocusOtp: PropTypes.func,
  onChangeValue: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: Context.getSize(100),
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: Context.getSize(20)
  },
  input_container: {
    borderWidth: 1,
    width: Context.getSize(44),
    height: Context.getSize(44),
    borderRadius: Context.getSize(44) / 2,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    fontSize: Platform.OS === "ios" ? Context.getSize(22) : Context.getSize(18),
    fontWeight: "500"
  }
});
