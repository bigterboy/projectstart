import React from "react";
import Util from "util";
import Context from "context";
import { ModalConfirm, HandleBack } from "component";

const withExitModal = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        modalExitVisible: false
      };
    }
    showModal = () => {
      this.setState({
        modalExitVisible: true
      });
    };
    closeModal = () => {
      this.setState({
        modalExitVisible: false
      });
    };
    exitApp = () => {
      this.closeModal();
      Util.App.exitApp();
    };
    onBackPress = () => {
      this.showModal();
      return true;
    };
    render() {
      return (
        <HandleBack onBack={this.onBackPress}>
          <WrappedComponent {...this.props} />
          {this.state.modalExitVisible ? (
            <ModalConfirm
              content={Context.getString("app_exit_question")}
              isVisible={this.state.modalExitVisible}
              onAccept={this.exitApp}
              onCancel={this.closeModal}
            />
          ) : null}
        </HandleBack>
      );
    }
  };
};

export default withExitModal;
