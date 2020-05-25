import React from "react";
import ModalUpdateProfileSuccess from "./modal_update_profile_success";

const withUpdateProfileSuccessModal = WrappedComponent => {
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
    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            showUpdateProfileSuccessModal={this.showModal}
          />
          <ModalUpdateProfileSuccess
            closeModal={this.closeModal}
            isVisible={this.state.idVisible}
          />
        </React.Fragment>
      );
    }
  };
};

export default withUpdateProfileSuccessModal;
