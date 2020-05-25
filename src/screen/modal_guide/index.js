import React from "react";
import ModalGuideId from "./modal_guide_id";
import ModalGuideContract from "./modal_guide_contract";

const withGuideModal = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        idVisible: false,
        contractVisible: false
      };
    }
    showId = () => {
      this.setState({
        idVisible: true,
        contractVisible: false
      });
    };
    closeId = () => {
      this.setState({
        idVisible: false,
        contractVisible: false
      });
    };
    showContract = () => {
      this.setState({
        idVisible: false,
        contractVisible: true
      });
    };
    closeContract = () => {
      this.setState({
        idVisible: false,
        contractVisible: false
      });
    };
    render() {
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            showGuideContract={this.showContract}
            showGuideId={this.showId}
          />
          <ModalGuideId
            closeModal={this.closeId}
            isVisible={this.state.idVisible}
          />
          <ModalGuideContract
            closeModal={this.closeContract}
            isVisible={this.state.contractVisible}
          />
        </React.Fragment>
      );
    }
  };
};

export default withGuideModal;
