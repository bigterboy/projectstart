//Use this class must define these func at sceen
 //-1: close all popup
//1: acceptOtp
//2: callCenter
//3: getPhoneNumber
import React from "react";
import ModalWarnPhone from "./modal_warn";
import ModalCallCenter from "./modal_call_center";

const withWarnPhoneModal = (WrappedComponent, type) => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        modalVisible: true,
        callCenterVisible: false,
        securityPhone: "",
        activeIndex: 0
      };
    }

    componentDidMount = () => {
      this.createSecurity()
    }

    createSecurity = () => {
      const phone = (this.wrapper.getPhoneNumber) ? this.wrapper.getPhoneNumber() : ""
      const security = "******" + phone.slice(phone.length - 4, phone.length)
      this.setState({
        securityPhone: security
      })
    }

    showModal = () => {
      this.setState({
        modalVisible: true
      });
    };

    closeModal = (index) => {
      this.setState({
        activeIndex: index
      })
    }

    changeModal = () =>{
      this.closeModal(0)
    }

    closeALlModal = () =>{
      this.setState({
        activeIndex: -1
      })
      this.props.navigation.pop()
    }

    //Chọn đổi số Điện thoại
    changePhone = () => {
      console.log("changephone")
      this.closeModal(1)
      this.setState({
        modalVisible: false,
        callCenterVisible: true,
      })
    }

    acceptOtp = () => {
      this.closeModal(2);
      this.setState({
        modalVisible:false
      })
      if (this.wrapper.acceptOtp) {
        this.wrapper.acceptOtp();
      }
    };

    callCenter = () => {
      if (this.wrapper.callCenter) {
        this.wrapper.callCenter();
      }
    };

    renderModal = () => {
      const { activeIndex } = this.state
      if (activeIndex === 0) {
          return (
            <ModalWarnPhone
              key="Model-Warn-1"
              isVisible={true}
              securityPhone={this.state.securityPhone}
              acceptOtp={this.acceptOtp}
              changePhone={this.changePhone}
              type={type}
              pressCancelX = {this.closeALlModal}
            />
          )
      } else if((activeIndex === 1)){
        return (
          <ModalCallCenter
            key="Model-Warn-2"
            isVisible={this.state.callCenterVisible}
            callCenter={this.callCenter}
            pressCancelX={this.changeModal}
            type={type}
          />
        )
      }
      return null
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            ref={connectedComponent => {
              this.wrapper = connectedComponent;
            }}
            {...this.props}
          />
          {this.renderModal()}
          {/* <ModalWarnPhone
            key="Model-Warn-1"
            isVisible={this.state.modalVisible}
            securityPhone={this.state.securityPhone}
            acceptOtp={this.acceptOtp}
            changePhone={this.changePhone}
          />
          <ModalCallCenter
            key="Model-Warn-2"
            isVisible={this.state.callCenterVisible}
            callCenter={this.callCenter}
          /> */}
        </React.Fragment>
      );
    }
  };
};

export default withWarnPhoneModal;
