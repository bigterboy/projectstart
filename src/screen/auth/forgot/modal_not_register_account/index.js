import React from "react";
import ModalNotRegisterAccount from "./modal_not_register_account";

const withNotRegisterAccountModal = WrappedComponent => {
  return class extends React.Component {
    /**
     * <Function:constructor>
     * @param idVisible check is show modal
     */
    constructor() {
      super();
      this.state = {
        idVisible: false
      };
    }

    /**
     * <Function: show modal>
     */
    showModal = () => {
      this.setState({
        idVisible: true
      });
    };

    /**
     * <Function: close modal>
     */
    closeModal = () => {
      this.setState({
        idVisible: false
      });
    };
    goToRegister = () => {
      this.closeModal();
      if (this.wrapper.goToRegister) {
        this.wrapper.goToRegister();
      }
    };

    /**
     * <Function: render screen>
     */
    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            ref={connectedComponent => {
              this.wrapper = connectedComponent;
            }}
            {...this.props}
            showNotRegisterAccountModal={this.showModal}
          />
          <ModalNotRegisterAccount
            closeModal={this.closeModal}
            isVisible={this.state.idVisible}
            goToRegister={this.goToRegister}
          />
        </React.Fragment>
      );
    }
  };
};

export default withNotRegisterAccountModal;
