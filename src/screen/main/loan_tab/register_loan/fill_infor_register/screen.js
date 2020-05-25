import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import {
  BaseScreen,
  Header,
  HDGroupHeader,
  HDButton,
  HDTextInput,
  ModalComboboxGetAPI,
  HDText,
  KeyboardAvoiding,
  DismissKeyboardView,
  HDTextInputNumber
} from "component";
import Context from "context";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Network from "middleware/helper/Network";
import Util from "util";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      districts: [],
      isShowProvinces: false,
      isShowDistricts: false,
      itemSelectedProvince: null,
      idDistrict: null,
      itemSelectedDistrict: null,
      provinceName: null,
      provinceCode: null,
      districtName: null,
      districtCode: null,
      errorMessage: null,
      city: "",
      region: "",
      navTitle: Context.getString("loan_tab_register_loan_nav") //default
    };
  }

  componentDidMount = async () => {
    //Get header title
    const navTitle = await this.props.navigation.getParam("navTitle");
    if (navTitle) {
      this.setState({
        navTitle: navTitle
      });
    }

    this.getAPIProvince();

    // check get content from redux first
    if (
      this.props.contentScreen !== null &&
      this.props.contentScreen !== undefined
    ) {
      this.fullName.setText(this.props.contentScreen[0]);
      this.phoneNumber.setText(this.props.contentScreen[1]);
      // this.cmnd.setText(this.props.contentScreen[2]);
      this.address.setText(this.props.contentScreen[2]);
      this.setState({
        city: this.props.contentScreen[3],
        region: this.props.contentScreen[4],
        itemSelectedProvince: this.props.contentScreen[5],
        itemSelectedDistrict: this.props.contentScreen[6]
      });
    } else if (this.props.isLogin || this.props.isLoginPhone) {
      this.getAPIInforUser(); // ==> get And fill information to form
    }
  };

  componentWillUnmount = () =>{
    this.updateDataScreen();
  }

  getAPIProvince = async () => {
    try {
      const result = await Network.getProvinces();
      if (result != null) {
        if (result.code === 200) {
          this.setState({
            provinces: result.payload
          });
        }
      }
    } catch (err) {
      console.log("ERROR-REGISTER-ENTER-CONTRACT-CATCH: " + err);
    }
  };

  getAPIInforUser = async () => {
    try {
      Context.application.showLoading();
      const result = await Network.getInforUser(this.props.user.uuid);
      if (result != null) {
        if (result.code === 200) {
          console.log("API-GET-INFO-USER-COMPLETE: " + JSON.stringify(result.payload))
          this.fullName.setText(result.payload.fullName);
          this.phoneNumber.setText(result.payload.phoneNumber);
        }
      }
    } catch (err) {
      console.log("ERROR-API-GET-INFO-USER-CATCH: " + err);
    }
    Context.application.hideLoading();
  };

  onPressConfirm = () => {
    const fullName = this.fullName.getText();
    const phoneNumber = this.phoneNumber.getText();
    const address = this.address.getText();

    //Check form  // comment for checking easier
    if (this.checkFormBeforSubmit(fullName, phoneNumber, address) === null) {
      return;
    }

    // DIFFERENT CASE IF FROM DETAIL PROMOTION TO FILL RESGISTER FORM
    // ==> LOAD API ==> SUCCESSFULL SCREEN
    if (
      this.props.navigation.getParam("navTitle") ===
      Context.getString("promotion_tab_promotion_register_nav")
    ) {
      const itemPromotion = this.props.navigation.getParam("itemPromotion");
      this.requestAPILoanSavePromotion(
        this.fullName.getText(),
        this.phoneNumber.getText(),
        this.state.city,
        this.state.region,
        itemPromotion.promotionCode,
        itemPromotion.type,
        itemPromotion.id,
        itemPromotion.title,
        this.props.isLogin ? this.props.user.uuid : ""
      );
    } else {
      // USE FOR REGISTER LOAN NORMAL
      this.props.navigation.navigate("LoanRegisterConfirm", {
        fullName: this.fullName.getText(),
        phoneNumber: this.phoneNumber.getText(),
        city: this.state.city,
        region: this.state.region,
        loanAmount: this.props.navigation.getParam("loanAmount"),
        loanTerm: this.props.navigation.getParam("loanTerm"),
        money: this.props.navigation.getParam("money"),
        loanProduct: this.props.navigation.getParam("loanProduct"),
        percentPaidFirst: this.props.navigation.getParam("percentPaidFirst"),
        interestRate: this.props.navigation.getParam("interestRate"),
        loanType: this.props.navigation.getParam("loanType")
      });
    }

    //Clean data screen redux
    this.props.cleanData();
  };

  /**
   * <Function: request api call loan for promotion>
   */
  requestAPILoanSavePromotion = async (
    fullName,
    phone,
    provinceCode,
    districtCode,
    promotionCode,
    promotionType,
    promotionId,
    title,
    customerUuid
  ) => {
    Context.application.showLoading();
    try {
      const result = await Network.loanSavePromotion(
        fullName,
        phone,
        provinceCode,
        districtCode,
        promotionCode,
        promotionType,
        promotionId,
        title,
        customerUuid
      );
      if (result !== null) {
        if (result.code === 200) {
          this.props.navigation.navigate("LoanFinishComplete", {
            navTitle: Context.getString("promotion_tab_promotion_register_nav")
          });
        } else {
          this.showErrorMessage(Context.getString("common_error_try_again"));
        }
      }
    } catch (err) {
      console.log("ERROR-REGISTER-ENTER-CONTRACT-CATCH: " + err);
      this.showErrorMessage(Context.getString("common_error_try_again"));
    }
    Context.application.hideLoading();
  };

  /**
   * <Function: check validate input text>
   * @param fullName title of tab.
   * @param phoneNumber title of tab.
   * @param address title of tab.
   */
  checkFormBeforSubmit = (fullName, phoneNumber, address) => {
    // Check null
    if (fullName.length === 0) {
      this.fullName.setErrorState(true);
      this.showErrorMessage(
        Context.getString("loan_tab_register_loan_fill_info_error_name_blank")
      );
      return null;
    }
    if (phoneNumber.length === 0) {
      this.phoneNumber.setErrorState(true);
      this.showErrorMessage(
        Context.getString("loan_tab_register_loan_fill_info_error_phone_blank")
      );
      return null;
    }

    if (address.length === 0) {
      this.address.setErrorState(true);
      this.showErrorMessage(
        Context.getString(
          "loan_tab_register_loan_fill_info_error_address_blank"
        )
      );
      return null;
    }

    // check length phone number
    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      this.phoneNumber.setErrorState(true);
      this.showErrorMessage(
        Context.getString(
          "account_profile_change_error_phoneNumber_length_message"
        )
      );
      return null;
    }

    //Check phone number type number
    if (!this.regexCheckPhoneNumber(phoneNumber)) {
      this.phoneNumber.setErrorState(true);
      this.showErrorMessage(
        Context.getString(
          "account_profile_change_error_phoneNumber_fomat_message"
        )
      );
      return null;
    }

    //Check phone number exist
    if (!this.regexCheckPhoneNumberVN(phoneNumber)) {
      this.phoneNumber.setErrorState(true);
      this.showErrorMessage(
        Context.getString(
          "account_profile_change_error_phoneNumber_not_correct_message"
        )
      );
      return null;
    }

    return 0;
  };

  regexCheckNumber = value => {
    return Util.String.regexCheckNumber(value);
  };

  regexCheckPhoneNumber = value => {
    return Util.String.regexCheckPhoneNumber(value);
  };

  regexCheckPhoneNumberVN = value => {
    return Util.String.regexCheckPhoneNumberVN(value);
  };

  /**
   * <Function: check for showing province>
   */
  showProvinces = async () => {
    this.setState({
      //provinces: result,
      isShowProvinces: true,
      errorMessage: null
    });
    this.address.setErrorState(false);
  };
  showDistricts = () => { };

  /**
   * <Function: use for waiting loading>
   * @param item all province of VN
   * @param index of item
   */
  selectProvince = async (item, index) => {
    //console.log("CONSOLE LOG: " + JSON.stringify(item));
    const result = await Network.districts(item.id);
    //console.log("RESULT GET DISTRICTS: " + JSON.stringify(result));

    await this.setState({
      ...this.state,
      provinceCode: item.provinceCode,
      provinceName: item.provinceName,
      districtName: null,
      districtCode: null,
      isShowProvinces: false,
      districts: result.payload,
      city: item.provinceName,
      itemSelectedProvince: item
    });
    //console.log("ITEM CLICK: " + JSON.stringify(item));
  };

  /**
   * <Function: use for waiting loading>
   * @param item district depent on province select
   * @param index of district
   */
  selectDistrict = async (item, index) => {
    await this.setState({
      ...this.state,
      districtCode: item.code,
      districtName: item.name,
      itemSelectedDistrict: item,
      isShowProvinces: false,
      isShowDistricts: false,
      region: item.districtCode
    });
    this.address.setText(item.districtCode + ", " + this.state.city);
  };

  /**
   * <Function: render error message>
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

  //Save data is filling to Redux
  updateDataScreen = async () => {
    let temp = [
      this.fullName.getText(),
      this.phoneNumber.getText(),
      this.address.getText(),
      this.state.city,
      this.state.region,
      this.state.itemSelectedProvince,
      this.state.itemSelectedDistrict
    ];
    await this.props.saveData(temp);
  };

  /**
   * <Function: trigger for change input text>
   */
  onChangeInput = async () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      this.setState(
        {
          errorMessage: null
        },
        () => {
          this.fullName.setErrorState(false);
          this.phoneNumber.setErrorState(false);
          this.address.setErrorState(false);
        }
      );
    }
  };

  /**
   * <Function: show error message>
   */
  showErrorMessage(message) {
    this.setState({
      errorMessage: message
    });
  }

  closePopupProvince = () => {
    this.setState({ isShowProvinces: false, provinceName: null })
  };

  closePopupDistrict = () => {
    this.setState({ isShowDistricts: false, provinceName: null })
    this.address.setText("");
  }

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <DismissKeyboardView>
        <View style={styles.container}>
          <Header
            title={this.state.navTitle}
            navigation={this.props.navigation}
          />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scroll_container}
          >
            <HDGroupHeader
              leftTitle={Context.getString("loan_tab_register_loan_userinfo")}
            />

            <View style={styles.form_loan_container}>
              <View
                style={{
                  width: "100%",
                  marginTop: Context.getSize(16),
                  paddingHorizontal: Context.getSize(16)
                }}
              >
                <HDTextInput
                  ref={ref => (this.fullName = ref)}
                  placeholder="Họ và tên"
                  placeholderTextColor={Context.getColor("placeholderColor1")}
                  label="Họ và tên"
                  onChangeTextInput={this.onChangeInput}
                  inputStyle={styles.inputText}
                  containerStyle={styles.containerStyle}
                  maxLength={Util.Constant.INPUT_FULL_NAME_LENGTH}
                />
                <HDTextInputNumber
                  ref={ref => (this.phoneNumber = ref)}
                  placeholder="Số điện thoại"
                  placeholderTextColor={Context.getColor("placeholderColor1")}
                  label="Số điện thoại"
                  onChangeTextInput={this.onChangeInput}
                  inputStyle={styles.inputText}
                  keyboardType="number-pad"
                  contextMenuHidden={true}
                  containerStyle={styles.containerStyle}
                  typeInput={Util.Constant.TYPE_INPUT_TEXT.PHONE}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.showProvinces()}
                >
                  <HDTextInput
                    ref={ref => (this.address = ref)}
                    placeholder="Địa điểm làm hợp đồng"
                    placeholderTextColor={Context.getColor("placeholderColor1")}
                    label="Địa điểm làm hợp đồng"
                    editable={false}
                    //onChangeTextInput={this.onChangeInput}
                    inputStyle={styles.inputText}
                    pointerEvents="none"
                  />
                </TouchableOpacity>

                {this.renderErrMessage()}
              </View>
            </View>
            <ModalComboboxGetAPI
              title={Context.getString("home_tab_guild_store_province")}
              searchPlaceholder={Context.getString(
                "home_tab_guild_store_province_search"
              )}
              items={this.state.provinces}
              selectedValue={this.state.itemSelectedProvince}
              isVisible={this.state.isShowProvinces}
              onPressItem={this.selectProvince}
              pressCancelX={() =>
                //this.setState({ isShowProvinces: false, provinceName: null })
                this.closePopupProvince()
              }
              onModalHide={() =>
                this.state.provinceName === null
                  ? null
                  : this.setState({ isShowDistricts: true })
              }
              type={Util.Constant.POPUP_TYPE.PROVINCE} // TYPE PROVINCES
              isShowSearchBar={true}
            />

            <ModalComboboxGetAPI
              title={Context.getString("home_tab_guild_store_district")}
              searchPlaceholder={Context.getString(
                "home_tab_guild_store_district_search"
              )}
              items={this.state.districts}
              selectedValue={this.state.itemSelectedDistrict}
              isVisible={this.state.isShowDistricts}
              onPressItem={this.selectDistrict}
              pressCancelX={() =>
                //this.setState({ isShowDistricts: false, provinceName: null })
                this.closePopupDistrict()
              }
              onModalHide={() =>
                this.setState({
                  isShowProvinces: false,
                  isShowDistricts: false
                })
              }
              type={Util.Constant.POPUP_TYPE.DISTRICT} // TYPE DISTRICTS
              isShowSearchBar={true}
            />
          </ScrollView>
        </View>
        <KeyboardAvoiding
          behavior="padding"
          enabled
          style={styles.avoiding_container}
        >
          <View style={styles.button_container}>
            <HDButton
              title={Context.getString("loan_tab_register_loan")}
              onPress={() => this.onPressConfirm()}
              isShadow={true}
            />
          </View>
        </KeyboardAvoiding>
      </DismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  scroll_container: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  form_loan_container: {
    marginBottom: Context.getSize(77 + 13),
    width: Context.getSize(343),
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Context.getColor("background"),
    borderWidth: 1,
    borderColor: "#E5EAEF",
    shadowOpacity: 0.2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  bottom_container: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  confirm_button: {
    width: Context.getSize(343),
    height: Context.getSize(50),
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 10
  },

  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 8.0,
    elevation: 3
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
  inputText: {
    fontWeight: "600"
  },
  containerStyle: {
    marginBottom: Context.getSize(8)
  },
  avoiding_container: {
    position: "absolute",
    width: "100%",
    bottom: 0
  },
  button_container: {
    marginBottom: Context.getSize(16),
    width: (343 / 375) * Context.getWindow().width,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: Context.getSize(10)
  }
});
