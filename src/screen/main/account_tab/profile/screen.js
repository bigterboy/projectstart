import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView
} from "react-native";
import {
  BaseScreen,
  Header,
  HDTextInput,
  KeyboardAvoiding,
  DismissKeyboardView,
  ModalActionSheet,
  HDRoundView,
  HDText
} from "component";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";
import Util from "util";

import ImagePicker from "react-native-image-crop-picker";

export default class Screen extends BaseScreen {
  /**
   * <Function: constructor>
   * @param isEdit check is edit
   * @param errorMessage content error to show
   * @param user data user
   * @param allData
   * @param modalActions is show modal action
   */
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      errorMessage: null,
      user: [],
      allData: [],
      modalActions: false
    };
  }

  /**
   * <Function: add lister trigger keyboard>
   */
  componentDidMount = () => {
    this.getHeaderInfo();
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this._keyboardDidShow()
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this._keyboardDidHide()
    );
  };

  /**
   * <Function: destroy listener>
   */
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  /**
   * <Function: event for show keyboard>
   */
  _keyboardDidShow() {
    console.log("Keyboard Shown");
    this.onSomeEvent();
  }

  /**
   * <Function: event for hide keyboard>
   */
  _keyboardDidHide() {
    console.log("Keyboard hide");
  }

  /**
   * <Function: change state when change state keyboard>
   */
  change = () => {
    this.setState({
      isShowKeyboard: !this.state.isShowKeyboard
    });
  };

  async componentWillReceiveProps(nextProps) { }

  /**
   * <Function: fill text input get value from storage>
   */
  fillTextInput = () => {
    this.fullName.setText(this.props.user.fullName);
    this.userName.setText(this.props.user.username);
    this.phoneNumber.setText(this.props.user.phoneNumber);


    //If you want more security for your email do this
    this.email.setText(Util.String.formatEmail(this.props.user.email));

    //Or no need
    //this.email.setText(this.props.user.email);

    //Util.String.formatEmail("treertreer@gmail.com");
  };

  /**
   * <Function: start fill text input>
   */
  getHeaderInfo = async () => {
    this.fillTextInput();
  };

  /**
   * <Function: call function when click avatar>
   */
  onAvatarPress = () => {
    this.showModalActions();
  };

  //Upload file avatar
  uploadFileAPI = async (contentType, strBase64) => {
    try {
      Context.application.showLoading();
      const result = await Network.uploadImageFile(contentType, strBase64);
      Context.application.hideLoading();

      if (result != null) {
        if (result.code === 200) {
          console.log(
            "API-UPLOAD-FILE-COMPLETE: " + JSON.stringify(result.payload)
          );
          if (result.payload) {
            let arrFiles = result.payload.files;
            this.updateAvatarAPI(arrFiles[0].data);
          }
        } else {
          console.log("ERROR-API-UPLOAD-FILE: " + result.code);
          console.log(
            "ERROR-API-UPLOAD-FILE: " + Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      console.log("ERROR-API-CONTRACT-LIST: " + err.message);
      Context.application.hideLoading();
    }
  };

  //Update user avatar profile
  updateAvatarAPI = async fileName => {
    //let user = await LocalStorage.getUser();
    if (fileName) {
      try {
        Context.application.showLoading();
        const result = await Network.updateUserAvatar(
          this.props.user.uuid,
          fileName
        );

        if (result != null) {
          if (result.code === 200) {
            console.log(
              "API-UPLOAD-AVATAR-COMPLETE: " + JSON.stringify(result.payload)
            );

            if (result.payload) {
              const userAll = await LocalStorage.getUser();
              userAll.customer.avatar = result.payload.fileName;
              this.props.saveUserToRedux(userAll.customer);
              this.props.saveImageBase64URL(result.payload.fileName);
              await LocalStorage.saveUser(userAll);
            } else {
            }
          } else {
            console.log("ERROR-API-UPLOAD-AVATAR: " + result.code);
            console.log(
              "ERROR-API-UPLOAD-AVATAR: " +
              Network.getMessageFromCode(result.code)
            );
          }
        }
      } catch (err) {
        console.log("ERROR-API-UPLOAD-AVATAR: " + err.message);
        Context.application.hideLoading();
      }
    }
    Context.application.hideLoading();
  };

  /**
   * <Function: fill text input get value from storage>
   */
  updateInforUser = () => {
    const fullName = this.fullName.getText();
    const email = this.email.getText();

    if (!this.regexCheckSpace(email) && email.length !== 0) {
      this.email.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile_change_error_email_message")
      );
      return;
    }

    if (!this.checkEmail(email) && email.length !== 0) {
      this.email.setErrorState(true);
      this.showErrorMessage(
        Context.getString("account_profile_change_error_format_email_message")
      );
      return;
    }

    this.callAPIChangeInformation(
      this.props.user.uuid,
      fullName,
      email.toLowerCase(),
      this.props.user.objectVersion
    );
  };

  callAPIChangeInformation = async (uuid, fullName, email, objectVersion) => {
    Context.application.showLoading();
    try {
      let result = await Network.updateInforUser(
        uuid,
        fullName,
        email,
        objectVersion
      );
      Context.application.hideLoading();
      if (result.code === 200) {
        await this.props.saveUserToRedux(result.payload);

        const userAll = await LocalStorage.getUser();
        userAll.customer = result.payload;
        await LocalStorage.saveUser(userAll);

        this.props.showUpdateProfileSuccessModal();

        //this.fillTextInput();
      } else {
        Context.application.hideLoading();
        this.showErrorMessage(Network.getMessageFromCode(result.code));
      }
    } catch (error) {
      Context.application.hideLoading();
      console.log("ERROR: " + JSON.stringify(error));
    }
  };

  /**
   * <Function: show error>
   */
  showErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  /**
   * <Function: render header>
   * @param isEdit check do you want to edit information
   */
  getHeader = isEdit => {
    return (
      <Header
        title="Thông tin cá nhân"
        rightText={isEdit ? "Lưu" : null}
        rightIcon={isEdit ? null : Context.getImage("profileEdit")}
        rightOnPress={this.rightOnPress}
        navigation={this.props.navigation}
      />
    );
  };

  /**
   * <Function: call when click edit button>
   */
  rightOnPress = () => {
    if (this.state.isEdit) {
      Keyboard.dismiss();
      this.updateInforUser();
      //this.props.showUpdateProfileSuccessModal();
      //Keyboard.dismiss();
    } else {
      this.setState({ isEdit: !this.state.isEdit });
      this.changeInputSecurity();
    }

  };

  // when is not edit email just show 4 character 
  // So that when we change to edit = true we can see all
  changeInputSecurity = () => {
    this.email.setText(this.props.user.email);
  }

  /**
   * <Function: render error>
   */
  renderErrMessage() {
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <HDText style={styles.errorText}>{errorMessage}</HDText>
        </View>
      );
    }
    return null;
  }

  /**
   * <Function: call when change input text>
   */
  onChangeInput = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.fullName.setErrorState(false);
          this.email.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: call when focus input>
   */
  onFocus = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.fullName.setErrorState(false);
          this.email.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: check validate email>
   * @param value string variable email
   */
  checkEmail = value => {
    return Util.String.regexCheckValidateEmail(value);
  };

  //Menu Camera or Gallery Photo
  showModalActions = () => {
    this.setState({
      modalActions: true
    });
  };

  /**
   * <Function: hide modal action>
   */
  hideModalAction = callback => {
    this.setState(
      {
        modalActions: false
      },
      () => {
        if (callback) callback();
      }
    );
  };

  //Open Camera or Photo
  //0:Camera  1:Photo
  openCameraGallery(id) {
    if (id === 0) {
      ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true
      })
        .then(image => {
          this.hideModalAction(() => {
            this.uploadFileAPI(image.mime, image.data);
          });
        })
        .catch(e => {
          this.hideModalAction();
        });
    } else {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        includeBase64: true,
        cropperCircleOverlay: true
      })
        .then(image => {
          this.hideModalAction();
          this.uploadFileAPI(image.mime, image.data);
        })
        .catch(e => {
          this.hideModalAction();
        });
    }
  }

  onPressActionItem = (item, index) => {
    this.openCameraGallery(index);
  };

  onPressActionCancel = () => {
    this.hideModalAction();
  };

  regexCheckSpace = value => {
    return Util.String.regexCheckSpace(value);
  };

  onSomeEvent = () => {
    this.refs.scrollView.scrollToEnd();
  };

  renderImageAvatar = () => {

    renderDefaultAvatar = () => {
      return (
        <Image source={Context.getImage("avatar")} style={styles.avatarImage} />
      );
    }

    if (this.props.user) {
      if (this.props.user.avatar) {
        return (
          <Image
            source={{ uri: "data:image/png;base64," + this.props.avatarBase64 }} // use base 64
            style={styles.avatarImage}
          />
        );
      } else {
        return (
          renderDefaultAvatar()
        )
      }
    }
    return (
      renderDefaultAvatar()
    )
  };

  render() {
    return (
      <DismissKeyboardView style={styles.container}>
        {this.getHeader(this.state.isEdit)}
        <KeyboardAvoiding style={styles.avoidKeyboardContainer}>
          <ScrollView
            ref="scrollView"
            scrollEnabled={false}
            style={styles.scroll}
            contentContainerStyle={styles.scroll_content}
          >
            <View style={{ marginBottom: 24, alignItems: "center" }}>
              <TouchableOpacity
                onPress={this.onAvatarPress}
                style={styles.avatarContainer}
              >
                {this.renderImageAvatar()}
              </TouchableOpacity>
              <HDText style={styles.name}>{this.props.user.fullName}</HDText>
            </View>
            <HDRoundView style={styles.formContainer}>
              <HDTextInput
                ref={ref => (this.fullName = ref)}
                placeholder="Họ và tên"
                label="Họ và tên"
                containerStyle={styles.inputName}
                editable={this.state.isEdit}
                onChangeTextInput={this.onChangeInput}
                inputStyle={this.state.isEdit ? null : styles.inputStyleNoEdit}
              // focusInput={this.onFocus}
              />
              <HDTextInput
                ref={ref => (this.userName = ref)}
                //placeholder="Tên truy cập"
                placeholder={this.state.user.username}
                label="Tên truy cập"
                containerStyle={styles.inputName}
                editable={false}
                inputStyle={styles.inputStyleNoEdit}
              />
              <HDTextInput
                ref={ref => (this.phoneNumber = ref)}
                //placeholder="Số điện thoại"
                placeholder={this.state.user.phoneNumber}
                label="Số điện thoại"
                containerStyle={styles.inputName}
                editable={false}
                inputStyle={styles.inputStyleNoEdit}
              />
              <HDTextInput
                ref={ref => (this.email = ref)}
                placeholder="Email"
                label="Email"
                containerStyle={styles.inputName}
                editable={this.state.isEdit}
                onChangeTextInput={this.onChangeInput}
                inputStyle={this.state.isEdit ? null : styles.inputStyleNoEdit}
              // focusInput={this.onFocus}
              />
              {this.renderErrMessage()}
            </HDRoundView>
          </ScrollView>
        </KeyboardAvoiding>

        <ModalActionSheet
          isVisible={this.state.modalActions}
          onPressItem={this.onPressActionItem}
          onPressCancel={this.onPressActionCancel}
        />
      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  scroll: {
    flex: 1,
    width: "100%"
  },
  scroll_content: {
    paddingHorizontal: 16
  },
  avatarContainer: {
    borderWidth: 0.3,
    borderColor: "#F3F5F6"
  },
  avatarImage: {
    width: Context.getSize(80),
    height: Context.getSize(80),
    borderRadius: Context.getSize(80 / 2),
    marginTop: 24,
    marginBottom: 8
  },
  name: {
    fontSize: Context.getSize(16),
    lineHeight: Context.getSize(19),
    fontWeight: "bold",
    color: Context.getColor("textBlack")
  },
  errorContainer: {
    width: "100%",
    marginBottom: Context.getSize(24)
  },
  errorText: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    lineHeight: Context.getSize(16),
    textAlign: "center",
    color: Context.getColor("textRed")
  },
  boxContainer: {
    marginTop: Context.getSize(25),
    backgroundColor: "white",
    paddingLeft: Context.getSize(12),
    paddingTop: Context.getSize(12),
    paddingRight: Context.getSize(12),
    paddingBottom: Context.getSize(12),
    marginLeft: Context.getSize(15),
    marginRight: Context.getSize(15),
    borderRadius: Context.getSize(5),
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  },
  inputName: { marginBottom: Context.getSize(16) },
  inputStyleNoEdit: {
    color: Context.getColor("textHint")
  },
  avoidKeyboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: Context.getSize(20),
    paddingBottom: Context.getSize(10),
    marginBottom: Context.getSize(20),
    paddingHorizontal: Context.getSize(16)
  }
});
