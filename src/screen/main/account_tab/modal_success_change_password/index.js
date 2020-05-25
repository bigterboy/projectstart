import React from "react";
import ModalChangePasswordSuccess from "./modal_change_password_success";

const withChangePasswordSuccessModal = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        idVisible: false
      };
    }
    showModal = () => {
      this.setState({
        idVisible: true
      });
    };
    closeModal = () => {
      this.setState({
        idVisible: false
      });
      this.props.navigation.goBack();
    };
    buttonPress = () => {
      if (this.wrapper.modalOkPress) this.wrapper.modalOkPress();
    };
    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            ref={ref => (this.wrapper = ref)}
            {...this.props}
            showChangePasswordSuccessModal={this.showModal}
          />
          <ModalChangePasswordSuccess
            closeModal={this.closeModal}
            isVisible={this.state.idVisible}
            buttonPress={this.buttonPress}
          />
        </React.Fragment>
      );
    }
  };
};

export default withChangePasswordSuccessModal;
